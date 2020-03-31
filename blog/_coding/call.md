---
title: 手写call/apply
summary: 手写实现call/apply方法
date: 2020-03-31
---

----------------------

先放网上的一种实现，[在这里](https://juejin.im/post/5bf6c79bf265da6142738b29)

### call 函数解析

1. call 函数第一个参数是真实函数执行时的上下文，后续参数会以展开的形式（apply是以一个数组的形式）传入真实函数

### 初步实现

```js
if (!Function.prototype.call) {
  // 这里千万别用 call，因为你正在重写 call，会造成无限循环，堆栈溢出
  // 也可以利用 for 循环创建一个 args
  // var argsArray = [];
  // for(var i = 0; i < arguments.length - 1; i++){
  //   argsArray.push(arguments[i + 1]);
  // }
  const rest = Array.prototype.slice.apply(arguments, [1])
  Function.prototype.call = function (ctx) {
    const obj = Object.create(ctx, {
      mock: {
        value: this,
      },
    })
    return obj.mock(...rest)
  }
}
```

### 网上实现

```js
// 浏览器环境 非严格模式
function getGlobalObject(){
  return this;
}
Function.prototype.applyFn = function apply(thisArg, argsArray){ // `apply` 方法的 `length` 属性是 `2`。
  // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
  if(typeof this !== 'function'){
    throw new TypeError(this + ' is not a function');
  }

  // 2.如果 argArray 是 null 或 undefined, 则
  // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
  if(typeof argsArray === 'undefined' || argsArray === null){
    argsArray = [];
  }
  
  // 3.如果 Type(argArray) 不是 Object, 则抛出一个 TypeError 异常 .
  if(argsArray !== new Object(argsArray)){
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }

  if(typeof thisArg === 'undefined' || thisArg === null){
    // 在外面传入的 thisArg 值会修改并成为 this 值。
    // ES3: thisArg 是 undefined 或 null 时它会被替换成全局对象 浏览器里是window
    thisArg = getGlobalObject();
  }

  // ES3: 所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
  thisArg = new Object(thisArg);
  var __fn = '__fn';
  thisArg[__fn] = this;
  // 9.提供 thisArg 作为 this 值并以 argList 作为参数列表，调用 func 的 [[Call]] 内部方法，返回结果
  var result = thisArg[__fn](...argsArray);
  delete thisArg[__fn];
  return result;
};
```

### 实现对比

1. 没有考虑非严格模式下，第一个参数指定的上下文是有可能被改变的。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 解释如图

![call](/call/call.png)

2. 虽然代码看起来简洁，但是不得不说，在使用 Object.create() 的时候意味着整个思路已经错了，因为这个时候只是能通过原型链获取到第一个参数指定上下文的属性，但真实的上下文并不是它，用代码解释如下

```js
const obj = {
  name: 'bb',
}
function aa (...rest) {
  // 添加到上下文
  this.other = 'other'
  console.log(...rest)
}
aa.call(obj, 1, 2)
// 原生的 call 执行之后，这个时候 obj 对象上应该有 other 属性
// 但因为实现是通过 Object.create() 创建了一个对象，所以这个 other 被添加到了新的对象上，而不是期望的 obj
console.log(obj)
```

3. 虽然网上的代码看起来很严谨，但我个人觉得有点过了，甚至改变了原生 call 的一些实现。比如注释3的抛异常，MDN上的解释应该是使用包装对象

### 修改后的实现

```js
if (!Function.prototype.call) {
  function getGlobalThis () {
    return this
  }
  function getCallFn (length) {
    let code = ''
    // output: args[0],args[1],....
    for (let i = 0; i < length; i++) {
      code += 'args[' + i + '],'
    }
    return new Function(
      'ctx',
      'fnName',
      'args',
      'return ctx[fnName](' + code + ')'
    )
  }
  Function.prototype.call = function (ctx) {
    const rest = Array.prototype.slice.apply(arguments, [1])
    if (ctx === undefined || ctx === null) {
      ctx = getGlobalThis()
    }
    ctx = new Object(ctx)
    // 理论上Symbol更好，但是如果是作为 Polyfill 的话，Symbol 这个新的类型不一定允许使用
    // const unique = Symbol()
    const unique = Date.now()
    ctx[unique] = this
    // 如果不能使用数组解构，那可以用 new Function() 创建函数
    // const result = getCallFn(rest.length)(ctx, unique, rest)
    const result = ctx[unique](...rest)
    delete ctx[unique]
    return result
  }
}
```

### 测试用例

从 MDN 上复制了一些测试代码，方便测试

```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```

```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

```js
// 'use strict';
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen(undefined)
```

### 其他说明

1. 理论上用 eval 也能模拟 es6 的解构操作符，但一般情况下是不建议使用 eval 的，所以这里也不在展示如何实现
