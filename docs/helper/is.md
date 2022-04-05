```js
function equal(a, b) {
  // NaN
  if (a !== b) {
    if (isNaN(a) && isNaN(b)) {
      return true
    }
    return false
  }
  // -0 +0
  if (a === 0 && b === 0 && 1 / a !== 1 / b) {
    return false
  }
  return true
}
```

测试代码

```js
console.log(equal(-0, +0))
console.log(equal(NaN, NaN))
console.log(equal(1, 1))
```
