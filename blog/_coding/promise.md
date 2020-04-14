---
title: 手写Promise
summary: 手写实现Promise
date: 2020-04-14
---

-------------------------

MDN上的介绍太长了，就不一一列举了，可以[看这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 个人实现

```js
type Type = 'success' | 'failure'
type Status = Type | ''
interface Success {
  (data?: any): any
}
interface Failure {
  (reason?: any): any
}
interface Resolve {
  (data?: any): any
}
interface Reject {
  (reason?: any): any
}
interface Callback {
  (resolve: Resolve, reject: Reject): any
}
interface Que {
  success?: Success
  failure?: Failure
}

export default class Mock {
  private status: Status = ''
  private waiting: boolean = false
  private prevData: any = null
  private prevErr: any = null
  private queue: Que[] = []

  constructor (callback: Callback) {
    // 构造函数的回调函数会立即执行
    // 但异常会在下个事件循环中捕获
    try {
      callback(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }

  private getNext<T extends Type> (type: T): Que[T] | undefined {
    const next = this.queue.shift()
    if (!next) {
      return
    }
    if (typeof next[type] !== 'function') {
      return this.getNext(type)
    }
    return next[type]
  }

  // 执行下一个处理函数
  // 并且用返回继续执行链条后续函数
  private resolve (data: any) {
    // 状态已经改变，不可更改
    if (this.waiting) {
      return
    }
    this.waiting = true
    this.status = 'success'

    setTimeout(() => {
      const nextSuccess = this.getNext('success')
      if (typeof nextSuccess !== 'function') {
        this.waiting = false
        this.prevData = data
        return
      }
      try {
        const res = nextSuccess(data)
        // 如果返回的是Promise，等待
        if (res instanceof Mock) {
          res
            .then(data => {
              this.waiting = false
              this.resolve(data)
            })
            .catch(err => {
              this.waiting = false
              this.reject(err)
            })
          return
        }
        this.waiting = false
        this.resolve(res)
      } catch (e) {
        this.waiting = false
        this.reject(e)
      }
    })
  }

  // 执行下一个错误处理函数
  // 并且用返回继续执行链条后续函数
  private reject (err: any) {
    // 状态已经改变，不可更改
    if (this.waiting) {
      return
    }
    this.waiting = true
    this.status = 'failure'

    // 下个循环处理异常
    setTimeout(() => {
      const nextFailure = this.getNext('failure')
      // 没有处理异常函数，抛出
      if (typeof nextFailure !== 'function') {
        this.waiting = false
        this.prevErr = err
        throw err
      }
      try {
        const res = nextFailure(err)
        // 如果返回的是Promise，等待
        if (res instanceof Mock) {
          res
          .then(data => {
            this.waiting = false
            this.resolve(data)
          })
          .catch(err => {
            this.waiting = false
            this.reject(err)
          })
          return
        }
        this.waiting = false
        this.resolve(res)
      } catch (e) {
        this.waiting = false
        this.reject(e)
      }
    })
  }

  // 返回对象有 then, catch 函数
  // then 可以多个链接
  then (success: Success, failure?: Failure): Mock {
    this.queue.push({ success, failure })

    if (this.status === 'success') {
      this.resolve(this.prevData)
    } else if (this.status === 'failure') {
      this.reject(this.prevErr)
    }
    return this
  }

  catch (failure: Failure): Mock {
    this.queue.push({ failure })

    if (this.status === 'failure') {
      this.reject(this.prevErr)
    }
    return this
  }
}
```

## 网上实现

找了一个网上看起来比较好的实现Polyfill，github上的星星也有 `1.8k`。[地址在这里](https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js)

## 实现对比

1. 还是思路上错了，个人实现里只是把 then/catch 里的函数当作回调函数处理，而真实实现应该是需要包装成新的 Promise，可能正常使用的结果会差不多，但在特定情况下会有一些区别

```js
const p = new Mock((resolve, reject) => {
  reject('data')
})
p
  .then(data => {
    console.log(1, data)
  })
  .catch(err => {
    console.log(2, err)
  })
  .then(data => {
    console.log(3, data)
  })

p
  .then(data => {
    console.log(4, data)
  })
  .catch(err => {
    console.log(5, err)
  })
  .then(data => {
    console.log(6, data)
  })
```

比如上面这段代码，个人实现中打印的顺序可能和原生Promise有些差异
