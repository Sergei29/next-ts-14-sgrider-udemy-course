export interface IPageProps<
  P = Record<string, string>,
  Q = Record<string, string>,
> {
  params: P
  searchParams: Q
}

export interface IEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ISnippet extends IEntity {
  title: string
  code: string
}
