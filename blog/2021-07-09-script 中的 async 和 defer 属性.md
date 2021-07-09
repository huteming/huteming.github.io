---
title: script 标签的 async 和 defer 属性
tags: [浏览器, 性能优化]
---

我们都知道，浏览器解析 HTML 是一行一行按照顺序向后读取的，在传统的写法中，当浏览器读到 `<script>` 时，便会**暂停解析** DOM，同时立即开始下载 `<script>` 中定义的资源，并在下载完成后立刻执行。由于这样的特性，可能会造成 DOM 树在还没有完全解析时就开始执行 JavaScript，需要操作 DOM 的程序可能因此无法正确执行，从而造成许多问题；或是由于 `<script>` 中的资源下载、执行时间过程，用户会卡在白画面，并会产生觉得网站太慢不好用之类的体验。

而解决方法也很简单，

我们需要把 `<script>` 标签的位置都放到 `<body>` 的最后一行来避免 DOM 树解析不完全的问题，但是在复杂的网站中， HTML、JavaScript 的个头都很大，需要等到整个 DOM 树都载入完成才开始下载 `<script>` 内的资源，从网站读取完成到可操作，会产生明显的延迟感。

那这种问题该怎么解决呢？

从 HTML4 开始，`<script>` 多了 defer 属性，而 HTML5 则多了 async，两者都是用来帮助开发者控制 `<script>` 内资源的载入及执行顺序，以及避免 DOM 的解析被资源下载卡住的。

<!--truncate-->

![async vs defer](/img/blog/async-vs-defer.png)

## defer

`defer` 的意思是延迟（Deferred），在 HTML4.01 规范 中规定：

:::tip
设置后，这个布尔属性会向用户代理提示该脚本将不会生成任何网页内容（例如，JavaScript 中不会生成 “document.write”），因此，用户代理可以继续解析和渲染。
:::

也就是说，在加上 `defer` 属性后，浏览器会继续解析、渲染画面，而不会因为需要载入 `<script>` 内的资源而卡住；实际执行时，会在 `DOMContentLoaded` 执行之前，由上到下的依照摆放顺序触发。

听起来很方便对吧？但要提醒各位，虽然 W3C 规范上说 `defer` 属性会是一个布尔值，但 IE9 以前的版本是自定义的，即使写成 `<script defer="false">` 仍然会有 `defer` 的效果，使用时要特别注意。

## async

`async` 的意思是异步（Asynchronous），在 HTML5 规范 中规定：

:::tip
…如果存在 async 属性，则脚本将会在可用时立即异步执行 …
:::

在 `<script>` 标签中加上 `async` 属性后，与 `defer` 的相同点是也会在后台执行下载，但不同的是当下载完成会马上暂停 DOM 解析（如果还没有解析完成的话），并开始执行 JavaScript。因为下载完成后会立即执行，加上 `async` 属性后，就无法保证执行顺序了。

这个属性在标准中，同时也支持通过 JavaScript 动态插入 `<script>` 的情况。例如：

```js
const script = document.createElement('script')
script.src = '/something/awesome.js'
document.body.append(script)
```

动态创建的 `<script>`，默认就是异步载入；但可以通过设定属性将它关闭：

```js
script.async = false
```

## type="module"

在主流的现代浏览器中，`<script>` 的属性可以加上 `type="module"`。这时浏览器会认为这个文件是一个 JavaScript 模块，其中的解析规则、执行环境会略有不同；这时 `<script>` 的默认行为会像是 `defer` 一样，在后台下载，并且等待 DOM 解析、渲染完成之后才会执行，所以 `defer` 属性无法在 `type="module"` 的情况下发生作用。但同样可以通过 `async` 属性使它在下载完成后即刻执行。

## 用法

现在你应该明白这两个属性的特点了，那么该怎样正确地使用呢？

defer 由于后台载入、不打断渲染及确保执行顺序的特点，基本上在没特殊需求的情况下，在 `<script>` 中设置一下就行了；当然 `<script>` 本身的摆放顺序还是要稍微留心一下。

`async` 比较特别，因为在下载后会立刻执行，且不保证执行顺序，一般常见的应用是设定在完全独立的小小模块中，例如背景 Logo、页面广告等，在避免造成使用者体验变差的同时，尽量早的产生效果。

现在前端开发大都通过 Webpack 等打包工具来辅助处理，很少有自己设定这些属性的机会；开发者可以通过 [script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin) 等插件的帮助，将切分好的 Chunk 设定个别需要的 `<script>` 属性。

## 总结

`async` 及 `defer` 是 `<script>` 专属的属性，对于网页中的其他资源，可以通过 `<link>` 的 preload、prefetch 属性，来帮我们**延迟加载** 未来才需要用到的资源。

虽然 `<script>` 的`async`、`defer` 这些属性的设置大都已经包含在现代框架的打包流程中了，但只有扎实的认识这些网页最基础的规范，才能明白自己写出来的代码最后会产生什么效果。
