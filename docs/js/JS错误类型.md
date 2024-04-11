## 错误类型

### 语法错误

```js
// Uncaught SyntaxError: Missing initializer in const declaration
const xx
```

### 同步运行时错误

```js
// Uncaught TypeError: Cannot read properties of undefined (reading 'name')
const person = void 0
person.name
```

### 异步错误

```js
// Uncaught Error: timeout error
setTimeout(() => {
  throw new Error('timeout error')
}, 10)
```

### promise 错误

```js
// html:66 Uncaught (in promise) Error: promise error
Promise.reject(new Error('promise error'))
```

### 资源请求错误

```html
<!-- GET http://localhost:3000/image.png 404 (Not Found) -->
<img src="/image.png" alt="" />

<!-- 跨域 -->
<!-- GET http://localhost:8000/jsf net::ERR_ABORTED 404 (Not Found) -->
<script src="http://localhost:8000/js"></script>
```

### http 请求错误

```js
// GET http://localhost:8000/json 404 (Not Found)
fetch('/json')
```

## 错误监听

### try/catch

```js
// 语法错误 ❌
try {
  const notdefined,
} catch(e) {
  console.log('捕获到异常: ', e);
}

// 同步运行时错误 ✅
try {
  console.log(notdefined);
} catch(e) {
  console.log('捕获到异常: ', e);
}

// 异步错误 ❌
try {
  setTimeout(() => {
    console.log(notdefined);
  }, 0)
} catch(e) {
  console.log('捕获到异常: ',e);
}
```

### onerror

```js
window.addEventListener(
  'error',
  (error) => {
    console.log('捕获到异常: ', error)
  },
  true,
)
```

```js
// 语法错误 ✅
const notdefined,

// 同步运行时错误 ✅
console.log(notdefined)

// 异步错误 ✅
setTimeout(() => {
  console.log(notdefined)
}, 0)

// 资源请求错误 ✅
<img src='/image.png' alt='' />

// 跨域资源请求错误 ✅
// 特别注意的是
// 客户端需要添加 crossorigin 属性
// 服务端也需要支持跨域
// 否则异步脚本发生错误时, 提示信息是 Script error, 无法获取具体错误信息
<script src="http://localhost:8000/js" crossorigin="anonymous"></script>

// http 请求错误 ❌
fetch('/json', {})
```

### unhandledrejection

```js
// 特别需要注意的是
// 虽然 fetch, axios 等工具是返回 Promise 的,
// 但其抛出的错误并不会被 unhandledrejection 捕获
window.addEventListener(
  'unhandledrejection',
  (error) => {
    console.log('捕获到异常: ', error)
  },
  true,
)
```

```js
// promise 错误 ✅
Promise.reject(new Error('promise error'))

// http 请求错误 ❌
fetch('/json')
```
