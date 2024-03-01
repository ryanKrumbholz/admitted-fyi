import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure } from '../trpc';
import { z } from 'zod';
import { Verification } from '@prisma/client';

export const verificationRouter = createTRPCRouter({
  add: internalProcedure
    .input(
      z.object({
        verified: z.boolean(),
        imgUrl: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) : Promise<Verification> => {
      const verification = await ctx.db.verification.create({
        data: input
      });

    return verification;
    }),
});
