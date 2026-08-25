import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const createStoreItemSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  imageUrl: z.string().url(),
  cost: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
});

export const updateStoreItemSchema = createStoreItemSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const placeOrderSchema = z.object({
  storeItemId: z.string().cuid(),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  phone: z.string().min(8),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  trackingNumber: z.string().optional().nullable(),
  courierName: z.string().optional().nullable(),
});
