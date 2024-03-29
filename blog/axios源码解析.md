---
title: axios 源码解析
tags: [http, axios]
---

axios 源码中几个关键点的解析。版本号 `v0.26.0`

<!--truncate-->

:::warning

在 axios 到达 `1.0` 之前，所有的 breaking changes 都会以 `minor` 版本发布。[官方说明](https://github.com/axios/axios#semver)

:::

## 1 axios 为何会有多种使用方式

### 1.1 使用方式

1. 第一种，直接调用

```js
axios(options)
```

2. 第二种，快捷方式调用

```js
axios.get(url, options)

axios.post(url, data, options)
```

3. 第三种，调用 request 方法

```js
axios.request(options)
```

### 1.2 源代码

> 代码路径: `/lib/axios.js`

```js
function createInstance(defaultConfig) {
  // 创建一个 Axios 实例对象。
  // 注意这个实例并不是最后导出的 axios ！！！
  // 这个对象只是用作绑定 this。各个请求之间能共享属性（如：拦截器，配置参数等）也都是因为指向这同一个 this 来完成的
  var context = new Axios(defaultConfig)
  // 把 Axios 原型对象上的 request 绑定 this 后，作为最终返回的请求方法
  var instance = bind(Axios.prototype.request, context)

  // 复制 Axios 原型对象上的方法（如：get、post、delete、put 等等），并绑定 this
  utils.extend(instance, Axios.prototype, context)

  // 复制 Axios 实例对象上的属性（如：defaults、interceptors），并绑定 this
  utils.extend(instance, context)

  // 最终返回的是 request 函数
  // 通过把其他请求方法复制到 request 函数对象上，来达到最终多种调用方式的目的
  return instance
}

var axios = createInstance(defaults)
```

流程: 每次调用 `createInstance` 都会创建一个新的上下文实例，然后把这个上下文实例绑定为 `request` 的 `this`，再通过复制的方式把其他的方法、属性等等挂载到这个 `request` 上。最后返回这个请求函数对象 `request`。

用一段伪代码来表示最终效果：

```js
// 定义
function axios() {}

axios.get = function () {}
axios.post = function () {}
axios.request = function () {}
axios.defaults = {}
axios.interceptors = {
  request,
  response,
}

// 使用
axios(options)
axios.get()
```

## 2 config 配置方式

以配置 `baseURL`、`timeout` 为例演示说明。

### 2.1 axios 的默认配置

> 代码路径 `/lib/axios.js`

```js
// /lib/defaults.js
var defaults = require('./defaults')

function createInstance(defaultConfig) {
  // ...
  var context = new Axios(defaultConfig)
  // ...
  return instance
}

var axios = createInstance(defaults)
```

> 代码路径 `/lib/core/Axios.js`

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  }
}
```

以上是几个相关的代码片段。可以看到:

- 导出的 `axios` 其实也是通过 `createInstance` 生成的，此时的配置参数为 `axios` 的默认配置 `defaults`。

- `createInstance` 将配置保存在 `axios` 的属性 `defaults` 上。

### 2.2 直接修改 axios 上的属性

**使用方式**

```js
axios.defaults['baseURL'] = 'http://somesite.com'
axios.defaults['timeout'] = 8000
```

在了解了 `axios` 这个函数对象上有 `defaults` 这个属性后，这种方式就很好理解了，

就是直接修改 `axios` 上的 `defaults` 对象

### 2.3 在请求的时候直接传递配置

**使用方式**

```js
axios.post(url, data, {
  baseURL: 'http://somesite.com',
  timeout: 10000,
})
```

**源代码**

> 代码路径 `/lib/core/Axios`

```js
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(
      mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data,
      }),
    )
  }
})
```

```js
Axios.prototype.request = function request(config) {
  // ...
  config = mergeConfig(this.defaults, config)
  // ...
}
```

需要再次强调的是，虽然这里看到的方法都是 `Axios` 原型对象上的，但是实际都是在 `createInstance` 中被复制到了 `axios` 这个函数对象上，并且绑定了 `this` 为 `axios`。

所以看到这里，思路也很清晰了。在 `post` 中，实际就是把自身快捷方式的一些属性通过 `mergeConfig` 合并到传入的配置对象 `config` 中，然后传递执行真正的请求方法 `request`。

`request` 又会把传进来的 `config` 和 `defaults` 进行合并，得到最终的请求配置

### 2.4 新的请求实例重新配置

**使用方式**

```js
const instance = axios.create({
  baseURL: 'http://somesite.com',
  timeout: 12000,
})

