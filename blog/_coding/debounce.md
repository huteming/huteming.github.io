---
title: 实现 debounce 和 throttle
summary: 手写实现节流(throttle)和防抖(debounce)函数
date: 2020-04-03
---

-------------------------

这次实现并没有参考网上的实现，只是根据之前的使用经验来写。如果需要参考，可以看loadsh的实现，[debounce](https://github.com/lodash/lodash/blob/master/debounce.js) 还有 [throttle](https://github.com/lodash/lodash/blob/master/throttle.js)

## 解析

1. 两个函数都是为了限制函数的执行次数，在指定时间内，只触发一次，区别只是这个指定时间的计算

2. 有些地方还把头尾是否执行加入到区别中，但其实更好的做法应该是让调用者自己选择是否是否需要在头尾触发

::: tip 对于debounce
1. 指定时间段是按**最近一次触发的时间**算起

2. 指定时间内触发，**会延迟执行**
:::

::: tip 对于throttle
1. 指定时间段时按**最近一次执行时间**算起

2. 指定时间内触发，**会忽略**
:::

## debounce

```js
function debounce (callback, ms, immediate) {
  if (typeof callback !== 'function') {
    throw new Error('回调函数错误')
  }

  let timer = 0

  const exec = function () {
    // 不管怎么样，都要清除之前的定时器
    clearTimeout(timer)

    // 立即执行
    if (immediate) {
      // 此时不一定过了指定时间
      // 过了指定时间才执行，否则忽略
      if (!timer) {
        callback.apply(this, arguments)
      }
      timer = setTimeout(function () {
        timer = 0
      }, ms)
      return
    }

    timer = setTimeout(() => {
      callback.apply(this, arguments)
      timer = 0
    }, ms)
  }

  exec.cancel = function cancel () {
    clearTimeout(timer)
    timer = 0
  }

  return exec
}
```

## throttle

```js
export function throttle (callback, ms, options = {}) {
  const { start = true, end = true } = options
  let lastTime = 0
  let timer = 0

  const handle = function () {
    callback.apply(this, arguments)
    lastTime = Date.now()
  }

  const exec = function () {
    clearTimeout(timer)

    // 在首次触发
    if (start && lastTime === 0) {
      handle.apply(this, arguments)
      return
    }
    const now = Date.now()
    // lastTime = 0 意味着是首次触发
    // 如果首次不允许执行，则把 lastTime 设为现在，视作刚刚执行
    // 否则后续时间判断会认为可以执行
    if (!start && lastTime === 0) {
      lastTime = now
    }
    const pass = now - lastTime
    // 已经经过指定时间
    if (pass > ms) {
      handle.apply(this, arguments)
      return
    }
    // 需要在结束时触发
    if (end) {
      timer = setTimeout(() => {
        handle.apply(this, arguments)
        // 因为这里是指定时间结束了，自动触发。所以下次进来一定认为是首次触发
        lastTime = 0
      }, ms - pass)
    }
  }

  exec.cancel = function cancel () {
    lastTime = 0
    clearTimeout(timer)
  }

  return exec
}
```

## 测试用例

也没有对比，为了证明函数正常可用，写了几个测试用例

```js
describe('debounce', () => {
  it('指定时间之后才执行', async () => {
    const fn = sinon.fake()
    const exec = debounce(fn, 10)
    exec()
    assert.strictEqual(fn.callCount, 0)
    await sleep(30)
    assert.strictEqual(fn.callCount, 1)
  })

  it('指定时间后执行的是最后一次触发', async () => {
    const fn = sinon.fake()
    const exec = debounce(fn, 10)
    exec(1)
    exec(2)
    exec(3)
    exec(4)
    assert.strictEqual(fn.callCount, 0)
    await sleep(30)
    assert.strictEqual(fn.callCount, 1)
    assert.deepStrictEqual(fn.getCall(0).args, [4])
  })

  it('立即执行', async () => {
    const fn = sinon.fake()
    const exec = debounce(fn, 10, true)
    exec()
    exec(1)
    exec(2)
    assert.strictEqual(fn.callCount, 1)
    await sleep(30)
    assert.strictEqual(fn.callCount, 1)
  })

  it('可以被手动取消', async () => {
    const fn = sinon.fake()
    const exec = debounce(fn, 10)
    exec()
    exec(1)
    exec(2)
    exec.cancel()
    assert.strictEqual(fn.callCount, 0)
    await sleep(30)
    assert.strictEqual(fn.callCount, 0)
  })

  it('立即执行时的上下文是执行函数的上下文', async () => {
    const fn = sinon.fake()
    const mockSelf = {}
    const exec = debounce(fn, 10, true).bind(mockSelf)
    exec()
    assert.strictEqual(fn.callCount, 1)
    assert.strictEqual(fn.getCall(0).thisValue, mockSelf)
  })

  it('延迟执行时的上下文是执行函数的上下文', async () => {
    const fn = sinon.fake()
    const mockSelf = {}
    const exec = debounce(fn, 10).bind(mockSelf)
    exec()
    await sleep(20)
    assert.strictEqual(fn.callCount, 1)
    assert.strictEqual(fn.getCall(0).thisValue, mockSelf)
  })
})
```

```js
describe('throttle', () => {
  it('默认开始和结束都会执行', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5)
    handler()
    handler()
    handler()
    assert.strictEqual(fn.callCount, 1)
    await sleep(30)
    assert.strictEqual(fn.callCount, 2)
  })

  it('开始时立即执行一次', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5, { start: true, end: false })
    handler()
    assert.strictEqual(fn.callCount, 1)
  })

  it('指定时间中触发不会执行', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5, { start: false, end: false })
    handler()
    handler()
    handler()
    assert.strictEqual(fn.callCount, 0)
    await sleep(20)
    assert.strictEqual(fn.callCount, 0)
  })

  it('指定时间后触发会执行', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5, { start: false, end: false })
    handler()
    handler()
    handler()
    assert.strictEqual(fn.callCount, 0)
    await sleep(10)
    handler()
    handler()
    handler()
    await sleep(10)
    assert.strictEqual(fn.callCount, 1)
  })

  it('指定时间中触发的最后一次延迟执行', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5, { start: false, end: true })
    handler(1)
    handler(2)
    handler(3)
    assert.strictEqual(fn.callCount, 0)
    await sleep(20)
    assert.strictEqual(fn.callCount, 1)
    assert.deepStrictEqual(fn.getCall(0).args, [3])
  })

  it('可以被取消', async () => {
    const fn = sinon.fake()
    const handler = throttle(fn, 5, { start: false, end: true })
    handler(1)
    handler(2)
    handler(3)
    handler.cancel()
    await sleep(20)
    assert.strictEqual(fn.callCount, 0)
  })
})
```
