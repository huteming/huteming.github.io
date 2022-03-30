```js
function fakeTimeout(fn, time, ...args) {
  let timer = null
  const cancel = () => {
    clearInterval(timer)
  }
  timer = setInterval(() => {
    fn(...args)
    cancel()
  }, time)
  return cancel
}
```

测试代码

```js
fakeTimeout(
  (...args) => {
    console.log('end', ...args)
  },
  1000,
  'a',
  'b',
)
```
