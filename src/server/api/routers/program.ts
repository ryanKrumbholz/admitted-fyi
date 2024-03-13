import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { DegreeType } from '@prisma/client';

export const programRouter = createTRPCRouter({
  add: publicProcedure
  .input(
    z.object({
      collegeId: z.number(),
      degreeType: z.nativeEnum(DegreeType),
      department: z.string().optional(),
      name: z.string(),
      url: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const response = await ctx.db.program.create({
      data: input
    });
    return response
  }),
  list: publicProcedure
    .input(
      z.object({
        take: z.number().min(1).max(50).optional(),
        skip: z.number().min(0).optional(),
        searchString: z.string().optional(),
        collegeId: z.number(),
        degreeType: z.nativeEnum(DegreeType)
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const { take = 50, skip, searchString, collegeId, degreeType } = input ?? {};

      const where = {
        AND: [
          searchString ? {
            name: { startsWith: searchString },
          } : {},
          { collegeId, degreeType },
        ],
      };

      const programs = await ctx.db.program.findMany({
        take,
        skip,
        where,
        include: {
          college: true
        },
        orderBy: { name: 'asc' },
      });

      return {
        programs,
      };
    }),
});
