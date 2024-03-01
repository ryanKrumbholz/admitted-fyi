import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { DegreeType } from '~/app/_models/DegreeType';
import { strictEqual } from 'assert';

export const programRouter = createTRPCRouter({
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
        ...(searchString && { 
          name: { startsWith: searchString }, // Filter by name starting with searchString
        }),
        collegeId, // Directly use collegeId for filtering
        degreeType, // Filter by degreeType
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

      const programCount = await ctx.db.program.count({ where });

      return {
        programs,
        programCount,
      };
    }),
});