instance.defaults['baseURL'] = 'http://somesite.com'
instance.defaults['timeout'] = 14000

instance.post(url, data, {
  baseURL: 'http://somesite.com',
  timeout: 16000,
})
```

**源代码**

实例上修改 `defaults` 以及在 `post` 中传入请求配置，原理和 `axios` 是一样的。

剩下就是来看下 `axios.create` 做了什么特别的事情。

> 代码路径 `/lib/axios`

```js
function createInstance(defaultConfig) {
  // ...
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig))
  }
  return instance
}
```

这里尤其需要注意的是，`create` 的配置参数不是直接传递给 `createInstance`，而是先和 `axios.defaults` 进行了合并，然后在传递下去使用。

这也就意味着，通过 `axios.create` 创建的实例，都是会继承 `axios.defaults` 上的配置。

所以在平时开发中，通过 `axios.defaults` 直接修改配置时，**需要谨慎判断，这个属性是否真的有必要被项目中其他实例继承**

### 2.4 配置优先级

了解了几种请求配置的方式后，最后梳理下几种方式产生配置的优先级，分两种情况，也就是 `axios` 以及 `axios 实例`

**axios 直接请求**

优先级从高到低依次为

1. 一些快捷方式特定的配置。如 post 请求，`{ method: 'post' }`

2. post options。一次性的，不会影响后续请求

3. axios 上的 defaults 属性

4. 全局默认配置对象 `/lib/defaults`

**axios 实例 instance 发起的请求**

优先级从高到低依次为

1. 一些快捷方式特定的配置。如 post 请求，`{ method: 'post' }`

2. post options。一次性的，不会影响后续请求

3. 通过 axios.create 传入的配置

4. axios 上的 defaults 属性

5. 全局默认配置对象 `/lib/defaults`

## 3 请求及请求拦截器的工作流程

先用一段伪代码来表示最终效果

```js
// 拦截器配置
axios.interceptors.request.use(request11, request12)
axios.interceptors.request.use(request21, request22)

axios.interceptors.response.use(response31, response32)
axios.interceptors.response.use(response41, response42)

// 最终执行顺序
Promise.resolve(config)
  // request 倒序执行
  .then(request21, request22)
  .then(request11, request12)
  .then(dispatchRequest)
  // response 顺序执行
  .then(response31, response32)
  .then(response41, response42)
```

再来看看源代码

> 代码目录 `/lib/core/Axios`

```js
Axios.prototype.request = function request(config) {
  // 同步还是异步的方式执行拦截器 true: 同步；false：异步
  // 这里默认是 true, 但如果用户未声明, 下面执行会修改为 false, 也就是真实默认为异步的
  var synchronousRequestInterceptors = true
  // request 拦截器数组，偶数个。 fulfilled、rejected 一组平铺添加
  var requestInterceptorChain = []
  // 请求拦截器
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    // 文档未体现的配置: 每次发起请求的时候, 条件判断是否执行该拦截器
    // axios.interceptors.request.use(fulfilled, rejected, { runWhen })
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  // response 拦截器数组，偶数个。 fulfilled、rejected 一组平铺添加
  var responseInterceptorChain = []
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
  })

  var promise

  // 异步的方式处理拦截器
  if (!synchronousRequestInterceptors) {
    // 保持 fulfilled、rejected 一组的形式。所以数组第二个是 undefined
    // dispatchRequest 就是发起 XMLHttpRequest 请求的方法
    var chain = [dispatchRequest, undefined]

    Array.prototype.unshift.apply(chain, requestInterceptorChain)
    chain = chain.concat(responseInterceptorChain)

    promise = Promise.resolve(config)
    while (chain.length) {
      // 通过不断的添加 then, 形成 promise 完整链条
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
  }
  // 同步的方式处理拦截器
  // ...
}
```

在移除一些其他功能代码后，可以清晰的看到，整个过程其实就是一个 promise 链条执行的过程。

## 4 如何取消请求

基于 `v0.21.1`，该方法以被标记为废弃

**使用方式**

官方给出的使用方式

```js
const CancelToken = axios.CancelToken
let cancel

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  }),
})

cancel()
```

```js
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.post(
  '/user/12345',
  {
    name: 'new name',
  },
  {
    cancelToken: source.token,
  },
)

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.')
```

### 4.1 CancelToken

> 代码路径 `/lib/cancel/CancelToken`

```js
function CancelToken(executor) {
  var resolvePromise
  // 创建一个 promise，拿到 resolve 方法
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve
  })

  var token = this
  // 将取消 cancel 方法作为参数，传入回调函数，并立即执行回调函数
  executor(function cancel(message) {
    // 避免重复调用
    if (token.reason) {
      return
    }

    // cancel 只是把 promise 置为 resolve 状态
    token.reason = new Cancel(message)
    resolvePromise(token.reason)
  })
}

