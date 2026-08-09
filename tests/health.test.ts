import request from 'supertest';
import app from '../src/app';
import { describe, it, expect } from '@jest/globals';

describe('API Health', () => {
  it('should return 200 OK on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.status).toBe(404);
  });
});
