## webpack v4

- 需要 Node.js 的版本 >= 8.9.4
- 新增 mode 属性（development 或 production）
- 删除了 CommonsChunkPlugin 插件，它使用内置 API optimization.splitChunks 和 optimization.runtimeChunk
- 支持 wasm 模块
- 新的插件系统。旧版本的插件可能存在兼容性问题。

**development**

- 浏览器调试工具
- 注释、开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制

**production**

- 开启所有的优化代码
- 更小的 bundle 大小
- 去除掉只在开发阶段运行的代码
- Scope hoisting 和 Tree-shaking

## webpack v5

- 添加新的模块类型，来替换一些资源 loader: `file-loader`, `url-loader`, `raw-loader`
- 不再为 Node.js 模块自动引用 Polyfills
- 真正的内容哈希。之前它 "只" 使用内部结构的哈希值
- 模块联邦。它允许多个 webpack 构建一起工作
- 构建优化
- 性能优化
