---
title: K 个一组翻转链表
summary: 每日算法之K个一组翻转链表
date: 2020-05-16
---

## 题目描述

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

### 示例

示例：

```
给你这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5
```

## 题解

### 思路

1. 为了避免链表头部的边界问题，可以先创建一个头部节点，最后返回这个头部节点的next节点即可。

2. 利用两层循环，外层判断当前节点是否存在，内部循环判断翻转节点是否存在，找出需要翻转的链表头尾节点。

3. 如果查找过程中发现有节点是空，意味着已经到链表尾部了，这时候直接返回当前翻转后的链表。

4. 注意在找到翻转节点进行翻转后，需要重新连接头尾节点

### 代码实现

```js
function reverseKGroup (head, k) {
  const top = new ListNode(0)
  top.next = head
  let pre = top

  while (head) {
    // 其实没必要这么多变量，这里只是为了便于理解
    // 0(prev) -> 1(hair) -> 2(tail) -> 3(next)
    // hair, tail 是需要翻转链表头尾节点
    // prev, next 是为了翻转后的重新连接
    let prev = pre
    let hair = prev.next
    let tail = prev
    for (let i = 0; i < k; i++) {
      tail = tail.next
      if (!tail) {
        return top.next
      }
    }
    let next = tail.next
    // 转换之前，保存 head的前一项 和 tail的后一项，在转换后重新连接
    const [_hair, _tail] = myReverse(hair, tail)
    prev.next = _hair
    _tail.next = next
    pre = _tail

    head = next
  }

  return top.next
}

// 0 -> 1(head) -> 2 -> 3 -> 4(tail) -> 5
//                 =>
// 0 -> 4(head) -> 3 -> 2 -> 1(tail) -> 5
const myReverse = (head, tail) => {
  let rest = tail.next
  let point = head

  while (tail !== rest) {
    const next = point.next
    point.next = rest
    rest = point
    point = next
  }

  return [tail, head]
}

function ListNode(val) {
  this.val = val
  this.next = null
}
```
