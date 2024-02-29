import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';

export const programRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        take: z.number().min(1).max(50).optional(),
        skip: z.number().min(0).optional(),
        searchString: z.string().optional(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const { take = 50, skip, searchString } = input ?? {};

      const where = searchString
        ? {
            OR: [
              { name: { contains: searchString, mode: 'insensitive' } },
              { description: { contains: searchString, mode: 'insensitive' } },
            ],
          }
        : {};

      const programs = await ctx.db.program.findMany({
        take,
        skip,
        where,
        include: {
          college: true
        },
        orderBy: { name: 'asc' },
      });

      const programCount = await ctx.db.program.count({ where });

      return {
        programs,
        programCount,
      };
    }),
});
