```js
function debounce(fn, time) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
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
const log = debounce(test, 1000)
log(1)
log(2)
log.call(obj, 3)
```
