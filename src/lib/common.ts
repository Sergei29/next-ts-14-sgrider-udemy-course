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
