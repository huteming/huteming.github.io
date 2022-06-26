**块格式化上下文（Block Formatting Context，BFC）**, 是 Web 页面的可视 CSS 渲染的一部分，用于决定块级盒的布局及浮动相互影响范围的一个区域。

BFC 具有一些特性：

- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

下列方式会创建块格式化上下文：

- 根元素（`<html>`）
- 浮动元素（`float 值不为 none`）
- 绝对定位元素（`position 值为 absolute 或 fixed`）
- 行内块元素（`display 值为 inline-block`）
- overflow 值不为 `visible、clip` 的块元素
- 弹性元素（display 值为 flex 或 inline-flex 元素的**直接子元素**），如果它们本身既不是 flex、grid 也不是 table 容器
- 网格元素（display 值为 grid 或 inline-grid 元素的**直接子元素**），如果它们本身既不是 flex、grid 也不是 table 容器
