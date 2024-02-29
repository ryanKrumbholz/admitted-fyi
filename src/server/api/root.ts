import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user'
import { decisionRouter } from './routers/decision'
import { collegeRouter } from './routers/college'
import { programRouter } from './routers/program'
import { s3Router } from './routers/s3'
import { statsRouter } from './routers/stats'
import { verificationRouter } from './routers/verification'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  decision: decisionRouter,
  college: collegeRouter,
  program: programRouter,
  s3Router: s3Router,
  statsRouter: statsRouter,
  verificationRouter: verificationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
