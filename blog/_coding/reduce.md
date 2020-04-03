---
title: 手写reduce
summary: 手写实现Array.prototype.reduce
date: 2020-04-03
---

-----------------------------

MDN地址在这，[链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

## reduce分析

1. reduce有两个参数

2. 第一个参数是一个处理回调函数，4个参数依次是 result, current, currentIndex, array。不会处理未赋值项

3. 第二个参数是初始值，可选。如果不传，默认为数组第一项

## 结果实现

```js
if (!Array.prototype.reduce) {
  (() => {
    Array.prototype.reduce = function (callback) {
      // Array 必须是数组
      // Object.prototype.toString.call(this) === '[object Array]'
      if (!Array.isArray(this)) {
        throw new Error('数据类型错误')
      }
      // callback 必须是函数
      if (typeof callback !== 'function') {
        throw new Error('callback 必须是函数')
      }
      let result
      let index = 0
      const length = this.length
      if (arguments.length >= 2) {
        result = arguments[1]
      } else {
        // 移动 index 到存在数据的项
        if (index < length && !(index in this)) {
          index++
        }
        // 当没有值时，抛出异常
        if (index >= length) {
          throw new Error('至少需要一个值')
        }
        // initialValue 不提供时，默认是 Array 第一项
        // index 需要再次移动到下一项，之后直接开始循环判断处理
        result = this[index++]
      }

      // 当只有一个值时，不执行callback，直接返回结果
      while (index < length) {
        // callback 不操作未赋值项
        if (index in this) {
          result = callback(result, this[index], index, this)
        }
        index++
      }

      return result
    }
  })()
}
```

## MDN实现

```js
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }
      var o = Object(this);
      var len = o.length >>> 0; 
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }
      while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o);
        }
        k++;
      }
      return value;
    }
  });
}
```

## 实现对比

1. 结果基本一致是因为当初第一次实现时，在判断初始值个数上卡壳了，虽然能实现，但是相当复杂，所以直接参考理解的 MDN 实现然后自己写。值得庆幸是，实现结果差不多，应该算是真的理解了

2. 这次开窍了，理解了 `k in o`这段操作，目的是为了判断是否赋值

::: tip
需要注意的是，如果赋值 `undefined`，in 操作符的结果也是 `true`，认为是经过赋值的。这也是我在 map 实现中不理解的。

```js
const arr = [undefined, null, 1]
console.log(0 in arr) // true
console.log(1 in arr) // true
console.log(2 in arr) // true
console.log(3 in arr) // false
```
:::
