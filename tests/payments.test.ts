import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import crypto from 'crypto';

// Mock Razorpay SDK
jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => {
    return {
      orders: {
        create: jest.fn().mockReturnValue(Promise.resolve({ id: 'order_test_123', amount: 9900, currency: 'INR' })),
      },
    };
  });
});

describe('E2E Payments API', () => {
  let studentToken: string;
  let studentId: string;
  let purchaseId: string;

  beforeAll(async () => {
    // 1. Log in as the E2E Student created in the seeder
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'e2e.student@gmail.com', password: 'testpass' });
    
    expect(loginRes.status).toBe(200);
    studentToken = loginRes.body.data.accessToken;
    studentId = loginRes.body.data.user.id;
  });

  afterAll(async () => {
    // Clean up created purchase so tests can run repeatedly
    await prisma.purchase.deleteMany({
      where: { studentId },
    });
  });

  it('should successfully create a razorpay order for a product', async () => {
    const res = await request(app)
      .post('/api/v1/payments/create-order')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ productId: 'e2e-product-1' });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('orderId', 'order_test_123');
    expect(res.body.data).toHaveProperty('purchaseId');
    purchaseId = res.body.data.purchaseId;

    // Verify DB
    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    expect(purchase).not.toBeNull();
    expect(purchase?.status).toBe('PENDING');
  });

  it('should successfully verify the payment signature and update purchase status', async () => {
    const orderId = 'order_test_123';
    const paymentId = 'pay_test_123';
    
    // Generate valid signature using the test secret
    const body = orderId + "|" + paymentId;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    const res = await request(app)
      .post('/api/v1/payments/verify')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });

    expect(res.status).toBe(200);
    expect(res.body.data.success).toBe(true);

    // Verify DB is updated
    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    expect(purchase?.status).toBe('SUCCESS');
    expect(purchase?.paymentRefId).toBe(paymentId);
  });

  it('should list the purchase in the student history', async () => {
    const res = await request(app)
      .get('/api/v1/payments/history')
      .set('Authorization', `Bearer ${studentToken}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const purchase = res.body.data.find((p: { id: string, product: { id: string } }) => p.id === purchaseId);
    expect(purchase).toBeDefined();
    expect(purchase.product.id).toBe('e2e-product-1');
  });
});
