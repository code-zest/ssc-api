import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { createNotificationSchema, updateNotificationSchema } from './notifications.schemas';

export const getNotifications = async (req: Request, res: Response) => {
  const { all } = req.query;
  const notifications = await prisma.examNotification.findMany({
    where: all === 'true' ? undefined : { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: notifications });
};

export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await prisma.examNotification.findUnique({
    where: { id: String(id) },
  });

  if (!notification) {
    res.status(404).json({ success: false, message: 'Notification not found' });
    return;
  }

  res.json({ success: true, data: notification });
};

export const createNotification = async (req: Request, res: Response) => {
  const data = createNotificationSchema.parse(req.body);
  const notification = await prisma.examNotification.create({ data });
  res.status(201).json({ success: true, data: notification });
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateNotificationSchema.parse(req.body);

  const notification = await prisma.examNotification.update({
    where: { id: String(id) },
    data,
  });

  res.json({ success: true, data: notification });
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.examNotification.delete({
    where: { id: String(id) },
  });
  res.json({ success: true, message: 'Notification deleted successfully' });
};
