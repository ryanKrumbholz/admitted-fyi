import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type Role } from '@prisma/client'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import { env } from '~/env.js'
import { db } from '~/server/db'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
      role: Role
    } & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    //    AppleProvider({
    //      clientId: env.APPLE_ID,
    //      clientSecret: env.APPLE_SECRET,
    //    }),
    //    EmailProvider({
    //      server: env.EMAIL_SERVER,
    //      from: env.EMAIL_FROM,
    //      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    //    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
