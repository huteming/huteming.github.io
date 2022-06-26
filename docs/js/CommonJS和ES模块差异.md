它们有几个重大差异

- CommonJS 模块输出的是一个值的拷贝; ES6 模块输出的是值的引用。

- CommonJS 模块是运行时加载; ES6 模块是静态定义的，在编译时输出接口。

## CommonJS 输出值的拷贝

```js
// lib.js
var counter = 3
function incCounter() {
  counter++
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
}
```

```js
// main.js
var mod = require('./lib')

console.log(mod.counter) // 3
mod.incCounter()
console.log(mod.counter) // 3
```

上面代码说明，`lib.js`模块加载以后，它的内部变化就影响不到输出的 `mod.counter` 了。这是因为 `mod.counter` 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```js
// lib.js
var counter = 3
function incCounter() {
  counter++
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
}
```

## ES6 模块输出值的引用

`ES6` 模块的运行机制与 `CommonJS` 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个**只读引用**。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

```js
// lib.js
export let counter = 3
export function incCounter() {
  counter++
}
```

```js
// main.js
import { counter, incCounter } from './lib'
console.log(counter) // 3
incCounter()
console.log(counter) // 4
```

另一个示例

```js
// m1.js
export var foo = 'bar'
setTimeout(() => (foo = 'baz'), 500)
```

```js
// m2.js
import { foo } from './m1.js'
console.log(foo) // bar
setTimeout(() => console.log(foo), 500) // baz
```

## 循环加载

### CommonJS 模块的循环加载

`CommonJS` 模块的重要特性是加载时执行，即脚本代码在 `require` 的时候，就会全部执行。一旦出现某个模块被"循环加载"，就**只输出已经执行的部分**，还未执行的部分不会输出。

```js
// a.js
console.log('a starting')
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```

上面代码之中，`a.js` 脚本先输出一个 `done` 变量，然后加载另一个脚本文件 `b.js`。注意，此时 `a.js` 代码就停在这里，等待 `b.js` 执行完毕，再往下执行。

```js
// b.js
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```

上面代码之中，`b.js` 执行到第二行，就会去加载 `a.js`，这时，就发生了“循环加载”。系统会去 `a.js` 模块对应对象的 `exports` 属性取值，可是因为 `a.js` 还没有执行完，从 `exports` 属性只能取回已经执行的部分，而不是最后的值。

`a.js` 已经执行的部分，只有一行。

```js
exports.done = false
```

因此，对于 `b.js` 来说，它从 `a.js` 只输入一个变量 `done`，值为 `false`。

然后，`b.js` 接着往下执行，等到全部执行完毕，再把执行权交还给 `a.js`。于是，`a.js` 接着往下执行，直到执行完毕。我们写一个脚本 `main.js`，验证这个过程。

```js
// main.js
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
```

执行 `main.js`，运行结果如下。

```js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

**所以，输入变量的时候，必须非常小心。**

下面代码中，如果发生循环加载，`require('a').foo` 的值很可能后面会被改写，改用 `require('a')` 会更保险一点。

```js
var a = require('a') // 安全的写法
var foo = require('a').foo // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg) // 使用的是 a.foo 的最新值
}

exports.bad = function (arg) {
  return foo('bad', arg) // 使用的是一个部分加载时的值
}
```

### ES6 模块的循环加载

`ES6` 处理“循环加载”与 `CommonJS` 有本质的不同。`ES6` 模块是动态引用，如果使用 `import` 从一个模块加载变量（即 `import foo from 'foo'`），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

```js
// a.mjs
import { bar } from './b'
console.log('a.mjs')
console.log(bar)
export let foo = 'foo'
```

```js
// b.mjs
import { foo } from './a'
console.log('b.mjs')
console.log(foo)
export let bar = 'bar'
```

上面代码中，执行 `a.mjs` 以后会报错，`foo` 变量未定义！！！

让我们一行行来看，`ES6` 循环加载是怎么处理的。首先，执行 `a.mjs` 以后，引擎发现它加载了 `b.mjs`，因此会优先执行 `b.mjs`，然后再执行 `a.mjs`。接着，执行 `b.mjs` 的时候，已知它从 `a.mjs` 输入了 `foo` 接口，这时不会去执行 `a.mjs`，而是认为这个接口已经存在了，继续往下执行。执行到第三行 `console.log(foo)` 的时候，才发现这个接口根本没定义，因此报错。

解决这个问题的方法，就是让 `b.mjs` 运行的时候，`foo` 已经有定义了。这可以通过将 `foo` 写成函数来解决。

```js
// a.mjs
import { bar } from './b'
console.log('a.mjs')
console.log(bar())
function foo() {
  return 'foo'
}
export { foo }
```

```js
// b.mjs
import { foo } from './a'
console.log('b.mjs')
console.log(foo())
function bar() {
  return 'bar'
}
export { bar }
```

这是因为函数具有提升作用，在执行 `import {bar} from './b'` 时，函数 `foo` 就已经有定义了，所以 `b.mjs` 加载的时候不会报错。这也意味着，如果把函数 `foo` 改写成函数表达式，也会报错。

## 参考

- [ECMAScript6 Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
