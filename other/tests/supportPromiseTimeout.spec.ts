import supportPromiseTimeout from './utils/supportPromiseTimeout'

function createPromise(time: number, success: boolean, data: any) {
  return new Promise((r, j) =>
    setTimeout(() => {
      success ? r(data) : j(data)
    }, time),
  )
}

describe('supportPromiseTimeout', () => {
  it('响应正常', async () => {
    const data = {}
    const res = await supportPromiseTimeout(1000, createPromise(10, true, data))

    expect(res).toBe(data)
  })

  it('响应异常', async () => {
    const data = {}
    try {
      await supportPromiseTimeout(1000, createPromise(10, false, data))

      expect(false).toBeTruthy()
    } catch (err) {
      expect(err).toBe(data)
    }
  })

  it('响应超时', async () => {
    const data = {}
    try {
      await supportPromiseTimeout(10, createPromise(20, false, data))

      expect(false).toBeTruthy()
    } catch (err) {
      const isTimeout = err.message.includes('supportPromiseTimeout')
      expect(isTimeout).toBeTruthy()
    }
  })
})
