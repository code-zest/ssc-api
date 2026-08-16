import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { logger } from '../../config/logger';
import type { CreateErrorReportInput, ListErrorReportsQuery, UpdateErrorReportInput } from './errors.schemas';
import { ApiError } from '../../utils/ApiError';

type ErrorSeverityKey = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

// Severity weight for User Impact Score calculation
const SEVERITY_WEIGHT: Record<ErrorSeverityKey, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export async function createOrUpdateErrorReport(
  userId: string | null,
  input: CreateErrorReportInput,
) {
  const existing = await prisma.errorReport.findUnique({
    where: { fingerprint: input.fingerprint },
  });

  if (existing) {
    // Regression detection: if previously RESOLVED, auto-set to REGRESSED
    const newStatus = existing.status === 'RESOLVED' ? 'REGRESSED' : existing.status;

    const updated = await prisma.errorReport.update({
      where: { fingerprint: input.fingerprint },
      data: {
        occurrenceCount:   { increment: 1 },
        affectedUserCount: userId && userId !== existing.lastAffectedUserId
          ? { increment: 1 }
          : undefined,
        lastSeenAt:         new Date(),
        lastAffectedUserId: userId ?? undefined,
        status:             newStatus,
        userAgent:          input.userAgent ?? existing.userAgent,
        appVersion:         input.appVersion ?? existing.appVersion,
      },
    });

    return { report: updated, isNew: false, isRegression: newStatus === 'REGRESSED' };
  }

  // New error — create fresh record
  const report = await prisma.errorReport.create({
    data: {
      fingerprint:        input.fingerprint,
      severity:           input.severity,
      status:             'UNRESOLVED',
      message:            input.message,
      stack:              input.stack,
      componentStack:     input.componentStack,
      errorBoundary:      input.errorBoundary,
      url:                input.url,
      routePath:          input.routePath,
      routeParams:        input.routeParams as Prisma.InputJsonValue | undefined,
      userAgent:          input.userAgent,
      appVersion:         input.appVersion,
      lastAffectedUserId: userId ?? undefined,
      affectedUserCount:  userId ? 1 : 0,
      firstSeenAt:        new Date(),
      lastSeenAt:         new Date(),
    },
  });

  return { report, isNew: true, isRegression: false };
}

