```js
function isObject(value) {
  return typeof value === 'object' && value !== null
}

function isFunction(value) {
  return typeof value === 'function'
}

function fakeNew(constructor, ...args) {
  const context = Object.create(constructor.prototype)
  const res = constructor.apply(context, args)
  if (isObject(res) || isFunction(res)) {
    return res
  }
  return context
}
```

测试代码

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.age)
}
let p1 = fakeNew(Person, 'zhangsan', 18)
console.log(p1.name)
console.log(p1)
p1.say()
```
