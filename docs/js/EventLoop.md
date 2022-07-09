## 宏队列和微队列

`宏队列，macrotask，也叫tasks。` 一些异步任务的回调会依次进入 macro task queue，等待后续被调用，这些异步任务包括：

- setTimeout
- setInterval
- setImmediate (Node 独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

`微队列，microtask，也叫jobs。` 另一些异步任务的回调会依次进入 micro task queue，等待后续被调用，这些异步任务包括：

- process.nextTick (Node 独有)
- Promise
- Object.observe
- MutationObserver

## 浏览器的 EventLoop

![浏览器的EventLoop](/img/浏览器的EventLoop.png)

执行一个 JavaScript 代码的具体流程：

1. 执行全局 Script 同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如 setTimeout 等）；
2. 全局 Script 代码执行完毕后，调用栈 Stack 会清空；
3. 从微队列 microtask queue 中取出位于队首的回调任务，放入调用栈 Stack 中执行，执行完后 microtask queue 长度减 1；
4. 继续取出位于队首的任务，放入调用栈 Stack 中执行，以此类推，直到直到把 microtask queue 中的所有任务都执行完毕。注意，如果在执行 microtask 的过程中，又产生了 microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
5. microtask queue 中的所有任务都执行完毕，此时 microtask queue 为空队列，调用栈 Stack 也为空；
6. 取出宏队列 macrotask queue 中位于队首的任务，放入 Stack 中执行；
7. 执行完毕后，调用栈 Stack 为空；
8. 重复第 3-7 个步骤；

这里归纳几个重点：

1. 宏队列 `macrotask 一次只从队列中取一个任务执行`，执行完后就去执行微任务队列中的任务；
2. `微任务队列中所有的任务都会被依次取出来执行`，直到 microtask queue 为空；
3. 图中没有画 UI rendering 的节点，因为这个是由浏览器自行判断决定的，但是只要执行 UI rendering，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。

## NodeJs 的 EventLoop

![NodeJs的EventLoop](/img/NodeJs的EventLoop.png)

NodeJS 的 Event Loop 中，执行宏队列的回调任务有 6 个阶段，各个阶段执行的任务如下：

- timers 阶段：这个阶段执行 setTimeout 和 setInterval 预定的 callback
- I/O callback 阶段：执行除了 close 事件的 callbacks、被 timers 设定的 callbacks、setImmediate()设定的 callbacks 这些之外的 callbacks
- idle, prepare 阶段：仅 node 内部使用
- poll 阶段：获取新的 I/O 事件，适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate()设定的 callbacks
- close callbacks 阶段：执行 socket.on('close', ....)这些 callbacks

**NodeJS 中宏队列主要有 4 个：**

1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue

这 4 个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的 macrotask 都会被加到这一个宏队列中，但是在 NodeJS 中，不同的 macrotask 会被放置在不同的宏队列中。

**NodeJS 中微队列主要有 2 个：**

1. Next Tick Queue：是放置 process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他 microtask，比如 Promise 等

在浏览器中，也可以认为只有一个微队列，所有的 microtask 都会被加到这一个微队列中，但是在 NodeJS 中，不同的 microtask 会被放置在不同的微队列中。

**NodeJS 的 Event Loop 过程：**

1. 执行全局 Script 的同步代码
2. 执行 microtask 微任务，先执行所有 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务
3. 开始执行 macrotask 宏任务，共 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务。这里是每个阶段宏任务队列的一个任务，在浏览器的`EventLoop`一样，每一个 macrotask 任务执行完毕后，开始执行微任务
4. Timers Queue -> microtask -> I/O Queue -> microtask -> Check Queue -> microtask -> Close Callback Queue -> microtask -> Timers Queue ......

![NodeJs任务执行顺序](/img/NodeJs任务执行顺序.png)
