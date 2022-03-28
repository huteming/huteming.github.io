官方完整版[版本说明](https://github.com/facebook/react/releases)

> 这里仅仅只是**重大改动或者新特性**，不是所有的改动

## v17.0

### 1. 全新的 JSX 转换

[官方介绍](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

### 2. 将事件委托从 document 切换为 root

React v17 中，React 不会再将事件处理添加到 document 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中。

在 React 16 及之前版本中，React 会对大多数事件进行 `document.addEventListener()` 操作。React v17 开始会通过调用 `rootNode.addEventListener()` 来代替。

### 3. 异步运行 useEffect 清理函数

当组件被卸载时，副作用清理函数（类似于在 class 组件中同步调用 `componentWillUnmount`）同步运行。我们发现，对于大型应用程序来说，这不是理想选择，因为同步会减缓屏幕的过渡（例如，切换标签）

[官方介绍](https://zh-hans.reactjs.org/blog/2020/08/10/react-v17-rc.html#effect-cleanup-timing)

## v16.8

### 新增 Hooks

[官方介绍](https://zh-hans.reactjs.org/docs/hooks-intro.html)

## v16.6

### 1. React.memo

**React 15**：如果你想阻止组件的重复渲染，在 class component 里可以使用 PureComponent, shouldComponentUpdate 来帮助你。但是如果你是 function component，对不起，没有这个功能， 只能每次都重新渲染。

**React 16**：为了全面拥抱 function component,React 团队写了 memo 来帮助 function component 实现这个阻止重复渲染的功能。

### 2. React.lazy + React.Suspense

lazy + React.Suspense 实现代码分割

### 3. 简化 contextType

简化获取 context 的方式，之前需要用一个在外层包裹一个`<Consumer>`,现在可以直接通过 `this.context` 获取。

### 4. 增加 getDerivedStateFromError

v16.3 这个版本里，React 除了 Error Boundaries 来捕获错误，里面主要是使用了 componentDidCatch 来捕获 错误。但是它是在错误已经发生之后并且 render 函数被调用之后，才会被调用。 也就是说如果一个组件出现的错误，在调用 componentDidCatch 之前只能返回 null 给用户。

而 getDerivedStateFromError 可以在 render 函数之嵌捕获到错误，所以它更适合写用来显示 fallback UI 的逻辑。

## v16.5

### React Profiler

这个版本提供了对新的 Profiler DevTools 插件的支持

## v16.4

### 1. 新增指针事件

新增了对对指针设备（例如鼠标，触控笔，或者手指触摸）触发的 dom 事件

### 2. fix 生命周期函数 getDerivedStateFromProps

修复 `getDerivedStateFromProps` 这个生命周期函数在 `Updating` 阶段的时候，无论使用 `setState` 还是 `forceUpdate`,都不调用`getDerivedStateFromProps` 的问题

[React 生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## v16.3

### 1. 生命周期函数的更新

官方文档[详细介绍](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

新的生命周期

1. getDerivedStateFromProps

2. getSnapshotBeforeUpdate

官方逐步迁移计划

- **16.3**：为不安全的生命周期引入别名，`UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps` 和 `UNSAFE_componentWillUpdate`。（旧的生命周期名称和新的别名都可以在此版本中使用。）
- **未来 16.x 版本**：为 `componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate` 启用废弃告警。（旧的生命周期名称和新的别名都将在这个版本中工作，但是旧的名称在开发模式下会产生一个警告。）
- **17.0**：删除 `componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate`。（在此版本之后，只有新的 “UNSAFE\_” 生命周期名称可以使用。）

### 2. createContext

### 3. createRef

### 4. forwardRef

使用场景： 父组件需要将自己的引用传给子组件

### 5. strict Mode

严格模式用来帮助开发者发现潜在问题的工具。就像 Fragment 一样，它不会 render 任何的 DOM 元素。

## v16.2

### 1. Fragement

React 15：render 函数只能接受一个组件，所以一定要外层包一层 `<div>`。

React16：可以通过 Fragement 直接返回多个组件。

## v16.0

### 1. render 支持返回数组和字符串

### 2. Error Boundary

React 15：渲染过程中有出错，直接 crash 整个页面，并且错误信息不明确，可读性差

React 16：用于捕获子组件树的 JS 异常（即错误边界只可以捕获组件在树中比他低的组件错误。），记录错误并展示一个回退的 UI。

捕获范围：

1. 渲染期间
2. 生命周期内
3. 整个组件树构造函数内

Error Boundary 无法捕获下面的错误：

1. 事件函数里的错误

2. 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）

3. 服务端渲染

4. Error Boundary 自身抛出来的错误 （而不是其子组件）

### 3. createPortal

### 4. 支持自定义 DOM 属性

React 15：忽略未标准化的 html 和 svg 属性

React 16：去掉了这个限制

为什么要做这个改动呢？两个原因：

1. 不能用自定义属性，对于非标准（proposal 阶段）新属性还有其他框架（Angular）很不友好
2. React 15 之所以可以过滤掉非标准的属性，是因为他们维护了一个白名单的文件（放在 bundle size 里）。而随着时间的增加，标准化的属性越来越多，意味着要一直维护这个文件，同时这个文件也会越来越大，增加 bundle 的体积。

所以还不如去掉这个限制。

### 5. Fiber

React Fiber 架构，它的主要目标是：

- 能够把可中断的任务切片处理。
- 能够调整优先级，重置并复用任务。
- 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
- 能够在 render() 中返回多个元素。
- 更好地支持错误边界。
