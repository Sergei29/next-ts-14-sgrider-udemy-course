'use server'

import * as auth from '@/lib/auth'

export const signInAction = async () => {
  return auth.signIn('github')
}

export const signOutAction = async () => {
  return auth.signOut()
}