export async function listErrorReports(query: ListErrorReportsQuery) {
  const { status, severity, routePath, assignedToId, from, to, sortBy, page, limit } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.ErrorReportWhereInput = {
    ...(status     ? { status }     : {}),
    ...(severity   ? { severity }   : {}),
    ...(routePath  ? { routePath: { contains: routePath, mode: 'insensitive' as const } } : {}),
    ...(assignedToId ? { assignedToId } : {}),
    ...(from || to ? {
      lastSeenAt: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to   ? { lte: new Date(to)   } : {}),
      },
    } : {}),
  };

  const orderBy: Prisma.ErrorReportOrderByWithRelationInput = {
    [sortBy]: 'desc' as const,
  };

  const [reports, total] = await Promise.all([
    prisma.errorReport.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        lastAffectedUser: { select: { id: true, name: true, email: true } },
        assignedTo:       { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.errorReport.count({ where }),
  ]);

  return {
    data: reports,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}

export async function getErrorReportById(id: string) {
  const report = await prisma.errorReport.findUnique({
    where: { id },
    include: {
      lastAffectedUser: { select: { id: true, name: true, email: true } },
      assignedTo:       { select: { id: true, name: true, email: true } },
      resolvedBy:       { select: { id: true, name: true, email: true } },
    },
  });

  if (!report) throw ApiError.notFound('Error report not found');
  return report;
}

export async function updateErrorReport(
  id: string,
  adminId: string,
  input: UpdateErrorReportInput,
) {
  const existing = await prisma.errorReport.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Error report not found');

  const isResolvingNow = input.status === 'RESOLVED' && existing.status !== 'RESOLVED';

  return prisma.errorReport.update({
    where: { id },
    data: {
      ...(input.status   !== undefined ? { status: input.status }     : {}),
      ...(input.severity !== undefined ? { severity: input.severity } : {}),
      ...(input.notes    !== undefined ? { notes: input.notes }       : {}),
      ...(input.assignedToId !== undefined ? { assignedToId: input.assignedToId } : {}),
      ...(isResolvingNow ? { resolvedAt: new Date(), resolvedById: adminId } : {}),
    },
    include: {
      lastAffectedUser: { select: { id: true, name: true, email: true } },
      assignedTo:       { select: { id: true, name: true, email: true } },
      resolvedBy:       { select: { id: true, name: true, email: true } },
    },
  });
}

// ─── Analytics ────────────────────────────────────────────────────────────────

interface SeverityGroup {
  severity: string;
  _count: { severity: number };
  _sum: { affectedUserCount: number | null };
}

interface RouteGroup {
  routePath: string | null;
  _sum: { affectedUserCount: number | null };
  _count: { id: number };
}

interface ResolvedReport {
  firstSeenAt: Date;
  resolvedAt: Date | null;
  severity: string;
}

interface TrendReport {
  firstSeenAt: Date;
  occurrenceCount: number;
}

export async function getErrorAnalytics() {
  const now = new Date();
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const [
    totalUnresolved,
    totalInProgress,
    totalResolved,
    totalRegressed,
    totalCriticalLast24h,
    severityBreakdown,
    topRoutes,
    recentReports,
    resolvedWithTime,
  ] = await Promise.all([
    prisma.errorReport.count({ where: { status: 'UNRESOLVED' } }),
    prisma.errorReport.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.errorReport.count({ where: { status: 'RESOLVED' } }),
    prisma.errorReport.count({ where: { status: 'REGRESSED' } }),
    prisma.errorReport.count({
      where: {
        severity: 'CRITICAL',
        firstSeenAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.errorReport.groupBy({
      by: ['severity'],
      _count: { severity: true },
      _sum: { affectedUserCount: true },
    }) as unknown as Promise<SeverityGroup[]>,
    prisma.errorReport.groupBy({
      by: ['routePath'],
      where: { routePath: { not: null }, status: { notIn: ['IGNORED'] } },
      _sum: { affectedUserCount: true },
      _count: { id: true },
      orderBy: { _sum: { affectedUserCount: 'desc' } },
      take: 10,
    }) as unknown as Promise<RouteGroup[]>,
    prisma.errorReport.findMany({
      where: { firstSeenAt: { gte: fourteenDaysAgo } },
      select: { firstSeenAt: true, occurrenceCount: true },
      orderBy: { firstSeenAt: 'asc' },
    }) as unknown as Promise<TrendReport[]>,
    prisma.errorReport.findMany({
      where: { status: 'RESOLVED', resolvedAt: { not: null } },
      select: { firstSeenAt: true, resolvedAt: true, severity: true },
      take: 500,
    }) as unknown as Promise<ResolvedReport[]>,
  ]);

  // User Impact Score per severity
  const impactBySeverity = severityBreakdown.map((s) => ({
    severity: s.severity,
    count: s._count.severity,
    affectedUsers: s._sum.affectedUserCount ?? 0,
    impactScore: (s._sum.affectedUserCount ?? 0) * (SEVERITY_WEIGHT[s.severity as ErrorSeverityKey] ?? 1),
  }));
  const totalImpactScore = impactBySeverity.reduce((acc, s) => acc + s.impactScore, 0);

  // MTTR grouped by severity
  const mttrGroups = resolvedWithTime.reduce<Record<string, number[]>>((acc, r) => {
    if (!r.resolvedAt) return acc;
    const diffSeconds = (r.resolvedAt.getTime() - r.firstSeenAt.getTime()) / 1000;
    if (!acc[r.severity]) acc[r.severity] = [];
    acc[r.severity].push(diffSeconds);
    return acc;
  }, {});

  const mttrBySeverity = Object.entries(mttrGroups).map(([severity, times]) => ({
    severity,
    avgMttrSeconds: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
  }));

  // Trend by day
  const trendByDay = recentReports.reduce<Record<string, number>>((acc, r) => {
    const day = r.firstSeenAt.toISOString().split('T')[0];
    acc[day] = (acc[day] ?? 0) + r.occurrenceCount;
    return acc;
  }, {});

  logger.debug('Error analytics computed', { totalUnresolved, totalImpactScore });

  return {
    summary: {
      totalUnresolved,
      totalInProgress,
      totalResolved,
      totalRegressed,
      totalCriticalLast24h,
      totalImpactScore,
    },
    impactBySeverity,
    mttrBySeverity,
    topRoutes: topRoutes.map((r) => ({
      routePath: r.routePath,
      affectedUsers: r._sum.affectedUserCount ?? 0,
      occurrences: r._count.id,
    })),
    trendByDay,
  };
}
