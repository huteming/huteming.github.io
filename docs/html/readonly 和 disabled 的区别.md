---
title: readonly和disabled的区别
tags: []
---

readonly 和 disabled 的区别

<!--truncate-->

## 联系

readonly 和 disabled 的共同点都是可以作用于表单元素，**都能是元素处于一种可不用状态**。

但区别在于这个不可用状态是不一样的。

可以在[这里演示](https://www.w3school.com.cn/tiy/t.asp?f=eg_html_form_submit)。以及示例代码

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function greeting() {
        alert('Welcome ' + document.forms['frm1']['lastname'].value + '!')
      }
    </script>

    <form action="/demo/demo_form.asp" name="frm1" onsubmit="greeting()">
      First name:<br />
      <input type="text" name="firstname" value="Mickey" readonly />
      <br />
      Last name:<br />
      <input type="text" name="lastname" value="Mouse" disabled />
      <br /><br />
      <input type="submit" value="Submit" />
    </form>

    <p>如果您点击提交，表单数据会被发送到名为 demo_form.asp 的页面。</p>
  </body>
</html>
```

## 作用范围不同

![button](/img/html-readonly/form-button.jpg)

readonly 并没有对 input[type="button"]产生作用，按钮效果仍然在，并没有“不可用”；

而 disabled 直接对 input[type="button"]的按钮效果产生作用，导致按钮不可点击。

区别在于

**disabled**: 属性可以作用于**所有的表单元素**。

**readonly**: 属性只对`<input type="text">、<input type="number">、<textarea>和<input type="password">`等可以**输入的表单元素有效**。

## 作用程度不同

![input](/img/html-readonly/form-input.jpg)

**disabled**: 属性阻止对元素的一切操作，例如获取焦点，点击事件等等。

**readonly**: 属性只是将元素设置为只读，其他操作正常（如: 可以聚焦）。

## 提交的作用不同

**disabled**: 属性可以让表单元素的值无法被提交。

**readonly**: 属性则不影响提交问题。

:::tip

需要注意的是，

disabled 属性禁用的提交，只是通过 form 的 action 属性触发的提交，

而通过 onsubmit 属性触发的提交动作，我们一般是手动获取 input 属性值，此时是可以正常获取到属性的

:::
