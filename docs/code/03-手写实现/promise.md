> polyfill 参考[链接](https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js)

```js
function isObject(data) {
  return data && typeof data === 'object'
}

function isFunction(data) {
  return typeof data === 'function'
}

function handle(promise, deferred) {
  // 为什么是通过新的状态 3 来判断 value 为 Promise，而不是直接判断 promise.value 为 promise？
  // 因为 reject 的 Promise 不需要铺平，只有 resolve 的 value 需要铺平
  if (promise.state === 3) {
    promise = promise.value
  }
  if (promise.state === 0) {
    promise.deferreds.push(deferred)
    return
  }
  promise.done = true
  setTimeout(() => {
    const { onFulfilled, onRejected, promise: pro } = deferred
    const fn = promise.state === 1 ? onFulfilled : onRejected
    if (typeof fn !== 'function') {
      ;(promise.state === 1 ? resolve : reject)(pro, promise.value)
      return
    }
    try {
      const data = fn(promise.value)
      resolve(pro, data)
    } catch (error) {
      reject(pro, error)
    }
  })
}

function flushDeferreds(promise) {
  // 最后一个未处理的异常，应该抛出
  if (promise.state === 2 && !promise.deferreds.length) {
    setTimeout(() => {
      if (!promise.done) {
        console.warn('Possible Unhandled Promise Rejection:', promise.value)
      }
    })
    return
  }
  promise.deferreds.forEach((deferred) => {
    handle(promise, deferred)
  })
  promise.deferred = []
}

function resolve(promise, data) {
  // 不能解析自己
  if (promise === data) {
    throw new TypeError('promise cannot be resolved with itself.')
  }
  // data 具有 then 方法
  if (isObject(data) || isFunction(data)) {
    if (data instanceof FakePromise) {
      promise.state = 3
      promise.value = data
      flushDeferreds(promise)
      return
    }
    // 测试用例中，有限制 then 的 get 次数，所以必须提前且只调用 get 一次
    const then = data.then
    if (isFunction(then)) {
      doConstructor(then.bind(data), promise)
      return
    }
  }

  promise.state = 1
  promise.value = data
  flushDeferreds(promise)
}

function reject(promise, error) {
  promise.state = 2
  promise.value = error
  flushDeferreds(promise)
}

function doConstructor(fn, promise) {
  try {
    fn(
      (data) => {
        if (promise.state === 0) {
          resolve(promise, data)
        }
      },
      (error) => {
        if (promise.state === 0) {
          reject(promise, error)
        }
      },
    )
  } catch (error) {
    if (promise.state === 0) {
      reject(promise, error)
    }
  }
}

class FakePromise {
  static resolve(data) {
    if (data instanceof FakePromise) {
      return data
    }
    return new FakePromise((r) => r(data))
  }

  static reject(error) {
    return new FakePromise((r, j) => j(error))
  }

  static deferred() {
    const result = {}
    result.promise = new FakePromise((r, reject) => {
      result.resolve = r
      result.reject = reject
    })
    return result
  }

  static all(datas) {
    return new FakePromise((resol, rejec) => {
      const result = []
      let remaining = datas.length
      const flush = (data, index) => {
        if (isObject(data) || isFunction(data)) {
          const then = data.then
          // 这里没有像 resolve 中一样判断是否为 Promise
          if (isFunction(then)) {
            then.call(
              data,
              (d) => {
                flush(d, index)
              },
              rejec,
            )
          }
          return
        }
        result[index] = data
        remaining--
        if (remaining <= 0) {
          resol(result)
        }
      }
      datas.forEach(flush)
    })
  }

  constructor(fn) {
    this.state = 0 // 0, 1, 2, 3. 3: value 为 Promise
    this.value = undefined // FakePromise, any
    this.deferreds = [] // {onFulfilled, onReject, FakePromise}
    this.done = false

    doConstructor(fn, this)
  }

  then(onFulfilled, onRejected) {
    const promise = new FakePromise(() => {})
    const deferred = {
      promise,
      onFulfilled,
      onRejected,
    }
    handle(this, deferred)
    return promise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    // 这里包装一层 FakePromise.resolve，是因为如果 callback 返回是 Promise，需要等待其解析
    return this.then(
      (data) => {
        return FakePromise.resolve(callback()).then(() => {
          return data
        })
      },
      (error) => {
        return FakePromise.resolve(callback()).then(() => {
          return FakePromise.reject(error)
        })
      },
    )
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
