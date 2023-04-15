1. new Vue() 就是调用 \_init()
2. \_init()，就是初始化配置，
3. 然后调用平台相关的 vm.$mount()，如果是带有 template 字符串的，将 template 转换成 render 方法保存在 options.render 上。需要了解的是，这里的 render 方法内部也是调用 createElement 的。
4. 然后调用共享的 mount（mountComponent） 方法。mount（mountComponent） 主要就是调用 vm.\_update(vm.\_render())
5. vm.\_render 主要是调用 options.render 生成 vnode 树
6. vm.\_update 主要就是调用 patch 方法，将 vnode 生成真实的 dom 树

![new-vue](/img/doc/vue/new-vue.png)

## 参考

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/new-vue.html)
