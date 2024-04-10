import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const collegeRouter = createTRPCRouter({
  // Query colleges with optional filters
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
          name: {
            search: searchString,
          },
        } : {};

      const colleges = await ctx.db.college.findMany({
        take,
        skip,
        where,
        orderBy: {
          _relevance: {
            fields: ['name'],
            search: 'database',
            sort: 'asc'
          },
      }});

      return {
        colleges
      };
    }),

//   // Add a new college
//   add: internalProcedure
//     .input(
//       z.object({
//         name: z.string().min(1),
//         url: z.string().url().optional(),
//         description: z.string().optional(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       // Ensure the user has the right to add a college
//       // Implement your authorization logic here
//       // For simplicity, we'll assume the check passes

//       const newCollege = await ctx.db.college.create({
//         data: input,
//       });

//       return newCollege;
//     }),
});
