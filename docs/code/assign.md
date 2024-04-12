```js
function assign(target, ...args) {
  args.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key]
    })

    Object.getOwnPropertySymbols(obj)
      .filter((key) =>
        Reflect.apply(Object.prototype.propertyIsEnumerable, obj, [key]),
      )
      .forEach((key) => {
        target[key] = obj[key]
      })
  })
  return target
}
```

测试代码

```js
const a = Symbol('a')
const obj = {
  [a]: 'a',
  a: 'aa',
}

console.log(Object.assign({}, obj))
console.log(assign({}, obj))
console.log(assign(obj, {}) === obj)
```
