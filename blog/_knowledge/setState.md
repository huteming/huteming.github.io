---
title: setState是同步还是异步
summary: 了解 react 的 api 之 setState
date: 2021-03-26
---

---

## 引子

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
}
```

1. 问: 上述代码中 4 次 console.log 打印出来的 val 分别是多少？

- 4 次 log 的值分别是：0、0、2、3

同样的 setState 调用，为何表现和结果却不太一样？

**以下的 react 版本为：15.6.0**

## setState 干了什么

![setState 基本流程](/react/setState基本流程.png)

### 源码

#### setState

> `src/isomorphic/modern/class/ReactBaseClasses.js`

```js
ReactComponent.prototype.setState = function(partialState, callback) {
  // ...
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, "setState");
  }
};
```

#### enqueueSetState

> `src/renderers/shared/stack/reconciler/ReactUpdateQueue.js`

```js
function enqueueSetState(publicInstance, partialState) {
  // ...
  var queue =
    internalInstance._pendingStateQueue ||
    (internalInstance._pendingStateQueue = []);
  queue.push(partialState);

  enqueueUpdate(internalInstance);
}
```

#### enqueueUpdate

> `src/renderers/shared/stack/reconciler/ReactUpdates.js`

```js
function enqueueUpdate(component) {
  // ...
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```

#### batchedUpdates

> `src/renderers/shared/stack/reconciler/ReactDefaultBatchingStrategy.js`

```js
function batchedUpdates(callback, a, b, c, d, e) {
  var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

  ReactDefaultBatchingStrategy.isBatchingUpdates = true;

  // The code is written this way to avoid extra allocations
  if (alreadyBatchingUpdates) {
    return callback(a, b, c, d, e);
  } else {
    return transaction.perform(callback, null, a, b, c, d, e);
  }
}
```

#### Transaction

> `src/renderers/shared/utils/Transaction`

```js
*                       wrappers (injected at creation time)
*                                      +        +
*                                      |        |
*                    +-----------------|--------|--------------+
*                    |                 v        |              |
*                    |      +---------------+   |              |
*                    |   +--|    wrapper1   |---|----+         |
*                    |   |  +---------------+   v    |         |
*                    |   |          +-------------+  |         |
*                    |   |     +----|   wrapper2  |--------+   |
*                    |   |     |    +-------------+  |     |   |
*                    |   |     |                     |     |   |
*                    |   v     v                     v     v   | wrapper
*                    | +---+ +---+   +---------+   +---+ +---+ | invariants
* perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
* +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | |   | |   |   |         |   |   | |   | |
*                    | +---+ +---+   +---------+   +---+ +---+ |
*                    |  initialize                    close    |
*                    +-----------------------------------------+
```

一个所谓的 Transaction 就是将需要执行的 method 使用 wrapper 封装起来，再通过 Transaction 提供的 perform 方法执行。而在 perform 之前，先执行所有 wrapper 中的 initialize 方法；perform 完成之后（即 method 执行后）再执行所有的 close 方法。一组 initialize 及 close 方法称为一个 wrapper，从上面的示例图中可以看出 Transaction 支持多个 wrapper 叠加。

## 流程

1. React 中的批量更新是通过「Transaction」实现的

2. 在执行一个事务之前，`batchingStrategy.isBatchingUpdates` 被置为 true

3. 在事务执行过程中调用 setState 方法时，状态并不会立即应用，而是被推入到 update queue 中。等事务进入 close 阶段，update queue 会被 flush，并把 `batchingStrategy.isBatchingUpdates` 置为 false

## 解释

1. React 组件渲染 和 React 的事件都是在一个事务中执行的，

2. 所以 componentDidMount 中前两次的 setState 会被推入 dirtyComponents，等到事务执行完之后在执行，也就是前两次打印都是 0 的原因，因为 setState 都还没被执行

3. setTimeout 中为什么又是执行了？

我的理解是，此时并不在事务中，加上 setState 本身是同步的，所以相当于 setTimeout 里面的每次 setState 都会触发一个完整的事务。

通俗点说，setState 本身从来都是同步的。只有在事务执行的过程中，触发了包含 setState 的函数时（比如 componentDidMount），此时 setState 被缓存，然后**看起来像是异步的**。而 setTimeout 不会触发事务，所以此时的 setState 都会马上修改 this.state.val。

4. 现在你知道为什么打印顺序是 0 0 2 3 的原因了吗？

## 遗留问题

1. 除了渲染和事件，还有什么会被放在事务中执行呢？
