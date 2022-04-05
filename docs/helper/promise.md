```js
class FakePromise {
  constructor(run) {
    this.state = 'pedding' // pedding, fulfilled, rejected
    this.data = undefined // Promise | any
    this.waitings = [] // <promise, onFulfilled, onRejected>[]

    try {
      run(
        (value) => {
          if (this.state === 'pedding') {
            this.#resolve(this, value)
          }
        },
        (error) => {
          if (this.state === 'pedding') {
            this.#reject(this, error)
          }
        },
      )
    } catch (err) {
      if (this.state === 'pedding') {
        this.#reject(this, err)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const promise = new FakePromise(() => {})
    const waiting = {
      promise,
      onFulfilled,
      onRejected,
    }
    this.#handle(this, waiting)
    return promise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  #resolve(promise, value) {
    promise.state = 'fulfilled'
    promise.data = value
    this.#flushWaitings(promise)
  }

  #reject(promise, error) {
    promise.state = 'rejected'
    promise.value = error
    this.#flushWaitings(promise)
  }

  #flushWaitings(promise) {
    promise.waitings.forEach((waiting) => {
      this.#handle(promise, waiting)
    })
    promise.waitings = []
  }

  #handle(promise, waiting) {
    if (promise.data instanceof FakePromise) {
      promise = promise.data
    }
    if (promise.state === 'pedding') {
      promise.waitings.push(waiting)
      return
    }
    setTimeout(() => {
      const { onFulfilled, onRejected, promise: pro } = waiting
      const fn = promise.state === 'fulfilled' ? onFulfilled : onRejected
      if (!fn) {
        const done =
          promise.state === 'fulfilled' ? this.#resolve : this.#reject
        done(pro, promise.data)
        return
      }
      try {
        const res = fn(promise.data)
        this.#resolve(pro, res)
      } catch (err) {
        this.#reject(pro, err)
      }
    })
  }
}
```

测试代码

```js
let promise1 = new FakePromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 2000)
})
let promise2 = new FakePromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1234)
  }, 1000)
})

console.time('a')
console.time('b')
promise1
  .then(
    (res) => {
      console.timeEnd('a')
      console.log(res) // 过两秒输出123
      return new FakePromise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, 1000)
      })
    },
    (err) => {
      console.log(err)
    },
  )
  .then(
    (res) => {
      console.timeEnd('b')
      console.log(res) // 再过一秒输出success
    },
    (err) => {
      console.log(err)
    },
  )
```
