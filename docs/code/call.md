```js
function fakeCall(fn, context, ...args) {
  if (context === undefined || context === null) {
    context = globalThis
  }
  context = Object(context)
  const key = Symbol()
  context[key] = fn
  const res = context[key](...args)
  delete context[key]
  return res
}
```

测试代码

```js
const obj = {
  objName: '我是obj传进来的name',
}
// 普通函数
function normalFun(name) {
  console.log(name)
  console.log(this.objName)
  return this
}

console.log(fakeCall(normalFun, obj, '我是参数传进来的name'))
console.log(fakeCall(normalFun, 1, '我是参数传进来的name'))
```
