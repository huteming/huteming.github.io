```js
function limitPromise(promises, limit) {
  const runningPromises = []
  const readyPromises = []

  const run = (promises) => {
    if (!promises.length) {
      return Promise.resolve()
    }
    const promise = promises.shift()()
    readyPromises.push(promise)

    const runningPromise = promise.then(() => {
      const index = runningPromises.findIndex((p) => p === runningPromise)
      runningPromises.splice(index, 1)
    })
    runningPromises.push(runningPromise)

    if (runningPromises.length >= limit) {
      return Promise.race(runningPromises).then(() => run(promises))
    }
    return run(promises)
  }

  return run(promises.concat()).then(() => Promise.all(readyPromises))
}
```

测试代码

```js
function createPromise(time, data) {
  return function () {
    return new Promise((r) => setTimeout(r.bind(null, data || time), time))
  }
}

const promises = [
  createPromise(100),
  createPromise(400),
  createPromise(200),
  createPromise(300),
]

limitPromise(promises, 2).then((res) => {
  console.log(res)
})
```
