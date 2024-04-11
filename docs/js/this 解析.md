要判断一个运行中函数的 this 绑定，就需要找到这个函数的**直接调用位置**。找到之后可以顺序应用下面几个规则来判断 this 的绑定对象。

1. 由 new 调用？绑定到新创建的对象。
2. 由 call、apply、bind 调用？绑定到指定的对象。（如果指定的对象是 null，则使用默认绑定。）
3. 由上下文对象调用？绑定到这个上下文对象。
4. 默认绑定。当函数体（**不是调用位置**）处于严格模式时，绑定到 undefined，否则绑定到全局对象。

## 特殊场景

### 被忽略的 this

如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply、bind，这些值在带调用是会被忽略，**实际应用的是默认绑定规则**，[详见 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

```js
function log() {
  return this.data
}

globalThis.data = 'hello'

console.log(log.call(null)) // hello
```

### 间接引用

当创建一个函数的“间接引用”时，调用这个函数会应用默认绑定规则。

<!-- prettier-ignore-start -->
```js
function log() {
  return this.data
}

const obj = {
  data: 'obj',
  log,
}
const empty = {}

globalThis.data = 'hello'

console.log((empty.log = obj.log)()) // hello
// 注意区分直接引用
console.log((obj.log)()) // obj
```
<!-- prettier-ignore-end -->
