## beforeCreate & created

实例已经完成创建了, 初始化 props、data、methods、watch、computed 等属性, 没有挂载，$el 无法获取

## beforeMount & Mounted

在把虚拟 dom 转化为真实 dom 之后，执行 mounted 钩子

## beforeUpdate & updated

在 diff, patch 之前，会调用 `beforeUpdate`，但是注意是在 `nextTick` 之后。

完成一系列的 patch, diff ，调用 updated。

## beforeDestory & destoryed

在一些清理逻辑完成以后，如: 父子关系，watcher 等
