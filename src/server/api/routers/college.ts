import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { type College, Prisma } from '@prisma/client';

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

      if (searchString) {
        // Prepare the formatted search string for full-text search
        const formattedSearchString = `${searchString.split(' ').join(' & ')}:*`; // Formats searchString for tsquery
  
        // Execute the full-text search using raw SQL
        const colleges = await ctx.db.$queryRaw(Prisma.sql`
          SELECT "id", "name", "url"
          FROM "College"
          WHERE "search_vector" @@ to_tsquery(${formattedSearchString})
          ORDER BY ts_rank_cd("search_vector", to_tsquery(${formattedSearchString})) DESC
          LIMIT ${take} OFFSET ${skip}
        `);
  
        return { colleges: colleges as College[] };
      } else {
        // If no searchString is provided, fallback to a standard Prisma query
        const colleges = await ctx.db.college.findMany({
          take,
          skip,
          orderBy: {
            name: 'asc',
          },
        });
  
        return { colleges };
      }
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
