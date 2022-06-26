- HOC 和 hook 的区别

:::note

hoc 能复用逻辑和视图，hook 只能复用逻辑。

:::

- useEffect 和 useLayoutEffect 区别

:::note

对于 React 的函数组件来说，其更新过程大致分为以下步骤：

因为某个事件 state 发生变化。
React 内部更新 state 变量。
React 处理更新组件中 return 出来的 DOM 节点（进行一系列 dom diff 、调度等流程）。
将更新过后的 DOM 数据绘制到浏览器中。
用户看到新的页面。

useEffect 在第 4 步之后执行，且是异步的，保证了不会阻塞浏览器进程。
useLayoutEffect 在第 3 步至第 4 步之间执行，且是同步代码，所以会阻塞后面代码的执行。
:::

- useEffect 依赖为空数组与 componentDidMount 区别

:::note

在 render 执行之后，componentDidMount 会执行，如果在这个生命周期中再一次 setState ，会导致再次 render ，返回了新的值，浏览器只会渲染第二次 render 返回的值，这样可以避免闪屏。
但是 useEffect 是在真实的 DOM 渲染之后才会去执行，这会造成两次 render ，有可能会闪屏。

:::
