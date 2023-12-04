export interface IPageProps<
  P = Record<string, string>,
  Q = Record<string, string>,
> {
  params: P
  searchParams: Q
}

export interface ISnippet {
  id: string
  title: string
  code: string
}
