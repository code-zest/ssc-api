import { z } from 'zod';

export const getLeaderboardSchema = z.object({
  limit: z.coerce.number().int().positive().default(10),
});
