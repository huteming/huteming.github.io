```js
function assign(target, ...args) {
  args.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key]
    })

    Object.getOwnPropertySymbols(obj)
      .filter((key) => Reflect.apply(Object.prototype.propertyIsEnumerable, obj, [key]))
      .forEach((key) => {
        target[key] = obj[key]
      })
  })
  return target
}
```
