import type { Snippet as ISnippet } from '@prisma/client'

export interface IPageProps<
  P = Record<string, string>,
  Q = Record<string, string>,
> {
  params: P
  searchParams: Q
}

export interface IFormState {
  message: string
}

export type SnippetFormValues = Pick<ISnippet, 'title' | 'code'>

export { ISnippet }
