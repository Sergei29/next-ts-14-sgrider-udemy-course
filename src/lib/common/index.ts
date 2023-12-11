export const wait = (timeout: number, error?: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve('done')
      }
    }, timeout)
  })

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return (error as any).toString()
}
