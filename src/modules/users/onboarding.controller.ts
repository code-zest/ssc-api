import { Request, Response } from "express";
import * as onboardingService from "./onboarding.service";

// Validation for these routes is handled by the validate() middleware
// in users.routes.ts using onboardingSchema and updateProfileSchema from users.schemas.ts

export const completeOnboarding = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await onboardingService.completeOnboarding(userId, req.body);
  res.json({ success: true, data: result });
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const user = await onboardingService.updateProfile(userId, req.body);
  res.json({ success: true, data: user });
};
