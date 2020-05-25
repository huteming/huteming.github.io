---
title: LRU缓存机制
summary: 每日算法之LRU缓存机制
date: 2020-05-25
---

## 题目

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。

写入数据 put(key, value) - 如果密钥已经存在，则变更其数据值；如果密钥不存在，则插入该组「密钥/数据值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

要求:

你是否可以在 O(1) 时间复杂度内完成这两种操作？

提示：

获取和写入数据时都进行新鲜度更新

## 示例 

示例:

```
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

## 题解

### 思路

- 数据获取在O(1)内完成，可以使用一个map，它的查询永远是O(1)

- 数据获取显然不能用队列或者是数组，因为他们在更新位置时的复杂度是O(n)，更新位置复杂度是O(1)的是双向链表

- 为了方便处理链表边界问题，可以分别给一个伪头部为伪尾部。

### 代码实现

```js
function LRUCache (capacity) {
  this.map = new Map()
  this.head = new ListNode('head')
  this.tail = new ListNode('tail')
  this.head.next = this.tail
  this.tail.prev = this.head
  this.remaining = capacity
}

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) {
    return -1
  }
  return this.update(key).value
}

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    const node = this.update(key)
    node.value = value
    return
  }
  // 容量还有剩余
  if (this.remaining > 0) {
    this.remaining--
    this.add(key, value)
    return
  }
  // 删除最久节点
  const removed = this.removeHead()
  this.map.delete(removed.key)
  // 添加新节点
  this.add(key, value)
}

LRUCache.prototype.add = function (key, value) {
  const node = new ListNode(key, value)
  this.addToTail(node)
  this.map.set(key, node)
  return node
}

LRUCache.prototype.update = function (key) {
  const node = this.map.get(key)
  node.prev.next = node.next
  node.next.prev = node.prev
  this.addToTail(node)
  return node
}

LRUCache.prototype.addToTail = function (node) {
  this.tail.prev.next = node
  node.prev = this.tail.prev
  node.next = this.tail
  this.tail.prev = node
  return node
}

LRUCache.prototype.removeHead = function () {
  const node = this.head.next
  this.head.next = node.next
  node.next.prev = this.head
  return node
}

function ListNode (key, value) {
  this.key = key
  this.value = value
  this.prev = null
  this.next = null
}
```
