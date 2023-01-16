export default function supportPromiseTimeout<T = any>(
  time: number,
  promise: Promise<T>,
): Promise<T> {
  let timeoutId: any = null

  return new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('[supportPromiseTimeout]: 请求超时'))
    }, time)

    const clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    promise
      .then((v) => {
        clear()
        resolve(v)
      })
      .catch((e) => {
        clear()
        reject(e)
      })
  })
}
