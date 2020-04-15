---
title: 手写对象的拷贝
summary: 手写对象的深拷贝
date: 2020-04-15
---

-------------------------------

## 实现

```js
function clone (value) {
  if (isSymbol(value)) {
    return cloneSymbol(value)
  }
  // error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象
  if (isError(value) || isFunction(value) || isDom(value) || isWeakMap(value)) {
    return {}
  }
  // booleans, numbers, strings
  if (!isObject(value)) {
    return value
  }
  // arrays
  if (isArray(value)) {
    return cloneArray(value)
  }
  // date objects
  if (isDate(value)) {
    return cloneDate(value)
  }
  // regexes
  if (isRegx(value)) {
    return cloneRegx(value)
  }
  // Set
  if (isSet(value)) {
    return clonsSet(value)
  }
  // Map
  if (isMap(value)) {
    return cloneMap(value)
  }
  // Buffer
  if (isBuffer(value)) {
    return cloneBuffer(value)
  }
  // Object 对象、arguments
  return cloneObject(value)
}

function cloneObject (value) {
  const result = {}
  Object.keys(value).forEach(key => {
    result[key] = clone(value[key])
  })
  return result
}

function isWeakMap (value) {
  return value instanceof WeakMap
}

function isDom (value) {
  return value instanceof HTMLElement
}

function isFunction (value) {
  return typeof value === 'function'
}

function isError (value) {
  return value instanceof Error
}

function cloneBuffer (value) {
  const result = new value.constructor(value.byteLength)
  new Uint8Array(result).set(new Uint8Array(value))
  return result
}

function isBuffer (value) {
  return value instanceof ArrayBuffer
}

function cloneMap (value) {
  const map = new Map()
  void [...value].forEach(([key, value]) => {
    map.set(key, value)
  })
  return map
}

function isMap (value) {
  return value instanceof Map
}

function clonsSet (value) {
  return new Set([...value])
}

function isSet (value) {
  return value instanceof Set
}

function cloneRegx (value) {
  const result = new value.constructor(value.source, value.flags)
  result.lastIndex = value.lastIndex
  return result
}

function isRegx (value) {
  return value instanceof RegExp
}

function cloneDate (value) {
  return new Date(value.valueOf())
}

function isDate (value) {
  return value instanceof Date
}

function cloneArray (value) {
  return value.map(item => clone(item))
}

function isArray (value) {
  return Array.isArray(value)
}

function isObject (value) {
  const typed = typeof value
  return value !== null && typed === 'object'
}

function cloneSymbol (value) {
  return Object(Symbol.prototype.valueOf.call(value))
}

function isSymbol (value) {
  return Object.prototype.toString.call(value) === '[object Symbol]'
}
```

## lodash实现

不贴代码了，地址在这，[链接](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)

## 实现对比

1. 个人实现这里是相对简单的版本，比如只实现了深拷贝（相比浅拷贝就是多了递归拷贝）。

2. 个人实现这里把各种类型判断和拷贝方法分开写，理由是这个代码是用来学习的，这么写个人觉得可读性更好，也更容易调试，当然一个显而易见的问题就是多了很多多余的判断。lodash 是利用 Object.prototype.toString 返回字符串 + 策略模式 简化了一些操作，效率显然更好

3. 有些个人不常用的数据类型还是不熟悉，比如 WeakMap

4. Symbol的拷贝是参考的lodash，但通过 Object() 返回的好像多了一层Symbol包裹，暂时不太理解！


<!-- 
部分测试代码
const value = { a: 'a' }
const value = 1
const value = Symbol('hello')
const value = [1, 2, 3]
const value = function () {}
const value = new Error('aa')
const value = new Map([['a', 'a']])
const value = new Set([1, 2, 3])
const value = new Image()
const value = new ArrayBuffer(1)
const value = {
  a: {
    b: [
      1,
      2,
      {
        c: Symbol('c'),
      },
      new Image(),
      new Set(['d', 'e'])
    ]
  },
}
const copy = clone(value)
console.log(value)
console.log(copy)
console.log(value === copy)
-->
