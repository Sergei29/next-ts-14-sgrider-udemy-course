import NextAuth, { NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '@/lib/db'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
if (!GITHUB_CLIENT_ID) {
  throw new Error('process.env.GITHUB_CLIENT_ID is missing')
}
if (!GITHUB_CLIENT_SECRET) {
  throw new Error('process.env.GITHUB_CLIENT_SECRET is missing')
}

export const nextAuthConfig: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    /**
     * @description this callback is going to be called each time we verify the
     * user login status and who the user is, it returns current session object;
     * Usually this callback is not needed, but for this next-auth version we
     * are fixing a bug in next-auth, where the session user doesn't have user's
     * id.
     */
    session: async ({ token, user, session, trigger }) => {
      if (!!session && !!user) {
        ;(session.user as Record<string, any>).id = user.id
      }

      return session
    },
  },
  trustHost: true,
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth(nextAuthConfig)
