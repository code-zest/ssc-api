import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { createNotificationSchema, updateNotificationSchema } from './notifications.schemas';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

import { getPagination, buildPaginationMeta } from '../../utils/pagination';

export const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { all } = req.query;
  const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'SUPER_ADMIN';
  
  const pagination = getPagination(req);
  const where = (all === 'true' && isAdmin) ? undefined : { isActive: true };

  const [total, notifications] = await prisma.$transaction([
    prisma.examNotification.count({ where }),
    prisma.examNotification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: pagination.skip,
      take: pagination.limit,
    }),
  ]);

  res.json({ 
    success: true, 
    data: notifications,
    meta: buildPaginationMeta(total, pagination)
  });
});

export const getNotificationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await prisma.examNotification.findUnique({
    where: { id: String(id) },
  });

  if (!notification) {
    res.status(404).json({ success: false, message: 'Notification not found' });
    return;
  }

  res.json({ success: true, data: notification });
});

export const createNotification = catchAsync(async (req: Request, res: Response) => {
  const data = createNotificationSchema.parse(req.body);
  const notification = await prisma.examNotification.create({ data });
  res.status(201).json({ success: true, data: notification });
});

export const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateNotificationSchema.parse(req.body);

  try {
    const notification = await prisma.examNotification.update({
      where: { id: String(id) },
      data,
    });
    res.json({ success: true, data: notification });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw ApiError.notFound('Notification not found');
    }
    throw error;
  }
});

export const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.examNotification.delete({
    where: { id: String(id) },
  });
  res.json({ success: true, message: 'Notification deleted successfully' });
});
