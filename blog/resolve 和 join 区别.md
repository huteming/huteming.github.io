---
image: https://img.colorhub.me/5HL7W-B-G7E/rs:auto:0:500:0/g:ce/fn:colorhub/bG9jYWw6Ly8vZTQvMWIvZDFhOWJmYmI3YTJjMzU5NjNhYTEwZjU3NmFkYmE2NDhlZmIwZTQxYi5qcGVn.webp
tags: [NodeJs]
---

在 Node.js 中，path.resolve 和 path.join 都是用于处理和操作文件路径的，但它们的工作原理和使用场景有一些不同。

<!-- truncate -->

## path.resolve()

path.resolve() 是**用于将路径解析为绝对路径的函数**。它会将给定的一系列路径片段解析为一个绝对路径，解析的过程中会考虑当前工作目录。如果传入的路径是相对路径，resolve() 会将它转换为相对于当前工作目录的绝对路径。

```js
const path = require('path')

// 假设当前工作目录是 /home/user
const resolvedPath = path.resolve('foo', 'bar', 'baz')
console.log(resolvedPath) // 输出: /home/user/foo/bar/baz

// 传入绝对路径时，它会直接从绝对路径开始
const absolutePath = path.resolve('/foo', 'bar', 'baz')
console.log(absolutePath) // 输出: /foo/bar/baz

// 支持 '..' 和 '.'
const relativePath = path.resolve('foo', '..', 'bar', '.')
console.log(relativePath) // 输出: /home/user/bar
```

## path.join()

path.join() 是**用于将路径片段拼接在一起的函数**，它不会解析为绝对路径，也不会考虑当前工作目录，只是简单地拼接各个路径片段，并确保路径片段之间使用正确的路径分隔符。

```js
const path = require('path')

// 简单的拼接路径片段
const joinedPath = path.join('foo', 'bar', 'baz')
console.log(joinedPath) // 输出: foo/bar/baz

// 处理 '..' 和 '.'
const relativeJoinPath = path.join('foo', '..', 'bar', '.')
console.log(relativeJoinPath) // 输出: bar
```

## 应用场景

- 使用 resolve() 当你需要确保路径是绝对路径，特别是**在文件系统操作时（例如读写文件）很常用**。
- 使用 join() 当你只需要拼接路径，而不需要考虑绝对路径时可以使用，比如**将路径作为对象 key 使用时**。
