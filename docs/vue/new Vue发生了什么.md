## \_init

1. 合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等
2. 如果 el 存在，执行 $mount

## $mount

1. 根据 template 创建一个 render 函数
2. 初始化一个 Watcher，用来执行回调函数（updateComponent），以及监听数据变化

## updateComponent

主要就是执行两个函数的过程

1. \_render
2. \_update

## \_render

1. 这个其实和我们手写的 render 差不多，重要的是，第一个参数为 createElement

### 1️⃣ createElement

1. 主要是规范化 children，以及创建一个 VNode，并返回

## \_update

1. 主要是执行 \_\_patch\_\_ 的过程

### 1️⃣ \_\_patch\_\_

1. 这是一个平台相关的方法，不同的平台，对应的原生函数是不同的
2. 核心是 patch

### 2️⃣ patch

1. 实际是一个深度优先的递归（createElm）。通过虚拟节点 VNode 创建真实的 dom 节点，再插入到父节点中，并在子元素 children 上重复这个过程。
2. 注意是深度优先，所以整个 VNode 树节点的插入顺序是先子后父

## 流程图

![new Vue](/img/vue/new-vue.png)
