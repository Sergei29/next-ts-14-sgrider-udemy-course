import { ISnippet, SnippetFormValues } from '@/types'

export const wait = (timeout: number, errorMessage?: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage))
      } else {
        resolve(null)
      }
    }, timeout)
  })

export const validateSnippetEdit = {
  hasChanged: (
    values: SnippetFormValues,
    snippet: Pick<ISnippet, 'id' | 'title' | 'code'>,
  ) => {
    return values.title !== snippet.title || values.code !== snippet.code
  },
  isValid: (values: SnippetFormValues) => {
    if (!values.code || !values.title) return false

    return true
  },
}

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : (error as any).toString()
