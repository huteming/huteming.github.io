webpack 给我们提供了三种哈希值计算方式，分别是 hash、chunkhash 和 contenthash。那么这三者有什么区别呢？

stackoverflow 上的一个[解释](https://stackoverflow.com/questions/35176489/what-is-the-purpose-of-webpack-hash-and-chunkhash)

## hash

跟整个项目的构建相关，构建生成的文件 hash 值都是一样的，只要项目里有文件更改，整个项目构建的 hash 值都会更改。

它是基于我们所有使用过的源文件生成的。如果我在不更改任何内容的情况下重新运行构建，生成的哈希将保持不变。

## chunkhash

根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的 hash 值

## contenthash

由文件内容产生的 hash 值，内容不同产生的 contenthash 值也不一样

## 其他

### chunk 有两种形式

- `initial(初始化)` 是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及其依赖项。
- non-initial 是可以延迟加载的块。可能会出现在使用 `动态导入(dynamic imports)` 或者 `SplitChunksPlugin` 时。

每个 chunk 都有对应的 **asset(资源)**。资源，是指输出文件（即打包结果）。
