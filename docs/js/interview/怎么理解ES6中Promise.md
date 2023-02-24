Promise，是异步编程的一种解决方案，比传统的解决方案（回调函数）来说

回调函数有一个重大的问题，就是很可能产生回调地狱

而 Promise 是通过链式调用的方式，即解决了异步的问题，也明显增强了代码的可读性

**状态**

promise 对象仅有三种状态

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

**特点**

- 是属于微任务
- 一旦状态改变（从 pending 变为 fulfilled 和从 pending 变为 rejected），就不会再变，任何时候都可以得到这个结果
