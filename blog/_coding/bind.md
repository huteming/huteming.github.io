---
title: 实现原生bind函数
summary: 利用js其他原生方法实现bind函数
date: 2020-03-30
---

----------------------------

[MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### bind 函数解析

1. bind 函数存在于 Function 对象的原型对象上

2. bind 函数执行后返回一个新的函数

3. bind 函数有多个参数，第一个是真实函数执行时 this 的指向对象，之后的参数是真实函数的预设参数，如果真实函数执行时还有参数，则会在这几个预设参数之后

### bind 函数初步实现

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (ctx, ...args) {
    const self = this
    return function (...rest) {
      return self.call(ctx, ...args, ...rest)
    }
  }
}
```

### MDN 上的实现

```js
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
```

### 实现对比

1. 偷懒用了 es6 的数组解构，在写兼容函数时这个习惯可能不太好，毕竟连 bind 都没有的地方，es6 数组解构语法存在的可能性更小，还是应该用更具有兼容性的方法去写  Ployfill！

2. 另一个习惯不好的地方是，错误处理不够严谨。写通用函数时，应该经可能告诉调用者发生了什么！

### 疑问

1. 为什么要用立即执行函数写，好处是什么？
