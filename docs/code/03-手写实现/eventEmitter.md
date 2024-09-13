```js
class EventEmitter {
  listeners = new Map()

  on(name, listener) {
    const _listeners = this.listeners.get(name) || []
    this.listeners.set(name, _listeners.concat(listener))
  }

  once(name, listener) {
    const realListener = (...args) => {
      listener(...args)
      this.off(name, realListener)
    }
    this.on(name, realListener)
  }

  emit(name, ...args) {
    const _listeners = this.listeners.get(name) || []
    _listeners.forEach((listener) => {
      listener(...args)
    })
  }

  off(name, listener) {
    const _listeners = this.listeners.get(name) || []
    const remain = _listeners.filter((l) => l !== listener)
    this.listeners.set(name, remain)
  }
}
```

测试代码

```js
const event = new EventEmitter()

const handle = (...rest) => {
  console.log(rest)
}

event.on('click', handle)

event.emit('click', 1, 2, 3, 4)

event.off('click', handle)

event.emit('click', 1, 2)

event.once('dbClick', (...args) => {
  console.log(123456, ...args)
})
event.emit('dbClick', 'a')
event.emit('dbClick', 'b')
```
