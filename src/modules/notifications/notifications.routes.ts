import { Router } from 'express';
import { authenticate, authenticateOptional } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from './notifications.controller';
import { Role } from '@prisma/client';

export const notificationsRouter = Router();

// Publicly accessible for SEO & unauthenticated users
notificationsRouter.get('/', authenticateOptional, getNotifications);
notificationsRouter.get('/:id', getNotificationById);

// Admin only routes
notificationsRouter.post('/', authenticate, authorize(Role.ADMIN, Role.SUPER_ADMIN), createNotification);
notificationsRouter.patch('/:id', authenticate, authorize(Role.ADMIN, Role.SUPER_ADMIN), updateNotification);
notificationsRouter.delete('/:id', authenticate, authorize(Role.ADMIN, Role.SUPER_ADMIN), deleteNotification);
