## 宏队列和微队列

`宏队列，macrotask，也叫tasks。` 一些异步任务的回调会依次进入 macro task queue，等待后续被调用，这些异步任务包括：

- script 代码块
- setTimeout
- setInterval
- setImmediate (Node 独有)

`微队列，microtask，也叫jobs。` 另一些异步任务的回调会依次进入 micro task queue，等待后续被调用，这些异步任务包括：

- process.nextTick (Node 独有)
- Promise
- MutationObserver

**多任务队列**

事件循环中可能会有**一个或多个任务队列**，这些队列分别为了处理：

1. 鼠标和键盘事件
2. 其他的一些 Task

浏览器会在保持任务顺序的前提下，可能分配四分之三的优先权给鼠标和键盘事件，保证用户的输入得到最高优先级的响应，而剩下的优先级交给其他 Task，并且保证不会“饿死”它们。

## 浏览器的 EventLoop

![浏览器的EventLoop](/img/浏览器的EventLoop.png)

执行一个 JavaScript 代码的具体流程：

1. 从任务队列中取出一个**宏任务**并执行。
2. 检查微任务队列，执行并清空**微任务**队列，如果在微任务的执行中又加入了新的微任务，也会在这一步一起执行。
3. 进入更新渲染阶段，判断是否需要渲染，这里有一个 rendering opportunity 的概念，也就是说不一定每一轮 event loop 都会对应一次浏览 器渲染，要根据屏幕刷新率、页面性能、页面是否在后台运行来共同决定，通常来说这个渲染间隔是固定的。（所以多个 task 很可能在一次渲染之间执行）

:::tip

- 浏览器会尽可能的保持帧率稳定，例如页面性能无法维持 60fps（每 16.66ms 渲染一次）的话，那么浏览器就会选择 30fps 的更新速率，而不是偶尔丢帧。
- 如果浏览器上下文不可见，那么页面会降低到 4fps 左右甚至更低。
- 如果满足以下条件，也会跳过渲染：

1. 浏览器判断更新渲染不会带来视觉上的改变。
2. map of animation frame callbacks 为空，也就是帧动画回调为空，可以通过 requestAnimationFrame 来请求帧动画。

:::

4. 有时候浏览器希望两次「定时器任务」是合并的，他们之间只会穿插着 microTask 的执行，而不会穿插屏幕渲染相关的流程。
   如果上述的判断**决定本轮不需要渲染**，那么下面的几步也不会继续运行：

:::tip

- 对于需要渲染的文档，如果窗口的大小发生了变化，执行监听的 resize 方法。
- 对于需要渲染的文档，如果页面发生了滚动，执行 scroll 方法。
- 对于需要渲染的文档，执行帧动画回调，也就是 requestAnimationFrame 的回调。
- 对于需要渲染的文档，执行 IntersectionObserver 的回调。
- 对于需要渲染的文档，**重新渲染绘制用户界面**。
- 判断 task 队列和 microTask 队列是否都为空，如果是的话，则进行 Idle 空闲周期的算法，判断是否要执行 requestIdleCallback 的回调函数。

:::

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

## 参考

- [深入解析 EventLoop 和浏览器渲染、帧动画、空闲回调的关系](https://zhuanlan.zhihu.com/p/142742003)
