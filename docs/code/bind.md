```js
function isObject(value) {
  return typeof value === 'object' && value !== null
}

function isFunction(value) {
  return typeof value === 'function'
}

function fakeBind(fn, context, ...presets) {
  if (context === undefined || context === null) {
    context = globalThis
  }
  context = Object(context)
  const key = Symbol()

  const fake = function (...args) {
    // new.target返回一个指向构造方法或函数的引用。
    // 在普通的函数调用中，new.target 的值是undefined
    if (!new.target) {
      context[key] = fn
      const res = context[key](...presets, ...args)
      delete context[key]
      return res
    }

    this[key] = fn
    const res = this[key](...presets, ...args)
    delete this[key]
    if (isObject(res) || isFunction(res)) {
      return res
    }
    return this
  }
  // 不要重新赋值 constructor，是刻意替换整个 prototype
  // bind 只是绑定 this
  // new 执行时依然需要走 fn.constructor
  fake.prototype = Object.create(fn.prototype)
  return fake
}
```

测试代码

```js
function Person(name, age) {
  console.log(name) //'我是参数传进来的name'
  console.log(age) //'我是参数传进来的age'
  console.log(this) //构造函数this指向实例对象
}
Person.prototype.say = function () {
  console.log(123)
}

const obj = {
  objName: '我是obj传进来的name',
  objAge: '我是obj传进来的age',
}

// 普通函数
function normalFun(name, age) {
  console.log(name) // '我是参数传进来的name'
  console.log(age) // '我是参数传进来的age'
  console.log(this) // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName) //'我是obj传进来的name'
  console.log(this.objAge) //'我是obj传进来的age'
}

// 先测试作为构造函数调用
const bindFun1 = fakeBind(Person, obj, '我是参数传进来的name')
let a = new bindFun1('我是参数传进来的age')
a.say() //123

// 再测试作为普通函数调用
const bindFun2 = fakeBind(normalFun, obj, '我是参数传进来的name')
bindFun2('我是参数传进来的age')
```
