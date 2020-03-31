---
title: 手写instanceof
summary: 手写方法模拟instanceof
date: 2020-03-31
---

-----------------------

网上一个实现，[点这里](https://juejin.im/post/5dc367025188255f8e44b7b1)

### instanceof 解析

1. 判断右测构造函数的 prototype 是否出现在左侧实例的原型链上

### 初步实现

```js
function of (child, parent) {
  if (typeof parent !== 'function') {
    throw new Error('父类必须是构造函数')
  }
  if (child === undefined || child === null) {
    return false
  }
  const proto = Object.getPrototypeOf(child)
  if (proto === parent.prototype) {
    return true
  }
  // 如果是 Object，已经到达顶端，提前返回
  if (proto === Object.prototype) {
    return false
  }
  return of(proto, parent)
}
```

### 网上实现

```js
function myInstanceof(target, origin) {
  // 非object直接返回false
  if(typeof target !== 'object' || target === null) return false;

  var proto = Object.getPrototypeOf(target);
  while (proto) {
    if (proto === origin.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false
}
```

### 实现对比

1. 实现中基础类型返回错误，getPrototypeOf 会自动返回包装对象，然后在后续判断中和 instanceof 产生差异

### 注意点

1. Object.getPrototypeOf(Object.prototype) 返回的是 null

2. Object.getPrototypeOf(Object) 返回的是一个匿名函数, Object.getPrototypeOf(该匿名函数) 返回 Object.prototype

```js
Object instanceof Object // true
```