CancelToken.source = function source() {
  var cancel
  var token = new CancelToken(function executor(c) {
    cancel = c
  })
  return {
    token: token,
    cancel: cancel,
  }
}
```

`CancelToken.source` 其实也是实例化 `CancelToken` 的过程，然后把实例信息返回。

主要看 `CancelToken` 这个构造函数。它主要做了几件事：

1. 创建新的 Promise，并把它挂在 `CancelToken` 实例上。同时拿到这个 Promise 的 resolve 方法。

2. 立即执行传入的回调函数。

3. 回调函数的入参是一个 cancel 方法。

4. cancel 方法就是执行实例上 Promise 的 resolve 方法的过程。

所以 `CancelToken` 可以概括为：**创建一个 Promise，并通过一定的方法，外部能手动控制这个 Promise 的状态**

总结一下，`CancelToken` 的实例上有这么几个属性 `promise`, `reason`

这有什么用呢？

继续看下上面说的 `dispatchRequest`，在发送请求时做了什么。

### 4.2 dispatchRequest

> 代码路径 `/lib/cancel/CancelToken`

```js
// 在 CancelToken 原型对象上的方法
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  // cacel 执行之后才有 reason
  if (this.reason) {
    throw this.reason
  }
}
```

> 代码路径 `/lib/core/dispatchRequest`

```js
// 尝试抛出异常，中断流程
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

function dispatchRequest(config) {
  throwIfCancellationRequested(config)

  // 根据环境，发送请求，并 Promise 化
  // 浏览器环境下，就是利用 XMLHttpRequest
  var adapter = config.adapter || defaults.adapter

  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config)

      return response
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config)
      }

      return Promise.reject(reason)
    },
  )
}
```

可以看到，`dispatchRequest` 主要做了几件事：

1. 发送请求之前，判断该请求是否被取消

2. 发送请求

3. 发送请求之后，再次判断是否被取消

`dispatchRequest` 可以概括为：**发送请求，状态判断尝试中断 Promise 流程**

接下来看下浏览器环境下发送请求的方法

### 4.3 XMLHttpRequest

> 代码路径 `/lib/adapters/xhr.js`

```js
// 移除了一些和 XMLHttpRequest 请求属性相关的代码
// 只留下和取消请求相关的
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var request = new XMLHttpRequest()

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true)

    // 将 cancelToken 上的 promise 和 request 关联
    // 这里是一个竞争状态, Promise.race([cancel, request])
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return
        }

        request.abort()
        reject(cancel)
        request = null
      })
    }

    request.send(requestData)
  })
}
```

可以看到，除了 `request` 正常的响应之外，同时还多了一个和 `CancelToken` 相关的状态。

这里的处理方式很简单，就是判断 `config` 中是否有 `cancelToken` 实例，如果有，就在实例的 `promise` 上挂一个 `then`，

只要这个 `promise` 状态改变，就把这次请求 `reject`，结束请求，抛出异常。

### 4.4 请求取消流程概括

用一段伪代码来表示最终效果

```js
Promise.resolve(config)
  .then(requestInterceptor)
  // dispatchRequest
  .then(() => {
    tryCancel()
    return Promise.race([XMLHttpRequestPromise, CancelPromise])
  })
  .then(tryCancel)
  .then(responseInterceptor)
```

## 5 超时的处理

基于 `v0.21.1`

`XMLHttpRequest` 本身就能设置超时，所以只需要监听这个方法来结束这次请求

> 代码路径 `/lib/adapters/xhr.js`

```js
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var request = new XMLHttpRequest()

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true)

    // 设置超时
    request.timeout = config.timeout

    // 监听超时
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded'
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage
      }
      reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request))

      request = null
    }

    request.send(requestData)
  })
}
```

## 6 伪代码来理解整个过程

```js
function axios(config) {
  return Promise.resolve(config).then(requestInterceptor).then(dispatchRequest).then(responseInterceptor)
}

axios.defaults = {}

axios.post = function (url, data, options) {
  return axios({
    ...axios.defaults,
    ...options,
    url,
    method: 'post',
    data,
  })
}

function dispatchRequest(config) {
  tryCancel()

  return Promise.race([XMLHttpRequestPromise, CancelPromise, TimeoutPromise]).then(tryCancel)
}
```
