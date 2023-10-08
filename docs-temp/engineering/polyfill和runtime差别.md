---
sidebar_position: 2
---

`Babel` 只是转换 `syntax` 层语法, 所以需要 `@babel/polyfill` 来处理 API 兼容,

又因为 `polyfill` 体积太大，所以通过 `preset` 的 `useBuiltIns` 来实现按需加载,

再接着为了满足 npm 库开发的需要 出现了 `@babel/runtime` 来做隔离。

---

**Syntax**：像 `箭头函数`、`let`、`const` 等等这些，我们在运行时无法重写的，简单记忆为 `新的关键字或者符号`。

**API**： 指那些我们可以通过函数重新覆盖的语法，如新的内置函数（如 `Promise` 或 `WeakMap` ）、静态方法（如 `Array.from` 或 `Object.assign` ）、实例方法（如 `Array.prototype.includes` ）等等。

`Babel` 默认只负责转换 `Syntax` , 而 `API` 层面的单独放在了 `polyfill` 这个模块处理，

## 1. @babel/preset-env 零配置转换

![preset零配置转换](/img/doc/engineering/preset零配置转换.png)

## 2. 全量 polyfill

`@babel/polyfill` 和 `Babel` 版本不同，使用的方式也不太一样，具体参考文档: [链接](https://babeljs.io/docs/babel-polyfill)

![全量polyfill转换](/img/doc/engineering/全量polyfill转换.png)

**问题**

1. 把对应浏览器不支持的语法全部重新写一遍，简单粗暴的解决兼容性问题, 但这样会导致打包后文件非常大！
2. 会影响全局环境。

## 3. useBuiltIns: 'usage'

![useBuiltIns-usage](/img/doc/engineering/useBuiltIns-usage.png)

与 `entry` 相比，会按需加载需要的语法转换模块，但是同样还是会影响全局环境

因此：**一般在项目里使用这样方式**

## 4. npm 包怎么办？

如果直接导入 `@babel/polyfill` 及其提供的内置函数，如 `Promise` 、 `Set` 和 `Map` ，这些都会污染全局范围。

虽然这对于应用或命令行工具来说可能是可以的，但如果您的代码是打算发布供其他人使用的库，或者您无法完全控制代码的运行环境，则会成为一个问题。

因此需要一个沙盒环境，来和外部环境做隔离

## 5. @babel/plugin-transform-runtime

![plugin-transform-runtime](/img/doc/engineering/plugin-transform-runtime.png)

语法转换的时候都是用的局部函数来实现的，而不是像 `polyfill` 直接引入重写原型链上的方法

**更加使用用于 npm 包的开发**

## 6. 各个插件的作用描述

上面都是从问题出发，说明用什么插件能解决问题，这里就总结描述下上面用到的各个插件的作用。

**preset 或者 plugin**

1. @babel/preset-env
2. @babel/plugin-transform-runtime

**被依赖的具体实现**

1. @babel/polyfill
2. @babel/runtime

### 6.1 @babel/preset-env

包含了每年新增的 `ECMAScript` 标准的转换插件，就等于以前使用的 `babel-preset-es2015` + `babel-preset-es2016` + `babel-preset-es2017` + ...。

这个配置里的 `corejs`，其实就是声明 `polyfill` 的实现版本。

### 6.2 @babel/polyfill

`Babel` 默认无法转换的 `内置函数` 等的具体实现。

和 `preset-env` 中的 `corejs` 声明对应版本关系如下:

| preset-env 中的 corejs | 依赖的包，也就是入口需要引入的包，需要单独安装 |
| ---------------------- | ---------------------------------------------- |
| 2                      | @babel/polyfill                                |
| 3                      | core-js                                        |

### 6.3 @babel/plugin-transform-runtime

运行时实现 `内置函数` 等语法转换的插件，

这个配置里的 `corejs`，其实和 `@babel/preset-env` 一样，也是在声明具体的实现版本。但要注意，这里实现依赖的不是 `@babel/polyfill`, 而是 **`@babel/runtime`**

**作用**

1. 默认情况下，`@babel/runtime` 需要添加到它的每个文件中。这种重复有时是不必要的，尤其是当您的应用程序分布在多个文件中时。`@babel/plugin-transform-runtime` 帮助程序都将引用模块 `@babel/runtime`，以避免编译输出重复。运行时将编译到您的构建中。
2. 为代码创建沙盒环境，不会影响全局环境

### 6.4 @babel/runtime

| plugin-transform-runtime 中的 corejs | 依赖的包，需要单独安装 |
| ------------------------------------ | ---------------------- |
| false                                | @babel/runtime         |
| 2                                    | @babel/runtime-corejs2 |
| 3                                    | @babel/runtime-corejs3 |

**请注意，不是每个版本都能实现所有语法的转换**

- `corejs: 2` 仅支持全局变量（例如 Promise ） 和静态属性（例如 Array.from ），
- `corejs: 3` 还支持实例属性（例如 `[].includes`）.

### 6.5 core-js

这个其实就是 `ECMAScript` 中新标准中的 `新的内置函数`、`静态方法`、`实例方法` 等等语法的具体实现。

只是根据实现场景，分为了两类

1. 全局实现, `core-js`
2. 运行时实现, `@babel/runtime-corejs`
