import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma, type Program, Program_degreeType } from '@prisma/client';

export const programRouter = createTRPCRouter({
  add: publicProcedure
  .input(
    z.object({
      collegeId: z.number(),
      degreeType: z.nativeEnum(Program_degreeType),
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
        degreeType: z.nativeEnum(Program_degreeType)
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const { take = 50, skip, searchString, collegeId, degreeType } = input ?? {};

      if (searchString) {
        const formattedSearchString = `${searchString.replace(/\s+/g, ' & ')}:*`;
        const programs = await ctx.db.$queryRaw(Prisma.sql`
          SELECT p."id", p."name", p."department", p."url", p."verified", c."id" AS "college_id", c."name" AS "college_name"
          FROM "Program" p
          INNER JOIN "College" c ON p."collegeId" = c."id"
          WHERE p."search_vector" @@ to_tsquery(${formattedSearchString}) AND
                p."collegeId" = ${collegeId} AND
                p."degreeType"::text = ${degreeType}
          ORDER BY p."name"
          LIMIT ${take} OFFSET ${skip}
      `);
      return { programs: programs as Program[] }
      } else {
        const programs = await ctx.db.program.findMany({
            take,
            skip,
            where: {
              collegeId,
              degreeType,
            },
            include: {
              college: true,
            },
            orderBy: {
              name: 'asc',
            },
          })
        return { programs }
      }
    }),
});
