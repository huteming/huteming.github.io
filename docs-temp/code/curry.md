```js
function curry(fn, ...presets) {
  const length = fn.length || 0
  return function (...args) {
    const params = [...presets, ...args]
    if (params.length >= length) {
      return fn(...params)
    }
    return curry(fn, ...params)
  }
}
```

测试代码

```js
const add = (a, b, c) => a + b + c
const a = curry(add)
console.log(a(1)(2)(3))
console.log(a(1, 2)(3))
console.log(a(1, 2, 3))
```
