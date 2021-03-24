---
title: css垂直居中
summary: css设置垂直居中方案
date: 2021-03-24
---

---

## HTML 代码部分

```html
<!-- 块级元素 -->
<div class="outer">
  <div class="inner">hello world</div>
</div>
```

```html
<!-- 行内元素 -->
<div class="outer">
  <span class="inner">hello world</span>
</div>
```

## 行内元素

### 单行文字垂直居中

设置 height = line-height

::: tip
很常用，主要用于文字的排版，也可以用于图片元素居中
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  line-height: 100px;
}
```

## 块级元素

### flex 布局

::: tip
优点：更灵活，也更简洁，可维护性也更强。只要不考虑 IE，这个方案几乎是最优选择吧。

缺点：如果还在使用 IE 浏览器的话，flex 布局就没那么香了
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  display: flex;
  align-items: center;
}
```

### 绝对定位 + margin: auto

::: tip
优点：不需要提前知道尺寸，兼容性好

缺点：目前已经不建议使用绝对定位 absolut 了，如果还在用 IE 开发，这个方法还是比较推荐的。
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  position: relative;
}

.inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  margin: auto;
}
```

### display: table-cell

::: tip
优点：也是一个比较好的实现方式，较简洁
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  display: table;
  width: 100%;
}

.inner {
  display: table-cell;
  vertical-align: middle;
}
```

### 绝对定位 + margin

::: tip
优点： 兼容性不错，也算是一点小技巧吧。

缺点：需要提前知道 child 的尺寸，margin-top: -(高度的一半);现在已经不建议使用绝对定位 absolute，特别是在移动设备上。
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  position: relative;
}

.inner {
  position: absolute;
  top: 50%;
  left: 0;
  width: 150px;
  height: 50px;
  margin-top: -25px;
}
```

### 绝对定位 + translate

::: tip
优点：不需要提前知道尺寸
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  position: relative;
}

.inner {
  position: absolute;
  top: 50%;
  left: 0;
  height: 50px;
  transform: translate(0, -50%);
}
```

### padding

::: tip
缺点：如果高度固定，需要提前计算尺寸（只在某些特定情况适用）。
:::

```css
.outer {
  height: 100px;
  background: lightblue;
  padding: 20px;
  box-sizing: border-box;
}

.inner {
  height: 60px;
}
```

### 伪元素

```css
.outer {
  height: 100px;
  background: lightblue;
}

.inner {
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  background: lightgreen;
}

.outer::before {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
```

### calc

::: tip
缺点：需要计算，在特定场景下可能比较合适。
:::

::: tip 百分比参照物
height: 父级的 height 值

width: 父级的 width 值

margin: 父级的 width 值

padding: 父级的 width 值
:::

```css
.outer {
  height: 100px;
  background: lightblue;
}

.inner {
  position: relative;
  background: lightgreen;
  height: 20px;
  float: left;
  top: calc(50% - 20px / 2);
}
```
