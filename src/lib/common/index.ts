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
