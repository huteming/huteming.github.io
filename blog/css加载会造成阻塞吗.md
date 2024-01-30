---
tags: [css, 性能优化]
image: https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/71983382ced819139f6611fff4d4231a?_a=AQAEufR
---

总所周知，JS 执行会阻塞 DOM 树的解析和渲染。

那么 css 加载会阻塞 DOM 树的解析和渲染吗？

<!--truncate-->

为了完成本次测试，首先需要限制 chrome 的下载速度，如图：

![network](/img/css-block/network.png)

选择预设值或者是自己新增一个自己想要的网速都行，只要测试时网速**够慢**！

## css 加载会阻塞 DOM 树的解析渲染吗？

测试代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      h1 {
        color: red !important;
      }
    </style>
    <script>
      function h() {
        console.log(document.querySelectorAll('h1'))
      }
      setTimeout(h, 0)
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet" />
  </head>
  <body>
    <h1>这是红色的</h1>
  </body>
</html>
```

假设： css 加载会阻塞 DOM 树解析和渲染

假设结果: 在 bootstrap.css 还没加载完之前，下面的内容不会被解析渲染，那么我们一开始看到的应该是白屏，h1 不会显示出来。并且此时 console.log 的结果应该是一个空数组。

实际结果:如下图

![](/img/css-block/block-render.gif)

### css 会阻塞 DOM 树解析？

由上图我们可以看到，当 css 还没加载完成的时候，h1 并没有显示，但是此时控制台输出如下

![](/img/css-block/block-render-log.png)

可以得知，此时 DOM 树至少已经解析完成到了 h1 那里，而此时 css 还没加载完成，也就说明，**css 并不会阻塞 DOM 树的解析**。

### css 加载会阻塞 DOM 树渲染？

由上图，我们也可以看到，当 css 还没加载出来的时候，页面显示白屏，直到 css 加载完成之后，红色字体才显示出来，也就是说，下面的内容虽然解析了，但是并没有被渲染出来。所以，**css 加载会阻塞 DOM 树渲染**。

## css 加载会阻塞 JS 运行吗？

​css 加载会不会阻塞 JS 执行呢?

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      console.log('before css')
      var startDate = new Date()
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet" />
  </head>
  <body>
    <h1>这是红色的</h1>
    <script>
      var endDate = new Date()
      console.log('after css')
      console.log('经过了' + (endDate - startDate) + 'ms')
    </script>
  </body>
</html>
```

假设: css 加载会阻塞后面的 JS 运行

预期结果: 在 link 后面的 JS 代码，应该要在 css 加载完成后才会运行

实际结果:

![](/img/css-block/block-js.gif)

由上图我们可以看出，位于 css 加载语句前的那个 JS 代码先执行了，但是位于 css 加载语句后面的代码迟迟没有执行，直到 css 加载完成后，它才执行。这也就说明了，**css 加载会阻塞后面的 JS 语句的执行**。

详细结果看下图(css 加载用了 5600+ms):

![](/img/css-block/block-js-log.png)

## DOMContentLoaded

对于浏览器来说，页面加载主要有两个事件，一个是 DOMContentLoaded，另一个是 onLoad。而 onLoad 没什么好说的，就是等待页面的所有资源都加载完成才会触发，这些资源包括 css、js、图片视频等。

而 DOMContentLoaded，顾名思义，就是当页面的内容解析完成后，则触发该事件。那么，正如我们上面讨论过的，css 会阻塞 DOM 渲染和 JS 执行，而 JS 会阻塞 DOM 解析。那么我们可以做出这样的假设

1. 当页面只存在 css，或者 JS 都在 css 前面，那么 DomContentLoaded 不需要等到 css 加载完毕。

2. 当页面里同时存在 css 和 js，并且 JS 在 css 后面的时候，DomContentLoaded 必须等到 css 和 JS 都加载完毕才触发。

我们先对第一种情况做测试：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded')
      })
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet" />
  </head>
  <body></body>
</html>
```

复制代码实验结果如下图：

![](/img/css-block/block-loaded.gif)

从动图我们可以看出来，**css 还未加载完，就已经触发了 DOMContentLoaded 事件了**。因为 css 后面没有任何 JS 代码。

接下来我们对第二种情况做测试，很简单，就在 css 后面加一行代码就行了

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded')
      })
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet" />

    <script>
      console.log('到我了没')
    </script>
  </head>
  <body></body>
</html>
```

复制代码实验结果如下图：

![](/img/css-block/block-loaded-css+js.gif)

我们可以看到，**只有在 css 加载完成后，才会触发 DOMContentLoaded 事件**。

## 结论

由上所述，我们可以得出以下结论:

1. css 加载不会阻塞 DOM 树的解析

2. css 加载会阻塞 DOM 树的渲染

3. css 加载会阻塞后面 JS 语句的执行

4. 当页面只存在 css，或者 JS 都在 css 前面，那么 DomContentLoaded 不需要等到 css 加载完毕。

5. 当页面里同时存在 css 和 JS, 并且 JS 在 css 后面的时候，DomContentLoaded 必须等到 css 和 JS 都加载完毕才触发。

## 原理解析

**webkit 渲染过程**

![](/img/css-block/render-process.png)

从上面两个流程图我们可以看出来，浏览器渲染的流程如下：

1. HTML 解析文件，生成 DOM Tree，解析 CSS 文件生成 CSSOM Tree

2. 将 DOM Tree 和 CSSOM Tree 结合，生成 Render Tree(渲染树)

3. 根据 Render Tree 渲染绘制，将像素渲染到屏幕上。

从流程我们可以看出来

1. DOM 解析和 CSS 解析是两个并行的进程，所以这也解释了为什么 CSS 加载不会阻塞 DOM 的解析。

2. 然而，由于 Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的，所以他必须等待到 CSSOM Tree 构建完成，也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后，才能开始渲染。因此，CSS 加载是会阻塞 DOM 的渲染的。

3. 由于 JS 可能会操作之前的 DOM 节点和 css 样式，因此浏览器会维持 html 中 css 和 JS 的顺序。因此，样式表会在后面的 JS 执行前先加载执行完毕。所以 css 会阻塞后面 JS 的执行。
