import { Request, Response } from "express";
import { z } from "zod";
import * as paymentService from "./payments.service";

export const createOrder = async (req: Request, res: Response) => {
  const schema = z.object({
    productId: z.string(),
  });

  const { productId } = schema.parse(req.body);
  const studentId = req.user!.userId; // Assumes auth middleware sets req.user

  const result = await paymentService.createRazorpayOrder(studentId, productId);
  res.json({ success: true, data: result });
};

export const verifyPayment = async (req: Request, res: Response) => {
  const schema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
  });

  const data = schema.parse(req.body);

  const result = await paymentService.verifyRazorpaySignature(
    data.razorpay_order_id,
    data.razorpay_payment_id,
    data.razorpay_signature
  );

  res.json({ success: true, data: result });
};

export const getPurchaseHistory = async (req: Request, res: Response) => {
  const purchases = await paymentService.getHistory(req.user!.userId);
  res.json({ success: true, data: purchases });
};

export const getAllPurchases = async (req: Request, res: Response) => {
  const purchases = await paymentService.getAllPurchases();
  res.json({ success: true, data: purchases });
};
