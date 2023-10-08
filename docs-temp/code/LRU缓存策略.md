```js
class LRUCache {
  constructor(max) {
    this.max = max
    this.keys = new Map() // <key, node>
    this.header = this.createNode(null, null)
    this.footer = this.createNode(null, null)
    this.header.next = this.footer
    this.footer.prev = this.header
  }

  get(key) {
    if (this.keys.has(key)) {
      const node = this.keys.get(key)
      this.remove(node)
      this.add(node)
      return node.value
    }
    return -1
  }

  put(key, value) {
    // 已存在
    if (this.keys.has(key)) {
      const node = this.keys.get(key)
      node.value = value
      this.remove(node)
      this.add(node)
      return node
    }
    // 不存在
    const node = this.createNode(key, value)
    if (this.keys.size >= this.max) {
      this.remove(this.header.next)
    }
    this.add(node)
    return node
  }

  createNode(key, value, prev = null, next = null) {
    return {
      key,
      value,
      prev,
      next,
    }
  }

  add(node) {
    this.footer.prev.next = node
    node.prev = this.footer.prev
    node.next = this.footer
    this.footer.prev = node

    if (node.key !== null) {
      this.keys.set(node.key, node)
    }
  }

  remove(node) {
    node.prev.next = node.next
    node.next.prev = node.prev

    if (node.key !== null) {
      this.keys.delete(node.key)
    }
  }
}
```

测试代码

```js
const cache = new LRUCache(2 /* 缓存容量 */)

cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 返回  1
cache.put(3, 3) // 该操作会使得密钥 2 作废
console.log(cache.get(2)) // 返回 -1 (未找到)
cache.put(4, 4) // 该操作会使得密钥 1 作废
console.log(cache.get(1)) // 返回 -1 (未找到)
console.log(cache.get(3)) // 返回  3
console.log(cache.get(4)) // 返回  4
```
