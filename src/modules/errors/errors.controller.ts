import type { Request, Response, NextFunction } from 'express';
import * as errorsService from './errors.service';
import type { CreateErrorReportInput, ListErrorReportsQuery, UpdateErrorReportInput } from './errors.schemas';

export async function reportError(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId ?? null;
    const input = req.body as CreateErrorReportInput;
    const result = await errorsService.createOrUpdateErrorReport(userId, input);
    return res.status(result.isNew ? 201 : 200).json({
      success: true,
      data: { id: result.report.id, isNew: result.isNew, isRegression: result.isRegression },
    });
  } catch (err) {
    return next(err);
  }
}

export async function listErrors(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query as unknown as ListErrorReportsQuery;
    const result = await errorsService.listErrorReports(query);
    return res.json({ success: true, ...result });
  } catch (err) {
    return next(err);
  }
}

export async function getErrorAnalytics(req: Request, res: Response, next: NextFunction) {
  try {
    const analytics = await errorsService.getErrorAnalytics();
    return res.json({ success: true, data: analytics });
  } catch (err) {
    return next(err);
  }
}

export async function getErrorById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const report = await errorsService.getErrorReportById(id);
    return res.json({ success: true, data: report });
  } catch (err) {
    return next(err);
  }
}

export async function updateError(req: Request, res: Response, next: NextFunction) {
  try {
    const adminId = req.user!.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const input = req.body as UpdateErrorReportInput;
    const report = await errorsService.updateErrorReport(id, adminId, input);
    return res.json({ success: true, data: report });
  } catch (err) {
    return next(err);
  }
}
