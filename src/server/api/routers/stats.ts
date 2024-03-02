import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure } from '../trpc';
import { z } from 'zod';
import { Stats, DegreeType, Residency } from '@prisma/client';

export const statsRouter = createTRPCRouter({
  add: internalProcedure
    .input(
      z.object({
        gpa: z.number().optional(),
        residency: z.nativeEnum(Residency).optional(),
        greWritten: z.number().optional(),
        degreeType: z.nativeEnum(DegreeType).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) : Promise<Stats> => {
      const stats = await ctx.db.stats.create({
        data: input
      });

    return stats;
    }),
});
