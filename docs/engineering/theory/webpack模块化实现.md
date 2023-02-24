## CommonJS 和 ESModule

### 源代码

```js
//index.js  入口文件
import _, { name } from './es';
let co = require('./common');
co.sayHello(name);
export default _;

//es.js
export const age = 18
export const name = '小明'
export default 'ESModule'

//common.js
exports.sayHello = (name) => {
  console.log('hello', name)
}
```

webpack 配置（`webpack@5.72.1`、 `webpack-cli@4.9.2`）

```js
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

### webpack 生成的内容结构

```js
;(() => {
  var __webpack_modules__ = {
    './src/common.js': (__unused_webpack_module, exports) => {
      // ./src/common.js 文件内容
    },
    './src/es.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      // ./src/es.js 文件内容
    },
  }
  // The module cache
  var __webpack_module_cache__ = {}

  // The require function
  function __webpack_require__(moduleId) {}

  // define getter functions for harmony exports
  __webpack_require__.d = (exports, definition) => {}

  /* webpack/runtime/hasOwnProperty shorthand */
  __webpack_require__.o = (obj, prop) => {}

  // define __esModule on exports
  __webpack_require__.r = (exports) => {}

  var __webpack_exports__ = {}

  ;(() => {
    'use strict'
    // ./src/index.js 文件内容
  })()
})()
```

1. 源代码模块转换后被包裹在一个函数中

2. 所有的模块存在一个对象中，其中以文件路径为 key，源代码函数为 value

3. 还有一些辅助方法，用来兼容 CommonJS 和 ESModule

### `__webpack_require__.o`

```js
// 判断是否已经定义某个属性
__webpack_require__.o = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
```

### `__webpack_require__.d`

```js
// 在导出对象上定义需要导出的属性的 getter 函数
// 为什么是定义 getter 函数: ESM的规范中，导出不是值的拷贝，而是值的引用
__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (
      __webpack_require__.o(definition, key) &&
      !__webpack_require__.o(exports, key)
    ) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      })
    }
  }
}
```

### `__webpack_require__.r`

```js
// 标记是 ESM 规范导出的模块
__webpack_require__.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module',
    })
  }
  Object.defineProperty(exports, '__esModule', { value: true })
}
```

### `__webpack_require__`

```js
// 导入模块
// 其实也就是根据 moduleId 找到对应的模块函数去执行
// 执行过程中会将一些变量导出（赋值到导出对象上），然后返回该导出对象
function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {},
  })

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

  // Return the exports of the module
  return module.exports
}
```

### common.js

```js
{
  './src/common.js': (__unused_webpack_module, exports) => {
    exports.sayHello = (name) => {
      console.log('hello', name)
    }
  }
}
```

### es.js

```js
{
  './src/es.js': (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__,
  ) => {
    'use strict'
    // 标记为 ESModule
    __webpack_require__.r(__webpack_exports__)
    // 导出变量的 getter
    __webpack_require__.d(__webpack_exports__, {
      age: () => age,
      default: () => __WEBPACK_DEFAULT_EXPORT__,
      name: () => name,
    })
    const age = 18
    const name = '小明'
    const __WEBPACK_DEFAULT_EXPORT__ = 'ESModule'
  }
}
```

### index.js

```js
;() => {
  'use strict'
  // index.js  入口文件
  // 标记为 ESModule
  __webpack_require__.r(__webpack_exports__)
  // 导出变量的 getter
  __webpack_require__.d(__webpack_exports__, {
    default: () => __WEBPACK_DEFAULT_EXPORT__,
  })
  var _es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/es.js')

  let co = __webpack_require__('./src/common.js')
  co.sayHello(_es__WEBPACK_IMPORTED_MODULE_0__.name)
  const __WEBPACK_DEFAULT_EXPORT__ = _es__WEBPACK_IMPORTED_MODULE_0__['default']
}
```

## import() 动态加载

### 源代码

```js
// es.js
export const age = 18
export const name = '小明'
export default 'ESModule'

