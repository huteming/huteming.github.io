---
title: 手写Array.prototype.map方法
summary: 手写实现Array.prototype.map方法
date: 2020-04-01
---

-------------------------------

[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## map方法介绍

1. 存在于数组原型链上Array.prototype.map

2. 第一个参数是一个回调函数，该函数三个参数: 循环项, 当前下标, 数组本身

3. 第二个参数是回调函数执行时绑定上下文

## 初次实现

```js
if (!Array.prototype.map) {
  (() => {
    Array.prototype.map = function (callback, ctx) {
      // 操作对象必须是数组
      // Object.prototype.toString.call(this) === '[object Array]'
      if (!Array.isArray(this)) {
        throw new Error('操作数据必须是数组')
      }
      // callback 必须是函数
      if (typeof callback !== 'function') {
        throw new Error('第一个参数必须是函数')
      }
      // 循环次数在执行map函数时已经确定，注：是循环次数，不是循环数据
      const length = this.length
      // 如果不传ctx，则callback的this为undefined
      let self
      if (ctx) {
        self = ctx
      }
      const result = []
      result.length = length

      // 如果是未赋值的数据，不会经过callback，会直接返回
      if (this[i] !== undefined) {
        result[i] = callback.call(self, this[i], i, this)
      }
      return result
    }
  })()
}
```

## MDN实现

```js
if (!Array.prototype.map) {
  Array.prototype.map = function(callback/*, thisArg*/) {
    var T, A, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = arguments[1];
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}
```

## 实现对比

1. `var O = Object(this)`这句是为了什么？返回的还是数组本身

2. `if (k in O)` 在这里又过滤了哪些项？

3. MDN实现中还是处理了 undefined 项，并没有像MDN上文介绍的那样过滤掉


