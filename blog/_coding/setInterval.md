---
title: 用 setTimeout 模拟 setInterval
summary: 用 setTimeout 模拟 setInterval
date: 2020-04-03
---

---------------------------

## 结果实现

```js
function loop (callback, ms, /* , restArgs */) {
  const slice = Array.prototype.slice
  const args = slice.call(arguments, 1)
  const timeout = function () {
    setTimeout.apply(this, args)
  }
  args.unshift(function () {
    callback.apply(this, slice.call(arguments, 0))
    timeout()
  })
  timeout()
}
```

## 解析

1. 暂时没找到比较好的实现，能找到的都很随意，甚至忽略了 setInterval 第二个参数之后的参数，所以这里就不对比网上实现了

2. timeout 和 callback 的执行上下文被绑定了，这个可能不是想要的
  
3. 暂时没提供取消定时器的功能，这个在一个函数中可能实现不了，因为在回调函数中返回的 timeoutId，外面可能已经拿不到了，所以如果需要实现，可能要借助对象或者在函数上绑定其他方法，这里就不展示了，