// index.js
import('./es').then((val) => console.log(val))
```

### webpack 生成文件结构

```
dist
│   src_es_js
│   main.js
```

### main.js 内容结构

```js
;(() => {
  // webpackBootstrap
  var __webpack_modules__ = {}
  // The module cache
  var __webpack_module_cache__ = {}

  // The require function
  function __webpack_require__(moduleId) {}

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = __webpack_modules__

  // define getter functions for harmony exports
  __webpack_require__.d = (exports, definition) => {}

  __webpack_require__.f = {}
  __webpack_require__.e = (chunkId) => {}

  // This function allow to reference async chunks
  __webpack_require__.u = (chunkId) => {}

  __webpack_require__.g = (function () {})()

  __webpack_require__.o = (obj, prop) => {}

  /* webpack/runtime/load script */
  var inProgress = {}
  var dataWebpackPrefix = 'demo:'
  // loadScript function to load a script via script tag
  __webpack_require__.l = (url, done, key, chunkId) => {}

  // define __esModule on exports
  __webpack_require__.r = (exports) => {}

  /* webpack/runtime/publicPath */
  __webpack_require__.p = scriptUrl

  /* webpack/runtime/jsonp chunk loading */
  ;(() => {
    var installedChunks = {
      main: 0,
    }

    __webpack_require__.f.j = (chunkId, promises) => {}

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {}

    var chunkLoadingGlobal = (self['webpackChunkdemo'] =
      self['webpackChunkdemo'] || [])
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
    )
  })()

  var __webpack_exports__ = {}

  //index.js  入口文件
  __webpack_require__
    .e('src_es_js')
    .then(__webpack_require__.bind(__webpack_require__, './src/es.js'))
    .then((val) => console.log(val))
})()
```

### webpackJsonpCallback

```js
// 每个模块加载完成后的回调函数
// 将异步模块 data 保存到 __webpack_modules__
// installedChunks[chunkId] 被置为 0（加载完成状态）
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules, runtime] = data
  // add "moreModules" to the modules object,
  // then flag all "chunkIds" as loaded and fire callback
  var moduleId,
    chunkId,
    i = 0
  if (chunkIds.some((id) => installedChunks[id] !== 0)) {
    for (moduleId in moreModules) {
      if (__webpack_require__.o(moreModules, moduleId)) {
        __webpack_require__.m[moduleId] = moreModules[moduleId]
      }
    }
    if (runtime) var result = runtime(__webpack_require__)
  }
  if (parentChunkLoadingFunction) parentChunkLoadingFunction(data)
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i]
    if (
      __webpack_require__.o(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      installedChunks[chunkId][0]()
    }
    installedChunks[chunkId] = 0
  }
}
```

### chunkLoadingGlobal

```js
// chunkLoadingGlobal 保存了所有的异步模块
// 同时也重写了自身的 push 方法。
// 异步模块调用 push 加载到 chunkLoadingGlobal 的时候，会调用该回调函数
var chunkLoadingGlobal = (self['webpackChunkdemo'] =
  self['webpackChunkdemo'] || [])
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
chunkLoadingGlobal.push = webpackJsonpCallback.bind(
  null,
  chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
)
```

### `__webpack_require__.l`

```js
// 创建 script 来加载 url
// 成功后会执行 done，并删除 script 标签
__webpack_require__.l = (url, done, key, chunkId) => {
  if (inProgress[url]) {
    inProgress[url].push(done)
    return
  }
  var script, needAttach
  if (key !== undefined) {
    var scripts = document.getElementsByTagName('script')
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i]
      if (
        s.getAttribute('src') == url ||
        s.getAttribute('data-webpack') == dataWebpackPrefix + key
      ) {
        script = s
        break
      }
    }
  }
  if (!script) {
    needAttach = true
    script = document.createElement('script')

    script.charset = 'utf-8'
    script.timeout = 120
    if (__webpack_require__.nc) {
      script.setAttribute('nonce', __webpack_require__.nc)
    }
    script.setAttribute('data-webpack', dataWebpackPrefix + key)
    script.src = url
  }
  inProgress[url] = [done]
  var onScriptComplete = (prev, event) => {
    // avoid mem leaks in IE.
    script.onerror = script.onload = null
    clearTimeout(timeout)
    var doneFns = inProgress[url]
    delete inProgress[url]
    script.parentNode && script.parentNode.removeChild(script)
    doneFns && doneFns.forEach((fn) => fn(event))
    if (prev) return prev(event)
  }
  var timeout = setTimeout(
    onScriptComplete.bind(null, undefined, {
      type: 'timeout',
      target: script,
    }),
    120000,
  )
  script.onerror = onScriptComplete.bind(null, script.onerror)
  script.onload = onScriptComplete.bind(null, script.onload)
  needAttach && document.head.appendChild(script)
}
```

### `__webpack_require__.e`

```js
// 理解为: 处理一个模块的一系列函数集合
// 这些函数在处理过程中都会产生一些 promise
__webpack_require__.f = {}

