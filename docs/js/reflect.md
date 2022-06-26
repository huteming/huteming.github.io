`Reflect` 对象与 `Proxy` 对象一样，也是 ES6 为了操作对象而提供的新 API。

`Reflect` 最重要的目的是配合 `Proxy` 使用，执行原生行为

一般来说，`Reflect` 对象上的方法现在都有一些对应的方法，单纯使用 `Reflect` 也可能并没有非常明显的好处，

现在使用，更像是先习惯熟悉这些方法，等待有机会时配合 `Proxy` 使用。

## 可以优先考虑在项目中使用 API

### apply

用于绑定 `this` 对象后执行给定函数

```js
Reflect.apply(target, thisArg, args)
```

等同于 `Function.prototype.apply.call(func, thisArg, args)`

```js
const ages = [11, 33, 12, 54, 18, 96]

// 旧写法
const youngest = Math.min.apply(Math, ages)
const oldest = Math.max.apply(Math, ages)
const type = Object.prototype.toString.call(youngest)

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages)
const oldest = Reflect.apply(Math.max, Math, ages)
const type = Reflect.apply(Object.prototype.toString, youngest, [])
```

### getPrototypeOf

```js
Reflect.getPrototypeOf(target)
```

方法用于读取对象的 `__proto__` 属性，对应 `Object.getPrototypeOf(obj)`

```js
const myObj = new FancyThing()

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype
```

### ownKeys

方法用于返回对象的所有属性

```js
Reflect.ownKeys(target)
```

基本等同于 `Object.getOwnPropertyNames` 与 `Object.getOwnPropertySymbols` 之和

另外还有一个获取对象所有属性的方法: `Object.keys`

`Object.keys` 和 `Object.getOwnPropertyNames` 的区别是:

`Object.getOwnPropertyNames` 会返回所有属性，包括不可枚举; 而 `Object.keys` 只返回可枚举属性。

**以上所有方法获取对象属性时, 都只是获取对象自身属性, 只有 `for ... in` 循环才能获取原型链上的原型对象的属性。**

```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
}

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
// [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

顺便一提, 判断属性是否可枚举方法 `Object.prototype.propertyIsEnumerable`

### has

方法对应 `name in obj` 里面的 `in` 运算符

```js
Reflect.has(target, name)
```

```js
var myObject = {
  foo: 1,
}

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

### deleteProperty

用于删除对象的属性

```js
Reflect.deleteProperty(target, name)
```

方法等同于 `delete obj[name]`

```js
const myObj = { foo: 'bar' }

// 旧写法
delete myObj.foo

// 新写法
Reflect.deleteProperty(myObj, 'foo')
```

## 其他 API

参考文章: [ECMAScript 6 入门](https://es6.ruanyifeng.com/?search=biginit&x=0&y=0#docs/reflect)
