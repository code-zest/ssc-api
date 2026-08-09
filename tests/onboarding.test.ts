import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

describe('Onboarding API', () => {
  let userToken: string;
  let userId: string;
  const testEmail = 'onboarding.test@gmail.com';

  beforeAll(async () => {
    // 1. Create a Test User
    const passwordHash = await bcrypt.hash('testpass', 10);
    const user = await prisma.user.upsert({
      where: { email: testEmail },
      update: {
        onboardingComplete: false,
        studyPersona: null,
      },
      create: {
        name: 'Onboarding Test User',
        email: testEmail,
        passwordHash,
        role: Role.STUDENT,
        isEmailVerified: true,
      },
    });
    
    userId = user.id;

    // 2. Log in to get token
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testEmail, password: 'testpass' });
    
    expect(loginRes.status).toBe(200);
    userToken = loginRes.body.data.accessToken;
  });

  afterAll(async () => {
    // Clean up
    await prisma.user.delete({
      where: { email: testEmail },
    });
  });

  it('should validate missing required fields', async () => {
    const res = await request(app)
      .post('/api/v1/users/onboarding')
      .set('Authorization', `Bearer ${userToken}`)
      .send({}); // Empty payload

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  it('should assign REPEAT_ASPIRANT if hasAttemptedBefore is true', async () => {
    const payload = {
      targetExam: 'SSC_CGL',
      examYear: 2026,
      occupation: 'Student',
      hasAttemptedBefore: true,
      dailyStudyTime: 'MORE_THAN_4_HOURS'
    };



    const res = await request(app)
      .post('/api/v1/users/onboarding')
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload);

    if (res.status !== 200) console.log('Response for REPEAT_ASPIRANT:', JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.data.studyPersona).toBe('REPEAT_ASPIRANT');
    expect(res.body.data.onboardingComplete).toBe(true);
  });

  it('should assign PART_TIME_ASPIRANT if occupation indicates working professional', async () => {
    // Reset user state
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingComplete: false, studyPersona: null }
    });

    const payload = {
      targetExam: 'SSC_CHSL',
      examYear: 2026,
      occupation: 'Software Engineer', // Contains 'engineer' keyword
      hasAttemptedBefore: false,
      dailyStudyTime: 'LESS_THAN_2_HOURS'
    };


    const res = await request(app)
      .post('/api/v1/users/onboarding')
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.data.studyPersona).toBe('PART_TIME_ASPIRANT');
  });

  it('should assign FULL_TIME_ASPIRANT if no part-time or repeat signals are present', async () => {
    // Reset user state
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingComplete: false, studyPersona: null }
    });

    const payload = {
      targetExam: 'SSC_CPO',
      examYear: 2026,
      occupation: 'College Student',
      hasAttemptedBefore: false,
      dailyStudyTime: 'MORE_THAN_4_HOURS',
      age: 22, // testing optional demographics

      gender: 'MALE'
    };


    const res = await request(app)
      .post('/api/v1/users/onboarding')
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.data.studyPersona).toBe('FULL_TIME_ASPIRANT');
    expect(res.body.data.user.age).toBe(22);
    expect(res.body.data.user.gender).toBe('MALE');


    // Verify DB
    const user = await prisma.user.findUnique({ where: { id: userId } });
    expect(user?.studyPersona).toBe('FULL_TIME_ASPIRANT');
    expect(user?.age).toBe(22);
    expect(user?.onboardingComplete).toBe(true);
  });
});
