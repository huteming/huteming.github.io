---
tags: [Vue]
---

`shims-vue.d.ts` 文件在 Vue 项目（特别是使用 TypeScript 的 Vue 2 项目）中起到声明模块的作用。

<!-- truncate -->

## shims-vue.d.ts

因为 Vue 文件（.vue）是单文件组件（SFC），TypeScript 默认无法识别其模块类型，因此在引入 .vue 文件时会报错：`Cannot find module 'xxx.vue'`。

为了解决这个问题，我们通常会在项目中添加一个 `shims-vue.d.ts` 文件，为 TypeScript 提供模块声明，让 TypeScript 识别 .vue 文件的模块类型。这个文件的内容通常如下：

```ts
// src/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

在 Vue 3 中，使用的是新的 SFC 模块类型 DefineComponent：

```ts
// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

通过这样的声明，TypeScript 就能正确识别 .vue 文件并进行类型检查，避免模块识别错误。

:::tip
Q: 为什么有时候没有这段声明，编辑器也能正常识别 vue 文件？

A: 很有可能是因为编辑器的插件完成了这个工作。比如 vscode 中的 "TypeScript Vue Plugin(Volar)"
:::

## 如何扩展 Vue 的属性

:::warning
shims-vue.d.ts 是一个全局变量的声明文件，不能在顶部出现 import, export
:::

官方文档: [增强类型](https://v2.cn.vuejs.org/v2/guide/typescript.html#%E5%A2%9E%E5%BC%BA%E7%B1%BB%E5%9E%8B%E4%BB%A5%E9%85%8D%E5%90%88%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8)

```ts
// plugins/types.d.ts

// 这里必须在顶部引入 vue
// 因为第三方插件都是扩展的顶部 vue 的属性
// 如果在 declare 内部 import, 会丢失三方插件扩展的属性
// 因此, 该声明只能写成一个模块，只能在插件中手动引入这个类型的扩展
import Vue from 'vue'

declare module 'vue/types/vue' {
  // var vm = new Vue()
  // console.log(vm.$myProperty) // 将会顺利编译通过
  interface Vue {
    $myProperty: string
    [key: string]: any
  }

  // console.log(Vue.$myGlobal)
  interface VueConstructor {
    $myGlobal: string
    [key: string]: any
  }
}

// var vm = new Vue({
//   myOption: 'Hello'
// })
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string
    [key: string]: any
  }
}
```

```ts
// plugins/index.ts

import './types'
```

## shims-vue 为什么起作用

在 Vue 项目中，`shims-vue.d.ts` 文件一般放在 src 目录下，而 tsconfig.json 默认会包含该目录中的所有 .ts 和 .tsx 文件作为类型声明。

这是因为 tsconfig.json 默认配置会递归扫描 include 中指定的文件夹（例如 "include": ["src"]），使得 TypeScript 能够自动加载 src 中的所有 .ts 文件，包括 shims-vue.d.ts，从而让 .vue 文件的模块类型得以识别。

:::tip

tsconfig.json 中 include 的默认值是：

1. 如果声明了 files 属性，默认值为 []
2. 否则的话，就是 \*\*\/\*

:::

所以，虽然没有专门在 tsconfig.json 中指定 `shims-vue.d.ts` 文件，但由于其放在了 include 路径下，TypeScript 默认会加载它。如果项目目录结构或 include 配置有所变化，可以通过手动添加 shims-vue.d.ts 到 include 中来确保其被正确识别。
