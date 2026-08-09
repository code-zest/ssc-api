import { PurchasableItemType } from "@prisma/client";
import { prisma } from "../../config/prisma";

export const createProduct = async (
  name: string,
  price: number,
  description?: string,
  items?: { itemType: PurchasableItemType; itemId: string }[]
) => {
  return await prisma.product.create({
    data: {
      name,
      price,
      description,
      items: items ? { create: items } : undefined,
    },
    include: { items: true },
  });
};

export const getAllProducts = async (includeInactive = false) => {
  return await prisma.product.findMany({
    where: includeInactive ? undefined : { isActive: true },
    include: { items: true },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const updateProduct = async (
  id: string,
  data: { name?: string; price?: number; description?: string; isActive?: boolean }
) => {
  return await prisma.product.update({
    where: { id },
    data,
    include: { items: true },
  });
};

export const addItemsToProduct = async (
  id: string,
  items: { itemType: PurchasableItemType; itemId: string }[]
) => {
  return await prisma.product.update({
    where: { id },
    data: {
      items: {
        create: items,
      }
    },
    include: { items: true },
  });
};

export const removeItemsFromProduct = async (
  id: string,
  itemIds: string[]
) => {
  // delete by product item ids
  await prisma.productItem.deleteMany({
    where: {
      id: { in: itemIds },
      productId: id
    }
  });

  return getProductById(id);
};
