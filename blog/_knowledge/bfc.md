---
title: BFC
summary: BFC的解释和应用
date: 2020-05-18
---

## 什么是BFC

BFC = Block Fomatting Context = block-level box + Formatting Context

::: tip Formatting Context
Formatting Context是W3C CSS2.1规范中的一个概念。

最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context(简称IFC)。

[格式化上下文简介](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)

[块级格式化上下文简介](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
:::

简单来说：它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系、相互作用。

**注意: 它只是规定了内部的Block-level box如何布局**

## BFC的生成

以下列举几种常见的创建方式：

- 根元素（\<html>）

- float 的值不为none

- overflow 的值不为visible

- display 的值为 inline-block、flex、grid、table-cell、table-caption

- position 的值为absolute或fixed

## BFC的约束规则

**这段规则是在网上找的，暂时没有在MDN上找到，也不敢肯定这段是不是真的规则，还是只是网上作者自己根据表现总结的**

**这里贴出来只是为了便于理解，千万！千万！千万！不要盲目相信这段规则就是真的**

> [原文地址](https://juejin.im/entry/59c3713a518825396f4f6969)

- 内部的Box会在摆放方向上（不一定是垂直方向，因为块级元素的摆放方向可以被改变：writing-mode属性），发生margin重叠

- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。

- BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界

- BFC的区域不会与float的元素区域重叠

- 计算BFC的高度时，浮动子元素也参与计算

- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素

## BFC的应用

### 垂直方向上margin重叠

```html
<style>
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
  }
</style>

<body>
  <p>Haha</p>
  <p>Hehe</p>
</body>
```

![垂直方向margin重叠示意图](/bfc/1.png)

**解决方案**

我们可以在p外面包裹一层容器，并触发该容器生成一个新BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。

```html
<style>
  .wrap {
    overflow: hidden;
  }
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
  }
</style>
<body>
  <p>Haha</p>
  <div class="wrap">
    <p>Hehe</p>
  </div>
</body>
```

![垂直方向margin重叠示意图](/bfc/2.png)

### 嵌套元素的margin值"溢出"

严格来说，这个可能不是BFC的一个应用，但因为还是挺常见的问题，而且能用创建一个BFC来解决，所以也放在这里一起说明了。问题表现为：

子元素的上边界和外部容器的上边界重叠，导致内部元素的margin-top值"溢出"到外部容器上

```html
<style>
  .wrap {
    background-color: aquamarine;
  }
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
  }
</style>

<body>
  <div class="wrap">
    <p>Hehe</p>
  </div>
</body>
```

![margin溢出示意图](/bfc/3.png)

**解决方案**

让容器wrap创建一个BFC，将内部元素包裹起来

```html
<style>
  .wrap {
    background-color: aquamarine;
    overflow: hidden;
  }
  p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
  }
</style>

<body>
  <div class="wrap">
    <p>Hehe</p>
  </div>
</body>
```

![margin溢出示意图](/bfc/4.png)

::: tip 权威解释
如果没有边框border，内边距padding，行内内容，也没有**创建块级格式上下文**或清除浮动来分开一个块级元素的上边界margin-top 与其内一个或多个后代块级元素的上边界margin-top；或没有边框，内边距，行内内容，高度height，最小高度min-height或 最大高度max-height 来分开一个块级元素的下边界margin-bottom与其内的一个或多个后代后代块元素的下边界margin-bottom，**则就会出现父块元素和其内后代块元素外边界重叠，重叠部分最终会溢出到父级块元素外面**。

::: right
来自[MDN的外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
:::

### 清除内部浮动

问题表现为容器内部只有浮动元素时，容器的高度坍塌

```html
<style>
  .par {
    border: 5px solid #fcc;
    width: 300px;
  }

  .child {
    border: 5px solid #f66;
    width:100px;
    height: 100px;
    float: left;
  }
</style>

<body>
  <div class="par">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</body>
```

![垂直方向margin重叠示意图](/bfc/5.png)

**解决方案**

让容器创建一个BFC

```html
<style>
  .par {
    border: 5px solid #fcc;
    width: 300px;
    overflow: hidden;
  }

  .child {
    border: 5px solid #f66;
    width:100px;
    height: 100px;
    float: left;
  }
</style>

<body>
  <div class="par">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</body>
```

![垂直方向margin重叠示意图](/bfc/6.png)

### 自适应两栏布局(文字环绕)

问题表现为：浮动元素会遮盖底部未浮动元素

```html
<style>
  body {
    width: 300px;
  }

  .aside {
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
  }

  .main {
    height: 200px;
    background: #fcc;
  }
</style>

<body>
  <div class="aside"></div>
  <div class="main"></div>
</body>
```

**解决方案**

给不浮动的元素添加属性，使它自身会创建一个BFC

```html
<style>
  body {
    width: 300px;
  }

  .aside {
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
  }

  .main {
    height: 200px;
    background: #fcc;
    overflow: hidden;
  }
</style>

<body>
  <div class="aside"></div>
  <div class="main"></div>
</body>
```

![垂直方向margin重叠示意图](/bfc/8.png)

## 总结

BFC的解释和使用场景肯定不止这么简答，这里目前也只是列举了几个比较常见的场景，

为了方便以后的理解和记忆，可以用一句话来简单描述一下：

**BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，外部的元素也不会影响内部**

比如针对以上场景，用这句话解释就是

- margin重叠：创建BFC之后，margin变成"内部属性"，不在与外部属性统一计算

- margin溢出：内部的margin影响到了外部

- 清除内部浮动：内部元素溢出到了容器之外

- 文字环绕：浮动元素遮挡了其他元素

显然以上这么理解肯定是片面的，是不规范的，这只是一个记忆理解的办法而已！
