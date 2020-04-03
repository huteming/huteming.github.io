---
title: 实现Object.create
summary: 手写实现Object.create方法
date: 2020-04-03
---

--------------------------

[MDN地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## 结果实现

```js
function extend (proto, extra = {}) {
  if (Object.prototype.toString.call(proto) !== '[object Object]') {
    throw new Error('原型对象必须是对象')
  }
  if (Object.prototype.toString.call(extra) !== '[object Object]') {
    throw new Error('描述对象必须是对象')
  }
  const Result = function () {}
  Result.prototype = proto
  Object.defineProperties(Result.prototype, extra)
  return new Result()
}
```

## MDN实现

```js
if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```

## 实现对比

1. 为什么MDN中允许proto为函数？

2. 偷懒在实现中给第二个参数一个默认值，这样不用判断值是undefined类型的情况了
