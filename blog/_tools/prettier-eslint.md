---
title: prettier 和 eslint 的集成
summary: prettier 和 eslint 的集成
date: 2021-06-09
---

---

## Prettier 简介

官网介绍: [链接](https://prettier.io/docs/en/index.html)

Prettier 是由 Facebook 公司开发的opinionated的`代码格式化工具`，它移除了代码的原始风格，并确保所有输出的代码遵守一致的风格。

所谓opinionated，就是指 Prettier 强制规定了一些风格，你必须按照它指定的方式去组织代码。要是不赞成 Prettier 的风格，就不要使用它。

Prettier 也提供了极少的、必要的配置项，允许用户对一些较有争议的选项进行定制，除此之外的大部分规则都不允许配置，因为配置项越多，关于风格的争吵就会越多。

Prettier 会忽略代码的原始风格，并将代码解析为 AST，按照 Prettier 自己的规则并将最大行长度纳入考虑范围内，将 AST 重新输出为新的风格的代码。

## Eslint 简介

官网介绍: [链接](https://cn.eslint.org/docs/about/)

ESLint 是一个开源的 `JavaScript 代码检查工具`，由 Nicholas C. Zakas 于2013年6月创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。

## Prettier 与 Linters 关系

各种 Linters 是按照规则(Rules)去检查代码的，遇到不符合规则的代码就会提示你，有的规则还能自动帮你解决冲突。

这些规则分为两类：

1. 格式化类的规则，比如：

- max-len
- no-mixed-spaces-and-tabs
- keyword-spacing
- comma-style

2. 代码质量类的规则，比如：

- no-unused-vars
- no-extra-bind
- no-implicit-globals
- prefer-promise-reject-errors

### 对于格式化类的规则

当 ESLint 遇到上面的 incorrect code 的时候，会提示你违反规则，让你修改代码以符合规则。

而 Prettier 则不会这么麻烦，它根本不管你之前符不符合什么规则，都先把你的代码解析成 AST，然后按照它自己的风格给你重新输出代码。所以对于这类规则，在你用了 Prettier 之后，就不会再违反这类规则了！也不需要你自己手动修改代码。

### 对于代码质量的规则

Prettier 对这类规则束手无策。而且这类规则也正是各种 Linters 的重点，因为它们真的能帮你发现很多低级的 Bug。

## 使用场景

### 日常演示类代码

这类场景，推荐在自己的编辑器中配置 Prettier 插件及规则，这类场景基本也不太关心代码质量。

在 Prettier 后能输出一套统一的风格，有利于代码的可读性，也不会像 Eslint 而在文件中有很多的异常提示。

### 项目开发

这类场景可以根据需要在 Prettier 和 Eslint 中任意选择，甚至都集成也不是不可以。

## Lint 和 Prettier 配合使用

### 为什么要配合使用？

第一在 ESLint 推出 --fix 参数前，ESLint 并没有自动化格式代码的功能，要对一些格式问题做批量格式化只能用 Prettier 这样的工具。

第二 ESLint 的规则并不能完全包含 Prettier 的规则，两者不是简单的谁替代谁的问题。但是在 ESLint 推出 --fix 命令行参数之后，如果你觉得 ESLint 提供的格式化代码够用了，也可以不使用 Prettier。

### 如何配合使用？

对于他们交集的部分规则，ESLint 和 Prettier 格式化后的代码格式不一致。导致的问题是：当你用 Prettier 格式化代码后再用 ESLint 去检测，会出现一些因为格式化导致的 warning。

这个时候有两个解决方案： 

1. 运行 Prettier 之后，再使用 eslint --fix 格式化一把，这样把冲突的部分以 ESLint 的格式为标准覆盖掉，剩下的 warning 就都是代码质量问题了。 

2. 在配置 ESLint 的校验规则时候把和 Prettier 冲突的规则 disable 掉，然后再使用 Prettier 的规则作为校验规则。那么使用 Prettier 格式化后，使用 ESLint 校验就不会出现对冲突部分的 warning。

为什么不能先使用 ESLint 再使用 Prettier?

是因为 Eslint 才会出现最终的异常提示。如果 Eslint 的规则和 Prettier 规则一致，那么在 Eslint 之后就没必要配置 Prettier；如果不一致，那么最终还是会出现 Eslint 的 warning。

## Lint 和 Prettier 集成实践

### eslint-config-prettier

`eslint-config-prettier` 是 ESLint 的配置库，用于关闭那些不需要或与 Prettier 冲突的 ESLint 规则。这可以让你在使用 Prettier 时，可以使用你最喜欢的 ESLint 共享配置而不使用该共享配置里有关样式的规则。注意，这个配置只是关闭规则，因此仅在与其他配置一起使用时才有意义。

若是单独使用eslint-config-prettier（即不使用eslint-plugin-prettier），则应该如下继承配置:

```js
// .eslintrc.*
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

注意: 因为 eslint-config-prettier 是要关闭其他配置的样式规则，所以必须放在其他 ESLint 配置之后。

### eslint-plugin-prettier

eslint-plugin-prettier是使用 Prettier 进行格式化的 ESLint 插件，它会将 Pretter 作为 ESLint 的一条规则来运行并进行格式化，然后与格式化之前的代码进行对比，如果出现了不一致，这个地方就会被 Prettier 进行标记并报告出来。

若是单独使用eslint-plugin-prettier（即不使用eslint-config-prettier），则应该如下进行配置:

```js
// .eslintrc.*
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### 集成

正常情况下，会同时使用 `eslint-plugin-prettier` 和 `eslint-config-prettier`，其配置为:

```js
// .eslintrc.*
{
  "extends": ["some-other-config-you-use", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### 推荐配置

以上这种方式的集成配置较为繁琐，eslint-plugin-prettier提供了一种简单的配置方式。

**安装依赖**

```bash
npm install -D --save-exact prettier
npm install -D eslint-plugin-prettier eslint-config-prettier
```

**配置 .eslintrc.\***

```js
// .eslintrc.*
{
  "extends": ["plugin:prettier/recommended"]
}
```
