import { ReactNode } from 'react'
import type {
  Comment as IComment,
  User as IUserDb,
  Topic as ITopic,
  Post as IPost,
} from '@prisma/client'

export type { IComment, IUserDb, ITopic, IPost }
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

export interface IPostWithDetails {
  title: string
  id: string
  user: Pick<IUserDb, 'name'>
  topic: Pick<ITopic, 'slug'>
  _count: {
    comments: number
  }
}

export interface ICommentWithAuthor {
  id: string
  content: string
  user: Pick<IUserDb, 'name' | 'image'>
  postId: string
  parentId: string | null
}
