import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { DegreeType } from '~/app/_models/DegreeType';

export const statsRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        gpa: z.number(),
        greVerbal: z.number(),
        greWritten: z.number(),
        degreeType: z.nativeEnum(DegreeType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const stats = await ctx.db.stats.create({
        data: input
      });

    return stats;
    }),
});
