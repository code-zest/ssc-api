import { Request, Response } from 'express';
import { StoreService } from './store.service';
import {
  createStoreItemSchema,
  updateStoreItemSchema,
  placeOrderSchema,
  updateOrderStatusSchema
} from './store.schemas';
import { z } from 'zod';

export class StoreController {
  // ─── STUDENT FACING ──────────────────────────────────────────────────────────

  public static async listActiveItems(req: Request, res: Response) {
    const items = await StoreService.listActiveItems();
    res.json({ success: true, data: items });
  }

  public static async placeOrder(req: Request, res: Response) {
    const data = placeOrderSchema.parse(req.body);
    const order = await StoreService.placeOrder(req.user!.userId, data);
    res.json({ success: true, data: order });
  }

  public static async getMyOrders(req: Request, res: Response) {
    const orders = await StoreService.getMyOrders(req.user!.userId);
    res.json({ success: true, data: orders });
  }

  // ─── ADMIN FACING ─────────────────────────────────────────────────────────────

  public static async listAllItems(req: Request, res: Response) {
    const items = await StoreService.listAllItems();
    res.json({ success: true, data: items });
  }

  public static async createItem(req: Request, res: Response) {
    const data = createStoreItemSchema.parse(req.body);
    const item = await StoreService.createItem(data);
    res.json({ success: true, data: item });
  }

  public static async updateItem(req: Request, res: Response) {
    const id = req.params.id as string;
    const data = updateStoreItemSchema.parse(req.body);
    const item = await StoreService.updateItem(id, data);
    res.json({ success: true, data: item });
  }

  public static async listAllOrders(req: Request, res: Response) {
    const orders = await StoreService.listAllOrders();
    res.json({ success: true, data: orders });
  }

  public static async updateOrderStatus(req: Request, res: Response) {
    const id = req.params.id as string;
    const data = updateOrderStatusSchema.parse(req.body);
    const order = await StoreService.updateOrderStatus(id, data);
    res.json({ success: true, data: order });
  }
}
