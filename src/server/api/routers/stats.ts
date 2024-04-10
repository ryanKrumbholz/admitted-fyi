import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure } from '../trpc';
import { z } from 'zod';
import { type Stats, Program_degreeType, Stats_residency } from '@prisma/client';

export const statsRouter = createTRPCRouter({
  add: internalProcedure
    .input(
      z.object({
        gpa: z.number().optional(),
        residency: z.nativeEnum(Stats_residency).optional(),
        greWritten: z.number().optional(),
        degreeType: z.nativeEnum(Program_degreeType).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) : Promise<Stats> => {
      const stats = await ctx.db.stats.create({
        data: input
      });

    return stats;
    }),
});
