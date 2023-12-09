'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import { IParentProps } from '@/types'

interface IProps extends IParentProps {
  session?: Session | null
}

const AuthSessionProvider = ({ session, children }: IProps): JSX.Element => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider
