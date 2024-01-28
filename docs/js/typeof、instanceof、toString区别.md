---
title: typeof、instanceof、toString区别
tags: [js]
---

typeof、instanceof、Object.prototype.toString 三个方法都可以被用来判断数据类型，

但是它们有什么区别呢？

<!--truncate-->

## typeof

了解 typeof 原理之前，就得先了解下 js 在底层是怎么存储数据的类型信息的。

js 在底层存储变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息 👉

- 000：对象
- 001：整数
- 010：浮点数
- 100：字符串
- 110：布尔

对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的

`null`: 所有机器码均为 0

`undefined`: 用 −2^30 整数来表示

**所以，typeof 在判断 null 的时候就出现问题了，由于 null 的所有机器码均为 0，因此直接被当做了对象来看待**。

因此最好是用 typeof 来判断基本数据类型（包括 symbol, bigint），避免对 null 和 object 的判断，一个它没法区分是 null 还是 object，另一个它也没法区分到底是哪种 object。

## instanceof

打开 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)，第一句话应该就解释的很明确了

:::tip
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
:::

文字解释是文字解释，为什么说平时还是要多多自己去尝试，因为总会发现一些意料之外的情况，比如

```js
const simpleStr = 'This is a simple string'
const newStr = new String('String created with constructor')

simpleStr instanceof String // false
newStr instanceof String // true
```

其他也没啥好解释了，再附一段 instanceof 实现，权当加深一下理解

```js
function myInstanceof(ins, ctr) {
  let protoIns = Object.getPrototypeOf(ins) // ins.__proto__
  let protoCtr = ctr.prototype

  while (true) {
    // Object.prototype.__proto__ === null
    if (protoIns === null) {
      return false
    }
    if (protoIns === protoCtr) {
      return true
    }
    protoIns = Object.getPrototypeOf(protoIns)
  }
}
```

## Object.prototype.toString

每个对象都有一个 toString() 方法。默认情况下，Object 原型对象上的 toString() 方法被每个自定义 Object 对象继承。**如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型**

对于 `undefined` 和 `null` 来说，情况又有点特殊，因为 null 和 undefined 并不继承于 Object，它们也没有任何方法，但实际也能用 Object.toString.prototype 来判断类型，完全也是另外的一个规定

:::tip
注意：如的 ECMAScript 5 和随后的 Errata 中所定义，从 JavaScript 1.8.5 开始，toString() 调用 null 返回[object Null]，undefined 返回 [object Undefined]。
:::

所以说，虽然现在都能用 `Object.prototype.toString` 来判断数据类型，但严格来说，并不能说所有版本的 js 编译器都能用这段来判断数据类型。

下面是各个类型的执行结果

```js
Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call({}) // "[object Object]"

Object.prototype.toString.call([]) // "[object Array]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

Object.prototype.toString.call(BigInt(1)) // "[object BigInt]"

Object.prototype.toString.call(new Date()) // "[object Date]"
```
