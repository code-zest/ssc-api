import Razorpay from "razorpay";
import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import crypto from "crypto";

// Initialize Razorpay only if keys are present (for local dev without payment testing)
export const razorpay =
  env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: env.RAZORPAY_KEY_ID,
        key_secret: env.RAZORPAY_KEY_SECRET,
      })
    : null;

export const createRazorpayOrder = async (studentId: string, productId: string) => {
  if (!razorpay) throw new Error("Razorpay not configured on server.");

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new Error("Product not found");

  // Create order on Razorpay
  const options = {
    amount: product.price * 100, // Razorpay works in smallest currency unit (paise)
    currency: "INR",
    receipt: `rcpt_${studentId}_${productId}`,
  };

  const order = await razorpay.orders.create(options);

  // Store PENDING purchase in database
  const purchase = await prisma.purchase.create({
    data: {
      studentId,
      productId,
      amountPaid: product.price,
      status: "PENDING",
      razorpayOrderId: order.id,
    },
  });

  return {
    orderId: order.id,
    purchaseId: purchase.id,
    amount: options.amount,
    currency: options.currency,
  };
};

export const verifyRazorpaySignature = async (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  if (!env.RAZORPAY_KEY_SECRET) throw new Error("Razorpay secret not configured");

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === signature;

  if (isAuthentic) {
    // Update purchase status
    await prisma.purchase.updateMany({
      where: { razorpayOrderId: orderId },
      data: {
        status: "SUCCESS",
        paymentRefId: paymentId,
      },
    });
    return { success: true, message: "Payment verified successfully" };
  } else {
    // Optionally mark as FAILED
    await prisma.purchase.updateMany({
      where: { razorpayOrderId: orderId },
      data: {
        status: "FAILED",
        paymentRefId: paymentId,
      },
    });
    return { success: false, message: "Payment verification failed" };
  }
};

export const getHistory = async (studentId: string) => {
  return await prisma.purchase.findMany({
    where: { studentId },
    include: { 
      product: {
        include: {
          items: true
        }
      } 
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllPurchases = async () => {
  return await prisma.purchase.findMany({
    include: { product: true, student: true },
    orderBy: { createdAt: "desc" },
  });
};
