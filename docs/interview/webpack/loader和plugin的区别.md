Loader 本质就是一个函数，对其他类型的资源进行转译的预处理工作，返回转换后的结果。因为 Webpack 只认识 JavaScript。

Plugin 就是插件，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

**编写 loader 的思路**

需要遵循一些开发上的规范和原则：

- 当 Webpack 在转换文件的时候，会按顺序链式调用每一个 loader。因此前一个 loader 返回的内容会作为下一个 loader 的入参，返回值必须是标准的 JS 代码字符串，以保证下一个 loader 能够正常工作
- loader 函数中的 this 上下文由 webpack 提供，可以通过 this 对象提供的相关属性，获取当前 loader 需要的各种信息数据

示例

```js
module.exports = function (source) {
  const content = doSomeThing2JsString(source)

  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query

  // 可以用作解析其他模块路径的上下文
  console.log('this.context')

  /*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */
  this.callback(null, content)
  // or return content;
}
```

**编写 plugin 的思路**

需要遵循一些开发上的规范和原则：

- 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例；
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件;
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住;

示例

```js
class MyPlugin {
  apply(compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      // compilation: 当前打包构建流程的上下文
      console.log(compilation)

      // do something...
    })
  }
}
```
