```js
function fakeInterval(fn, time, ...args) {
  let timer = null
  const interval = () => {
    fn(...args)
    timer = setTimeout(interval, time)
  }
  timer = setTimeout(interval, time)

  return () => {
    clearTimeout(timer)
  }
}
```

测试代码

```js
const cancel = fakeInterval(
  (...args) => {
    console.log('log', ...args)
  },
  1000,
  'a',
  'b',
)
// setTimeout(cancel, 1000)
```
