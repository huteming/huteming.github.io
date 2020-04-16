---
title: 实现拖拽
summary: 手写实现一个简单的拖拽功能
date: 2020-04-16
---

-------------------------

## 参考文章

[地址在这里](https://www.zhangxinxu.com/wordpress/2016/11/html5-drag-drop-module-insert-sort-delete-demo/)

## 实现

```js
body {font-size:84%;}
.dustbin{
  width:100px; height:260px; line-height:1.4; background-color:gray; font-size:36px;
  font-family:"微软雅黑", "Yahei Mono"; text-align:center; text-shadow:-1px -1px #bbb; float:left;
}
.dragbox{width:500px; padding-left:20px; float:left;}
.draglist{padding:10px; margin-bottom:5px; border:2px dashed #ccc; background-color:#eee; cursor:move;}
.draglist:hover{border-color:#cad5eb; background-color:#f0f3f9;}
.dragremind{padding-top:2em; clear:both;}
```

```html
<div class="dustbin">
  <br />垃<br />圾<br />箱
</div>
<div class="dragbox">
  <div class="draglist" draggable="true">列表1</div>
  <div class="draglist" draggable="true">列表2</div>
  <div class="draglist" draggable="true">列表3</div>
  <div class="draglist" draggable="true">列表4</div>
</div>
<div class="dragremind"></div>
```

```js
const wrap = document.querySelector('.dragbox')
const destroy = document.querySelector('.dustbin')
const mind = document.querySelector('.dragremind')
let current = null

function updateText (text) {
  mind.innerHTML = text
}

// 开始拖拽时标记元素，修改正在拖动项
wrap.addEventListener('dragstart', function (eve) {
  console.log('start', eve)
  updateText(`正在拖动: ${eve.target.innerText}`)
  current = eve.target
})

wrap.addEventListener('drag', function (eve) {
  // console.log('move', eve)
})

// 清空当前拖动
wrap.addEventListener('dragend', function (eve) {
  console.log('end', eve)
  updateText('')
  current = null
})

// 标记已经进入删除区域
destroy.addEventListener('dragenter', function (eve) {
  console.log('enter', eve)
  eve.target.style.color = '#fff'
})

destroy.addEventListener('dragover', function (eve) {
  // ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发
  // console.log('over', eve)
  eve.preventDefault()
})

// 未放下离开
// 提示未放下，标记离开
destroy.addEventListener('dragleave', function (eve) {
  console.log('leave', eve)
  eve.target.style.color = ''
})

// 删除当前拖动项，标记放下
destroy.addEventListener('drop', function (eve) {
  // drop 事件触发时,不会触发 dragend 和 dragleave 事件
  console.log('drop', eve)
  eve.target.style.color = ''
  updateText('')
  if (current) {
    current.parentNode.removeChild(current)
    alert('删除成功')
  } else {
    // 这里现在一般不会执行.
    // 因为 drop 不在删除上,不会触发事件;在删除上,直接走删除分支了
    alert('未删除')
  }
})
```

## 总结

1. 这个实现还是非常非常基础的，主要作用就是用来稍微熟悉下api, 后续再慢慢实现更复杂的事情
