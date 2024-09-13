---
image: https://photo.colorhub.me/muU2XgNUWx4/rs:auto:0:500:0/g:ce/fn:colorhub/bG9jYWw6Ly8vNDQvZDYvZDZkYWFiNWE4ODM5NmU3ZTgyOTI0YmFiNDZiZGMyNGFlN2NjNDRkNi5qcGc.webp
tags: [Docusaurus]
---

Docusaurus 中支持自定义代码块语法（如 ```code），可以通过扩展 Markdown 解析器的处理逻辑来实现这个功能.

步骤概述

1. 自定义 Markdown 解析器：创建一个 Remark 插件来解析自定义的代码块语法。
2. 在 Docusaurus 中注册该插件：将插件注册到 docusaurus.config.js 中。
3. 自定义代码高亮或渲染方式：根据需要进一步处理和渲染代码块。

## 创建 Remark 插件

创建一个新的文件 myRemarkPlugin.js

```js
const visit = require('unist-util-visit')

export default function customCodeBlock() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang !== 'code') {
        return
      }

      const data: any = node.data || (node.data = {})
      const attributes = node.attributes || {}

      const tagName = 'Monaco'
      const code = node.value

      data.hName = tagName
      data.hProperties = {
        ...h(tagName, attributes).properties,
        code,
      }

      return SKIP
    })
  }
}
```

## 注册自定义 Remark 插件

在 docusaurus.config.js 中注册这个自定义插件

```js
module.exports = {
  // 其他配置
  markdown: {
    remarkPlugins: [require('./myRemarkPlugin')],
  },
}
```

## 自定义代码高亮或渲染

在 src/theme/MDXComponents.js 中自定义代码块的渲染方式：

```js
import React from 'react'
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Highlight from '@site/src/components/Highlight'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Highlight,
}
```

## 问题汇总

- **Error: Unexpected usage at EditorSimpleWorker.loadForeignModule**

通常是因为 Monaco Editor 的 Web Worker 未正确配置导致的。Monaco 依赖 Web Workers 来处理语法检查和代码提示等功能，所以必须正确配置 Web Worker 路径。

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // 其他配置
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'json'], // 添加你需要的语言
        }),
      )

      return webpackConfig
    },
  },
}
```

也可以参考: [stackoverflow](https://stackoverflow.com/questions/61630937/embed-a-custom-monaco-editor-in-a-docusaurus-website-mdx)
