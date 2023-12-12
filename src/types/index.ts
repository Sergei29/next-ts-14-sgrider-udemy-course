import { ReactNode } from 'react'
import type { Comment as IComment, User as IUserDb } from '@prisma/client'

export type { IComment, IUserDb }
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

export interface IFormStateCreateComment {
  errors?: {
    content?: string[]
    _form?: string[]
  }
  success?: boolean
}

export interface IUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface ICommentShow
  extends Pick<IComment, 'id' | 'parentId' | 'postId' | 'content'> {
  user: Pick<IUserDb, 'image' | 'name'>
}
