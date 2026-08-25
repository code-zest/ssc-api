import { prisma } from '../../config/prisma';
import { OrderStatus } from '@prisma/client';

export class StoreService {
  // ─── STUDENT FACING ──────────────────────────────────────────────────────────

  /** List all active store items. */
  public static async listActiveItems() {
    return prisma.storeItem.findMany({
      where: { isActive: true },
      orderBy: { cost: 'asc' },
    });
  }

  /**
   * Place an order. Uses an interactive transaction to:
   * 1. Check stock.
   * 2. Check user coins.
   * 3. Deduct coins & reduce stock.
   * 4. Create StoreOrder.
   */
  public static async placeOrder(userId: string, data: {
    storeItemId: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  }) {
    return prisma.$transaction(async (tx) => {
      // 1. Fetch user (and lock row conceptually by fetching their coins)
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { coins: true },
      });
      if (!user) throw new Error('User not found');

      // 2. Fetch item (ensure stock is sufficient)
      const item = await tx.storeItem.findUnique({
        where: { id: data.storeItemId },
      });
      if (!item) throw new Error('Store item not found');
      if (!item.isActive) throw new Error('Store item is no longer active');
      if (item.stock <= 0) throw new Error('Store item is out of stock');

      // 3. Check coins
      if (user.coins < item.cost) {
        throw new Error('Insufficient coins to purchase this item');
      }

      // 4. Deduct coins and reduce stock
      await tx.user.update({
        where: { id: userId },
        data: { coins: { decrement: item.cost } },
      });

      await tx.storeItem.update({
        where: { id: item.id },
        data: { stock: { decrement: 1 } },
      });

      // 5. Create Order
      const order = await tx.storeOrder.create({
        data: {
          userId,
          storeItemId: item.id,
          coinsSpent: item.cost,
          status: 'PENDING',
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          phone: data.phone,
        },
      });

      return order;
    });
  }

  /** Get current user's order history. */
  public static async getMyOrders(userId: string) {
    return prisma.storeOrder.findMany({
      where: { userId },
      include: {
        item: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }


  // ─── ADMIN FACING ─────────────────────────────────────────────────────────────

  public static async listAllItems() {
    return prisma.storeItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { orders: true } }
      }
    });
  }

  public static async createItem(data: {
    name: string;
    description: string;
    imageUrl: string;
    cost: number;
    stock: number;
  }) {
    return prisma.storeItem.create({ data });
  }

  public static async updateItem(id: string, data: any) {
    return prisma.storeItem.update({
      where: { id },
      data,
    });
  }

  public static async listAllOrders() {
    return prisma.storeOrder.findMany({
      include: {
        item: true,
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public static async updateOrderStatus(id: string, data: {
    status: OrderStatus;
    trackingNumber?: string | null;
    courierName?: string | null;
  }) {
    return prisma.storeOrder.update({
      where: { id },
      data,
    });
  }
}
