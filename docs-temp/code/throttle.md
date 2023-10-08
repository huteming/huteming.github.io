```js
function throttle(fn, time) {
  let lastRunTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastRunTime >= time) {
      fn.apply(this, args)
      lastRunTime = now
    }
  }
}
```

测试代码

```js
const obj = {
  aa: 'aa',
}
function test(...args) {
  console.log(...args)
  console.log(this.aa)
}
const log = throttle(test, 1000)
log.call(obj, 1)
log(2)
log.call(obj, 3)
```
