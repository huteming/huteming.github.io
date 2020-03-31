---
title: 手写new的实现
summary: 本文带你了解new操作符创建对象的过程，以及手写实现一个函数模拟new操作符
date: 2020-03-31
---

-------------------------------

先放上一个网上找的一个实现，有兴趣的可以[看这里](https://juejin.im/post/5bde7c926fb9a049f66b8b52)

### new 过程解析

1. 创建一个新对象

2. 新对象的 `__proto__` 指向构造函数的原型对象 prototype

3. 执行构造函数，给新对象赋值

4. 如果构造函数返回的是引用类型对象，则返回这个对象，否则返回新创建的对象

### 初步实现

```js
function mockNew () {
  const construct = arguments[0]
  const rest = Array.prototype.slice.call(arguments, 1)
  if (typeof construct !== 'function') {
    throw new Error('第一个参数必须是函数')
  }
  const result = Object.create(construct.prototype)
  const res = construct.prototype.constructor.apply(result, rest)
  return Object.prototype.toString.call(res) === '[object Object]' ? res : result
}
```

### 网上实现

```js
function newOperator(ctor){
  if(typeof ctor !== 'function'){
    throw 'newOperator function the first param must be a function';
  }
  newOperator.target = ctor;
  var newObj = Object.create(ctor.prototype);
  var argsArr = [].slice.call(arguments, 1);
  var ctorReturnResult = ctor.apply(newObj, argsArr);
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === 'function';
  if(isObject || isFunction){
      return ctorReturnResult;
  }
  return newObj;
}
```

### 实现对比

1. 没有考虑到 es6 的新属性 target 指向构造函数

2. 多次一举使用 construct.prototype.constructor 来获取构造函数自身了，其实可以直接调用构造函数

3. 对new操作符最后的返回理解错误了，不仅仅是引用对象，如果返回的是函数，也会返回构造函数的返回

### 解析补充

1. 第 4 点解析不足，因为不仅仅是引用类型，当构造函数返回函数时，也会返回这个函数，而不是新创建的对象

### 其他说明

我看到网上有很多地方在实现过程中手动操作 `__proto__` 这个属性，但事实上在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 上 `__proto__` 属性介绍的开头就有这么三段警告

![`__proto__`](/new/proto.png)

所以我觉得不管是这里的模拟实现，还是日常工作中，都应该尽量用 Object.create() / Object.getPrototypeOf() 来代替对 `__proto__` 属性的操作！！
