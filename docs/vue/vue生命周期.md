## beforeCreate -> created

主要是调用 `initState` 完成实例创建, 初始化 props、data、methods、watch、computed 等属性,

此时没有挂载，$el 无法获取。

## beforeMount -> Mounted

在把虚拟 dom 转化为真实 dom 之后，执行 mounted 钩子

## beforeUpdate & updated

**在 `nextTick` 之后**，在 diff, patch 之前，会调用 `beforeUpdate`。

完成一系列的 patch, diff ，调用 `updated`。

## beforeDestory -> destoryed

完成从 `parent` 的 `$children` 中删掉自身，删除 `watcher` 等清理逻辑