// 等待 __webpack_require__.f 上的所有处理函数产生的所有 promises
__webpack_require__.e = (chunkId) => {
  return Promise.all(
    Object.keys(__webpack_require__.f).reduce((promises, key) => {
      __webpack_require__.f[key](chunkId, promises)
      return promises
    }, []),
  )
}

// 这是 __webpack_require__.f 其中一个处理函数
// 作用: 执行 __webpack_require__.l 来加载模块
// 注意: onload 是在模块加载并执行完之后才会执行
__webpack_require__.f.j = (chunkId, promises) => {
  // JSONP chunk loading for javascript
  var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
    ? installedChunks[chunkId]
    : undefined
  if (installedChunkData !== 0) {
    // 0 means "already installed".

    // a Promise means "currently loading".
    if (installedChunkData) {
      promises.push(installedChunkData[2])
    } else {
      if (true) {
        // all chunks have JS
        // setup Promise in chunk cache
        var promise = new Promise(
          (resolve, reject) =>
            (installedChunkData = installedChunks[chunkId] = [resolve, reject]),
        )
        promises.push((installedChunkData[2] = promise))

        // start chunk loading
        var url = __webpack_require__.p + __webpack_require__.u(chunkId)
        // create error before stack unwound to get useful stacktrace later
        var error = new Error()
        var loadingEnded = (event) => {
          if (__webpack_require__.o(installedChunks, chunkId)) {
            installedChunkData = installedChunks[chunkId]
            if (installedChunkData !== 0) installedChunks[chunkId] = undefined
            if (installedChunkData) {
              var errorType =
                event && (event.type === 'load' ? 'missing' : event.type)
              var realSrc = event && event.target && event.target.src
              error.message =
                'Loading chunk ' +
                chunkId +
                ' failed.\n(' +
                errorType +
                ': ' +
                realSrc +
                ')'
              error.name = 'ChunkLoadError'
              error.type = errorType
              error.request = realSrc
              installedChunkData[1](error)
            }
          }
        }
        __webpack_require__.l(url, loadingEnded, 'chunk-' + chunkId, chunkId)
      } else installedChunks[chunkId] = 0
    }
  }
}
```

### index.js

```js
__webpack_require__
  // 加载 src_es_js 文件
  .e('src_es_js')
  // 加载 src_es_js 内容
  .then(__webpack_require__.bind(__webpack_require__, './src/es.js'))
  // 执行
  .then((val) => console.log(val))
```

### src_es_js

```js
'use strict'
;(self['webpackChunkdemo'] = self['webpackChunkdemo'] || []).push([
  ['src_es_js'],
  {
    './src/es.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      // 标记为 ESModule
      __webpack_require__.r(__webpack_exports__)
      // 导出变量的 getter
      __webpack_require__.d(__webpack_exports__, {
        age: () => age,
        default: () => __WEBPACK_DEFAULT_EXPORT__,
        name: () => name,
      })
      const age = 18
      const name = '小明'
      const __WEBPACK_DEFAULT_EXPORT__ = 'ESModule'
    },
  },
])
```
