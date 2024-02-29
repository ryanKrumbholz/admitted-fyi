import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user'
import { decisionRouter } from './routers/decision'
import { collegeRouter } from './routers/college'
import { programRouter } from './routers/program'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  decision: decisionRouter,
  college: collegeRouter,
  program: programRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
