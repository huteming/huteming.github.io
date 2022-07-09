## 原理

React 在「第一次执行」函数组件时，组件内部每调用一个 react-hook，React 就会生成一个新的 hook 对象，所有的 hook 对象是以链表的形式连接起来。

在「重渲染」，每调用一次 react-hook 会先将其从原链表中取出，进行相应「更新」操作后，再将其挂到新的链表上。

将最新的 state 和上一次的 state 进行浅比较，如果相等，那么就退出

## 为什么不能在条件语句中写 hook

因为 hook 对象是以链表的形式按照执行顺序连接起来的，如果出现条件语句，在 react 更新的时候，读取 hook 对象时，就会发生错位，导致异常

## HOC 和 hook 的区别

hoc 能复用逻辑和视图，hook 只能复用逻辑。

## useEffect 和 useLayoutEffect 区别

对于 React 的函数组件来说，其更新过程大致分为以下步骤：

1. 因为某个事件 state 发生变化。
2. React 内部更新 state 变量。
3. React 计算出需要更新的 dom。
4. 将更新过后的 DOM 数据绘制到浏览器中。
5. 用户看到新的页面。

useEffect 在第 4 步之后执行，且是异步的，保证了不会阻塞浏览器进程。

useLayoutEffect 在第 3 步至第 4 步之间执行，且是同步代码，所以会阻塞后面代码的执行。

## useEffect 与 componentDidMount 区别

在 render 执行之后，componentDidMount 会执行，如果在这个生命周期中再一次 setState ，会导致再次 render ，返回了新的值，浏览器只会渲染第二次 render 返回的值，这样可以避免闪屏。

但是 useEffect 是在真实的 DOM 渲染之后才会去执行，这会造成两次 render ，有可能会闪屏。
