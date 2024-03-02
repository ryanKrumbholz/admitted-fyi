import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import { Status, Stats, Verification, DegreeType, Term, Residency } from '@prisma/client';
import { api } from '~/trpc/server';
import { getServerSession } from 'next-auth';
import { genHeadlessUserId } from '~/app/_util/user';

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
          searchString: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const { take = 50, skip, userId, programId, status, searchString } = input ?? {}

      const where = {
        userId,
        programId, 
        status,
        OR: searchString ? [
          { program: { name: { contains: searchString} } },
          { program: { college: { name: { contains: searchString } } } },
        ] : undefined,
      };

      if (userId) {
        where.userId = userId;
      }
      if (programId) {
        where.programId = programId;
      }
      if (status) {
        where.status = status;
      }

      const decisions = await ctx.db.decision.findMany({
        take,
        skip,
        where,
        orderBy: {
          date: 'desc',
        },
        include: {
          program: {
            include: {
              college: true, // Ensure college data is included for the program
            },
          },
          verification: true,
          stats: true
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
        programId: z.number().int(),
        status: z.nativeEnum(Status),
        collegeId: z.number().int(),
        date: z.date(),
        term: z.nativeEnum(Term),
        verificationInput: z.object({
          verified: z.boolean(),
          imgUrl: z.string()
        }),
        statsInput:  z.object({
            gpa: z.number().optional(),
            residency: z.nativeEnum(Residency).optional(),
            greWritten: z.number().optional(),
            degreeType: z.nativeEnum(DegreeType).optional(),
          
        })
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {statsInput, verificationInput, collegeId, programId, status, date, term} = input;

      const statsResult: Stats = await api.stats.add.mutate(statsInput);
      const verificationResult: Verification = await api.verification.add.mutate(verificationInput);
      const session = await getServerSession();

      const verificationId = verificationResult.id;
      const statsId = statsResult.id;
      const userId = session?.user ? session.user.id : genHeadlessUserId();

      const data = {
        userId: userId,
        statsId: statsId,
        verificationId: verificationId,
        programId: programId,
        status: status,
        collegeId: collegeId,
        date: date,
        term: term,
        termYearString: `${term} ${date.getFullYear()}`
      }

      const decision = await ctx.db.decision.create({
        data: data
      });

      return {
        decision: decision,
        redirectUrl: '/'
      };
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
    .input(z.string())
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
