---
title: 手写柯里化函数
summary: 实现函数式编程中常用的柯里化函数curry
date: 2020-04-16
---

[参考文章](https://github.com/mqyqingfeng/Blog/issues/42)。以下一些测试代码，来自这篇文章

## 效果

```js
// 示意而已
function ajax(type, url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");
```

## 实现

```js
const HOLDER = '_'

/**
 * 找出所有占位符下标
 * @param {*Array} args 对象数组
 * @param {*Number} add 下标前缀个数，与其他下标数组合并时有用
 */
function findHolders (args, add = 0) {
  const holders = []
  args.forEach((item, index) => {
    if (item === HOLDER) {
      holders.push(index + add)
    }
  })
  return holders
}

function replaceHolders (target, holders, args) {
  const success = []
  const _target = target.concat()
  const length = Math.min(holders.length, args.length)

  for (let i = 0; i < length; i++) {
    const value = args[i]
    const index = holders[i]
    _target[index] = value

    if (value !== HOLDER) {
      success.push(i)
    }
  }

  // 不管替换成功与否，都需要删掉 args 内该项
  // 但只有替换成功，才删掉 holders 项
  const _args = args.filter((item, index) => index > length - 1)
  const _holders = holders.filter((item, index) => !success.includes(index))

  return [_target, _holders, _args]
}

function curry (fn, length) {
  const arity = length || fn.length

  return function handler (...rest) {
    const holders = findHolders(rest, 0)

    if ((!holders.length && rest.length >= arity) || (holders.length && holders[0] + 1 > arity)) {
      return fn.apply(this, rest)
    }
    return recurry(fn, arity, holders, rest)
  }
}

function recurry (fn, arity, holders, preset) {
  return function handler (...rest) {
    // 替换预设参数里的占位符
    [preset, holders, rest] = replaceHolders(preset, holders, rest)

    // 重新计算占位符下标
    holders = holders.concat(findHolders(rest, preset.length))

    // 累计参数
    const args = preset.concat(rest)

    if ((!holders.length && args.length >= arity) || (holders.length && holders[0] + 1 > arity)) {
      return fn.apply(this, args)
    }
    return recurry(fn, arity, holders, args)
  }
}
```

## 实现对比

1. 对于传入参数的遍历一次就够了，只是这里为了代码分块，使流程看起来更清晰，就多遍历了几次，但确实没必要。

2. 对比参考文章中执行时参数必须是fn的形参个数，可能用length允许使用者自定义参数个数会更灵活一些

3. 在真实环境中，最好还是把 `HOLDER` 这个常量挂在 `curry` 函数上，这样使用更方便清晰。这里的实现只是为了更清晰

## 实例

```js
const test1 = curry(function() {
  console.log(...arguments)
}, 3)

test1("a", "b", "c") // ["a", "b", "c"]
test1("a", "b")("c") // ["a", "b", "c"]
test1("a")("b")("c") // ["a", "b", "c"]
test1("a")("b", "c") // ["a", "b", "c"]

const test2 = curry(function(a, b, c, d, e) {
  console.log([a, b, c, d, e])
})

test2(1, 2, 3, 4, 5);
test2(HOLDER, 2, 3, 4, 5)(1);
test2(1, HOLDER, 3, 4, 5)(2);
test2(1, HOLDER, 3)(HOLDER, 4)(2)(5);
test2(1, HOLDER, HOLDER, 4)(HOLDER, 3)(2)(5);
test2(HOLDER, 2)(HOLDER, HOLDER, 4)(1)(3)(5)
```
