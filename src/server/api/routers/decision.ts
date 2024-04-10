import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import { Decision_status, type Stats, type Verification, Program_degreeType, Decision_term, Stats_residency, Decision_visibility } from '@prisma/client';
import { api } from '~/trpc/server';
import { getServerSession } from 'next-auth';
import { genHeadlessUserId } from '~/app/_util/user';

export const decisionRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.string()
    ).query(async ({ ctx, input }) => {
      return await ctx.db.decision.findUniqueOrThrow({where:  {id: input}, select: {
        id: true,
        date: true,
        termYearString: true,
        status: true,
        program: {
          select: {
            name: true,
            degreeType: true,
            college: {
              select: {name: true}
            }
          },
        },
        verification: {
          select: {
            verified: true
           }
        },
        stats: {
          select: {
            gpa: true,
            residency: true,
          }
        }
      },})
    }),
  feed: publicProcedure
    .input(
      z
        .object({ 
          take: z.number().min(1).max(50).optional(),
          skip: z.number().min(0).optional(),
          userId: z.string().optional(),
          programId: z.number().optional(),
          status: z.nativeEnum(Decision_status).optional(),
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
        visibility: Decision_visibility.VISIBLE,
        OR: searchString ? [
          { program: { name: { contains: searchString} } },
          { program: { college: { name: { contains: searchString } } } },
        ] : undefined
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
        select: {
          id: true,
          date: true,
          termYearString: true,
          status: true,
          program: {
            select: {
              name: true,
              degreeType: true,
              college: {
                select: {name: true}
              }
            },
          },
          verification: {
            select: {
             verified: true
            }
          },
          stats: {
            select: {
              gpa: true,
              residency: true,
            }
          }
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
        newProgramInput: z.object({
          degreeType: z.nativeEnum(Program_degreeType),
          department: z.string().optional(),
          name: z.string(),
          url: z.string()
        }).optional(),
        status: z.nativeEnum(Decision_status),
        collegeId: z.number().int(),
        date: z.date(),
        term: z.nativeEnum(Decision_term),
        verificationInput: z.object({
          verified: z.boolean(),
          imgUrl: z.string()
        }),
        statsInput:  z.object({
            gpa: z.number().optional(),
            residency: z.nativeEnum(Stats_residency).optional(),
            greWritten: z.number().optional(),
            degreeType: z.nativeEnum(Program_degreeType).optional(),
          
        })
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {statsInput, verificationInput, collegeId, status, date, term, newProgramInput} = input;
      let {programId} = input;

      const statsResult: Stats = await api.stats.add.mutate(statsInput);
      const verificationResult: Verification = await api.verification.add.mutate(verificationInput);
      const session = await getServerSession();

      const verificationId = verificationResult.id;
      const statsId = statsResult.id;
      const userId = session?.user ? session.user.id : genHeadlessUserId();

      let visibility: Decision_visibility = Decision_visibility.VISIBLE;
      if (programId === -1) {
        visibility = Decision_visibility.NEEDS_REVIEW;
        if (newProgramInput) {
          const response = await api.program.add.mutate({
            collegeId: collegeId,
            ...newProgramInput
          });
          programId = response.id;
        } else {
          throw new Error("Malformed new program input");
        }
      }

      const data = {
        userId: userId,
        statsId: statsId,
        verificationId: verificationId,
        programId: programId,
        status: status,
        collegeId: collegeId,
        date: date,
        term: term,
        termYearString: `${term} ${date.getFullYear()}`,
        visibility: visibility
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
          status: z.nativeEnum(Decision_status).optional(),
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
