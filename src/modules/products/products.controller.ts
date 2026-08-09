import { Request, Response } from "express";
import { z } from "zod";
import * as productService from "./products.service";
import { PurchasableItemType } from "@prisma/client";

export const createProduct = async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string().min(1),
    price: z.number().min(0),
    description: z.string().optional(),
    items: z.array(z.object({
      itemType: z.nativeEnum(PurchasableItemType),
      itemId: z.string()
    })).optional()
  });

  const data = schema.parse(req.body);
  const product = await productService.createProduct(data.name, data.price, data.description, data.items);
  res.status(201).json({ success: true, data: product });
};

export const getProducts = async (req: Request, res: Response) => {
  const includeInactive = req.user?.role === "ADMIN";
  const products = await productService.getAllProducts(includeInactive);
  res.json({ success: true, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  if (!product) return res.status(404).json({ success: false, error: "Not found" });
  res.json({ success: true, data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  });

  const data = schema.parse(req.body);
  const product = await productService.updateProduct(req.params.id as string, data);
  res.json({ success: true, data: product });
};

export const addItemsToProduct = async (req: Request, res: Response) => {
  const schema = z.object({
    items: z.array(z.object({
      itemType: z.nativeEnum(PurchasableItemType),
      itemId: z.string()
    }))
  });

  const data = schema.parse(req.body);
  const product = await productService.addItemsToProduct(req.params.id as string, data.items);
  res.json({ success: true, data: product });
};

export const removeItemsFromProduct = async (req: Request, res: Response) => {
  const schema = z.object({
    itemIds: z.array(z.string()) // ProductItem IDs to remove
  });

  const data = schema.parse(req.body);
  const product = await productService.removeItemsFromProduct(req.params.id as string, data.itemIds);
  res.json({ success: true, data: product });
};
