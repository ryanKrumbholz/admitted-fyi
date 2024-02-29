import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import { Status, College } from '@prisma/client';

export const decisionRouter = createTRPCRouter({
  feed: publicProcedure
    .input(
      z
        .object({ 
          take: z.number().min(1).max(50).optional(),
          skip: z.number().min(0).optional(),
          userId: z.string().optional(),
          programId: z.number().optional(),
          status: z.nativeEnum(Status).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const { take = 50, skip, userId, programId, status } = input ?? {}

      const where = {
        userId,
        programId, 
        status,
      }

      const decisions = await ctx.db.decision.findMany({
        take,
        skip,
        where,
        orderBy: {
          date: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          program: {
            include: {
              college: true, // Accesses collegeName
            },
          },
          verification: true
        },
      })

      const decisionCount = await ctx.db.decision.count({ where })

      return {
        decisions,
        decisionCount,
      }
    }),

  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        programId: z.number().int(),
        status: z.nativeEnum(Status),
        verificationId: z.number().int(),
        collegeId: z.number().int()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const decision = await ctx.db.decision.create({
        data: input
      })

      return decision
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          status: z.nativeEnum(Status).optional(),
          content: z.string().min(1).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input

      const decision = await ctx.db.decision.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      })

      if (decision?.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }

      const updatedDecision = await ctx.db.decision.update({
        where: { id },
        data: {
          status: data.status,
        },
      })

      return updatedDecision
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => {
      const decision = await ctx.db.decision.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      })

      if (decision?.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }

      await ctx.db.decision.delete({ where: { id } })

      return { id }
    }),
})
