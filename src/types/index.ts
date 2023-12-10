import { ReactNode } from 'react'

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
  }
}
