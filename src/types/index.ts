import { ReactNode } from 'react'

export type { Topic as ITopic } from '@prisma/client'
export type { Post as IPost } from '@prisma/client'
export interface IPageProps<
  P = Record<string, string>,
  Q = Record<string, string>,
> {
  params: P
  searchParams: Q
}

export interface IParentProps {
  children: ReactNode
}

export interface IFormStateCreateTopic {
  errors?: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export interface IFormStateCreatePost {
  errors?: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export interface IUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}
