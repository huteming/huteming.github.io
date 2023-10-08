## 观察者模式

所谓观察者模式，其实就是为了实现**松耦合**。

![观察者模式](/img/doc/js/观察者模式.webp)

**被观察者对象**

```js
class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) {
    this.observerList.push(observer)
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.name === observer.name)
    this.observerList.splice(index, 1)
  }

  notifyObservers(message) {
    const observers = this.observeList
    observers.forEach((observer) => observer.notified(message))
  }
}
```

**观察者**

```js
class Observer {
  constructor(name, subject) {
    this.name = name
    if (subject) {
      subject.addObserver(this)
    }
  }

  notified(message) {
    console.log(this.name, 'got message', message)
  }
}
```

**使用**

```js
const subject = new Subject()
const observerA = new Observer('observerA', subject)
const observerB = new Observer('observerB')
subject.addObserver(observerB)
subject.notifyObservers('Hello from subject')
subject.removeObserver(observerA)
subject.notifyObservers('Hello again')
```

## 发布订阅模式

在发布订阅模式里，发布者，并不会直接通知订阅者，换句话说，发布者和订阅者，彼此互不相识。

![发布订阅模式](/img/doc/js/发布订阅模式.webp)

**发布订阅中心**

```js
class PubSub {
  constructor() {
    this.messages = {}
    this.listeners = {}
  }
  publish(type, content) {
    const existContent = this.messages[type]
    if (!existContent) {
      this.messages[type] = []
    }
    this.messages[type].push(content)
  }
  subscribe(type, cb) {
    const existListener = this.listeners[type]
    if (!existListener) {
      this.listeners[type] = []
    }
    this.listeners[type].push(cb)
  }
  notify(type) {
    const messages = this.messages[type]
    const subscribers = this.listeners[type] || []
    subscribers.forEach((cb, index) => cb(messages[index]))
  }
}
```

**发布者**

```js
class Publisher {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  publish(type, content) {
    this.context.publish(type, content)
  }
}
```

**订阅者**

```js
class Subscriber {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  subscribe(type, cb) {
    this.context.subscribe(type, cb)
  }
}
```

**使用**

```js
const TYPE_A = 'music'
const TYPE_B = 'movie'
const TYPE_C = 'novel'

const pubsub = new PubSub()

const publisherA = new Publisher('publisherA', pubsub)
publisherA.publish(TYPE_A, 'we are young')
publisherA.publish(TYPE_B, 'the silicon valley')
const publisherB = new Publisher('publisherB', pubsub)
publisherB.publish(TYPE_A, 'stronger')
const publisherC = new Publisher('publisherC', pubsub)
publisherC.publish(TYPE_C, 'a brief history of time')

const subscriberA = new Subscriber('subscriberA', pubsub)
subscriberA.subscribe(TYPE_A, (res) => {
  console.log('subscriberA received', res)
})
const subscriberB = new Subscriber('subscriberB', pubsub)
subscriberB.subscribe(TYPE_C, (res) => {
  console.log('subscriberB received', res)
})
const subscriberC = new Subscriber('subscriberC', pubsub)
subscriberC.subscribe(TYPE_B, (res) => {
  console.log('subscriberC received', res)
})

pubsub.notify(TYPE_A)
pubsub.notify(TYPE_B)
pubsub.notify(TYPE_C)
```

## 对比

![发布订阅模式vs观察者模式](/img/doc/js/发布订阅模式vs观察者模式.webp)

**从表面上看：**

- 观察者模式里，只有两个角色 —— 观察者 + 被观察者
- 而发布订阅模式里，却不仅仅只有发布者和订阅者两个角色，还有一个经常被我们忽略的 —— 经纪人 Broker

**往更深层次讲：**

- 观察者和被观察者，是松耦合的关系
- 发布者和订阅者，则完全不存在耦合

**从使用层面上讲：**

- 观察者模式，多用于单个应用内部
- 发布订阅模式，则更多的是一种跨应用的模式(cross-application pattern)，比如我们常用的消息中间件
