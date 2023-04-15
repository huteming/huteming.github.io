**vue diff 的过程是发生在 \_update -> patch 函数中**

patch 函数签名

```ts
function patch(oldVnode, vnode, hydrating, removeOnly): void
```

sameVnode 函数代码。用于判断是否相同的节点

<!-- prettier-ignore-start -->
```ts
function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```
<!-- prettier-ignore-end -->

## 1. 当新旧节点不同时

这个过程相对简单些，主要就是 **创建新节点 -> 删除旧节点**

## 2. 当新旧节点相同时（patchVnode）

1. 执行 vnode 的钩子函数

在其中一个 `prepatch` 中，会全量的更新 vnode 实例属性，如 `slot`，`listeners`，`props`等等

2. 更新 children

1. 如果旧节点为空，那么就是新增新的节点
1. 如果新节点为空，那么就是删除旧的节点
1. 都存在，会执行 `updateChildren` 进行深度优先的递归更新

## 3. updateChildren

先进行以下 4 种情况的优化策略：

1. 老数组的开始与新数组的开始：oldStartVnode, newStartVnode
2. 老数组的结尾与新数组的结尾：oldEndVnode, newEndVnode
3. 老数组的开始与新数组的结尾：oldStartVnode, newEndVnode
4. 老数组的结尾与新数组的开始：oldEndVnode, newStartVnode

如果以上 4 种情况都没找到，则从新数组的第一个节点去老数组中去遍历查找，找到了就进行递归更新，没找到则创建新节点。

新老数组中找到复用节点后，会重新调用上文提到的 `patchVnode` 进行递归的更新

:::tip 优化
会去老数组中遍历查找，这也是为什么**推荐在渲染列表时为节点设置 key**的原因，因为 vue 有个优化：

在老数组查找之前，会根据 key 把老数组转为 map 对象，提高查找效率。
:::

**循环比对结束的后续处理工作**

- 如果老数组的游标先相交了，则判断新数组中是否还有剩下的节点，没有进行比对的，创建它们。
- 如果新数组的游标先相交了，则判断老数组中是否还有剩下的节点，没有进行比对的，把它们都删除掉。

## 参考

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/component-update.html)
- [Vue2 的 diff 算法详解](https://juejin.cn/post/7113586699808014373)
