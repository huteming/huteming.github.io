---
title: webpack 基本原理
summary: BFC的解释和应用
date: 2021-03-22
---

---

## 模块化系统

前端产品的交付是基于浏览器，这些资源是通过增量加载的方式运行到浏览器端，如何在开发环境组织好这些碎片化的代码和资源，并且保证他们在浏览器端快速、优雅的加载和更新，就需要一个模块化系统。

::: tip 如何更好的在浏览器环境组织资源?
若是每个文件都单独请求，会导致请求次数过多，导致启动速度过慢。若是全部打包在一块只请求一次，会导致流量浪费，初始化过程慢。因此**最佳方案是分块传输，按需进行懒加载，在实际用到某些模块的时候再增量更新。**
:::

**模块系统主要解决模块的定义、依赖和导出**。 原始的`<script>`标签加载方式有一些常见的弊端：例如全局作用域下容易造成变量冲突；文件只能按照`<script>`的书写顺序进行加载；开发人员必须主观解决模块和代码库的依赖关系等。

## 模块化方案

### CommonJs

- 优点：服务器端模块便于重用。

- 缺点：同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的。

### AMD

依赖前置。

- 优点：适合在浏览器环境异步加载；

- 缺点：阅读和书写比较困难。

### CMD

依赖就近，延迟执行。

- 优点：很容易在 node 中运行；

- 缺点：依赖 spm 打包，模块的加载逻辑偏重。

### ES6 模块

尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

- 优点：容易进行静态分析；

- 缺点：原生浏览器未实现该标准。

## 模块打包器

Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

## Webpack 构建流程概括

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

### 初始化

启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

### 编译构建

从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。

1. 确定入口：根据配置中的 entry 找出所有的入口文件；

2. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

3. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

### 输出

对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

1. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

2. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## Webpack 4.46.0 结果

无论开发使用的是 `CommonJS` 规范还是 `ES6` 模块规范，打包后的文件都是统一使用 `Webpack` 自定义的规范来管理、加载模块。

### CommonJS 规范

打包后的代码其实就是一个立即执行函数，传入的参数是一个对象，这个对象以文件路径为 key，以文件内容为 value，它包含了所有打包后的模块

```js
{
  "./src/hello.js": function (module, exports) {
    eval(
      'module.exports = () => {\n  console.log("hello world");\n};\n\n\n//# sourceURL=webpack:///./src/hello.js?'
    );
  },
  "./src/index.js": function (module, exports, __webpack_require__) {
    eval(
      'const hello = __webpack_require__(/*! ./hello */ "./src/hello.js");\n\n// import("./async").then((str) => {\n//   console.log("加载异步文件", str);\n//   hello();\n// });\n\nhello();\n\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  },
}
```

这个立即函数简化下，相当于

```js
(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {}

  // ...这里有一些其他代码

  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
});
```

这个立即函数做了什么

1. 定义了一个模块缓存对象 `installedModules`，作用是缓存已经加载过的模块

2. 定义一个模块加载函数 `__webpack_require__`

3. 使用 `__webpack_require__` 加载入口模块

这里最核心的就是 `__webpack_require__` 函数，它接收的参数是 moduleId，其实就是文件路径。它的执行过程是这样的：

1. 判断模块是否有缓存，如果有，则返回该模块的 exports 对象，即 module.exports

2. 新建一个模块 module，并放入缓存

3. 执行文件路径对应的模块函数

4. 将这个新建的模块标识为已加载

5. 执行完模块后，返回该模块的 exports 对象

```js
function __webpack_require__(moduleId) {
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
  });

  modules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  );

  module.l = true;

  return module.exports;
}
```

可以看到，在执行模块函数时传入了三个参数，分别是 `module`、`module.exports`、`__webpack_require__`，这三个的作用分别对应 CommonJS 中的 `module`、`module.exports`、`require`

接下来看下入口模块的内容，下面是 eval 函数内容美化后的

```js
function (module, exports, __webpack_require__) {
  const hello = __webpack_require__("./src/hello.js");
  hello()
}
```

可以看到，打包后的模块代码和原模块代码仅仅只有一个地方发生了变化，那就是 `require` 变成了 `__webpack_require__`。

稍微总结一下，`__webpack_require__` 加载模块后，会先执行对应的函数，然后返回该模块的 `module.exports` 对象，然后在依赖这个模块的地方，能通过 `__webpack_require__` 函数导入，进而继续使用。可以发现，webpack 自定义的模块规范完美适配 CommonJS 规范。

### ES6 module

使用 ES6 module 规范打包后的代码和使用 CommonJS 规范打包后的代码绝大部分是一样的。

**一样的地方是指 Webpack 自定义模块规范的代码，不同的是两个文件打包后的代码。**

先把两个文件打包后的 eval 中的代码美化下

```js
function index(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    "./src/hello.js"
  );
  Object(_hello__WEBPACK_IMPORTED_MODULE_0__["default"])();
}
```

```js
function hello(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  // 给 __webpack_exports__ 对象添加 default 属性
  // 有些地方是用 __webpack_require__.d 方法赋值，作用是一样的
  __webpack_exports__["default"] = () => {
    console.log("hello world");
  };
}
```

这里有几点需要注意的，

- 模块函数的第二个参数变成了 `__webpack_exports__`，这个在 CommonJs 规范对应的是 exports

- 模块函数的开头都执行了一个 `__webpack_require__.r` 函数

先说说 `__webpack_require__.r`

```js
__webpack_require__.r = function(exports) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  }
  Object.defineProperty(exports, "__esModule", { value: true });
};
```

它的作用就是给 `__webpack_exports__` 添加一个 `__esModule` 为 true 的属性，表示这个一个 ES module

#### \_\_esModule 的作用

这个主要是为了处理混合使用 ES6 module 和 CommonJS 的情况。

例如导出使用 CommonJS 的 `module.exports`，而导入使用 ES6 module 的 `import`

先看打包后的代码

```js
function index(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    "./src/hello.js"
  );
  var _hello__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
    _hello__WEBPACK_IMPORTED_MODULE_0__
  );
  _hello__WEBPACK_IMPORTED_MODULE_0___default()();
}
```

```js
function hello(module, exports) {
  module.exports = () => {
    console.log("hello world");
  };
}
```

```js
__webpack_require__.n = function(module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module["default"];
        }
      : function getModuleExports() {
          return module;
        };
  __webpack_require__.d(getter, "a", getter);
  return getter;
};
```

分析下处理逻辑

1. 将 `__webpack_exports__` 导出对象标识为 ES6 module。

2. 加载依赖模块，并将模块的导出对象作为参数传入 `__webpack_require__.n` 函数

3. `__webpack_require__.n` 分析该 `export` 对象是否为 `ES6 module`，如果是，则返回 `module['default']`，如果不是，则直接返回 `export`

::: tip 提醒
这里分析的是使用 `module.exports` 导出，使用 `import` 导入，webpack 会自动处理。但如果是反过来，使用 `export` 导出，使用 `require` 导入，则必须手动读取 `default` 属性，
:::

### 按需加载

在 webpack 中可以使用 `import` 和 `require.ensure` 来引入需要动态导入的模块，示例代码如下

```js
// index.js
import("./hello.js").then((hello) => {
  hello.default();
  hello.test();
});

// hello.js
export default () => {
  console.log("hello world");
};

export const test = () => {
  console.log("test");
};
```

动态加载的模块，在打包时会被单独打包成一个文件，而不是和 index.js 一起打包到 bundle.js。

先上这个时候打包生成的文件内容（摘要）

```js
// 立即执行函数
(function(modules) {
  function webpackJsonpCallback(data) {}

  var installedModules = {};

  var installedChunks = {
    main: 0,
  };

  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + chunkId + ".main.js";
  }

  function __webpack_require__(moduleId) {}

  __webpack_require__.e = function requireEnsure(chunkId) {};

  var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;

  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})();
```

大概分析下打包时和同步加载的 webpack 模块规范有哪些不同

1. 定义了一个对象 `installedChunks`，作用是缓存动态模块

2. 定义一个辅助函数 `jsonpScriptSrc`，作用是根据模块 ID 生成 URL

3. 定义了两个核心函数 `__webpack_require__.e` 和 `webpackJsonpCallback`

4. 定义了一个全局变量 `window["webpackJsonp"]`，作用是存储需要动态导入的模块

5. 重写 `window["webpackJsonp"]` 的 `push` 方法为 `webpackJsonpCallback`

然后看下入口模块的代码

```js
// index.js
function index(module, exports, __webpack_require__) {
  __webpack_require__
    .e(0)
    .then(__webpack_require__.bind(null, "./src/hello.js"))
    .then((hello) => {
      hello.default();
      hello.test();
    });
}
```

原来模块代码中的 `import()` 被编译成了 `__webpack_require__.e(0).then()`

#### **webpack_require**.e

```js
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];

  // JSONP chunk loading for javascript

  var installedChunkData = installedChunks[chunkId];
  if (installedChunkData !== 0) {
    // 0 means "already installed".

    // a Promise means "currently loading".
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // setup Promise in chunk cache
      var promise = new Promise(function(resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      promises.push((installedChunkData[2] = promise));

      // start chunk loading
      var script = document.createElement("script");
      var onScriptComplete;

      script.charset = "utf-8";
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute("nonce", __webpack_require__.nc);
      }
      script.src = jsonpScriptSrc(chunkId);

      // create error before stack unwound to get useful stacktrace later
      var error = new Error();
      onScriptComplete = function(event) {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            var errorType =
              event && (event.type === "load" ? "missing" : event.type);
            var realSrc = event && event.target && event.target.src;
            error.message =
              "Loading chunk " +
              chunkId +
              " failed.\n(" +
              errorType +
              ": " +
              realSrc +
              ")";
            error.name = "ChunkLoadError";
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      };
      var timeout = setTimeout(function() {
        onScriptComplete({ type: "timeout", target: script });
      }, 120000);
      script.onerror = script.onload = onScriptComplete;
      document.head.appendChild(script);
    }
  }
  return Promise.all(promises);
};
```

白话文翻译下它的处理逻辑

1. 先查看该模块 ID 对应的缓存是否为 0，0 代表已经加载成功了，第一次取值为 undefined

2. 如果不为 0，并且不是 undefined 代表已经是加载中的状态，然后将这个加载中的 Promise 推入 promises 数组

3. 如果不为 0，并且是 undefined，就新建一个 Promise，用于加载需要动态导入的模块。

4. 生成一个 script 标签，URL 使用 `jsonpScriptSrc` 生成，即需要动态导入的模块的 URL。

5. 为这个 script 标签设置一个 2 分钟的超时时间

6. 添加到页面，开始加载模块

7. 返回 promises 数组

最后再看下 `hello.js` 生成的文件

```js
// hello.js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [0],
  {
    "./src/hello.js": function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, "test", function() {
        return test;
      });
      __webpack_exports__["default"] = () => {
        console.log("hello world");
      };
      const test = () => {
        console.log("test");
      };
    },
  },
]);
```

可以看到，加载动态模块，自动执行入口文件中 `window["webpackJsonp"]` 的 `push` 方法，也就是执行 `webpackJsonpCallback` 方法，放入动态模块，这样就把动态模块和主流程关联起来了。

这里参数有两个，第一个是 [0]，它是模块的 ID，第二个是模块路径名和模块内容

#### webpackJsonpCallback

```js
function webpackJsonpCallback(data) {
  var chunkIds = data[0];
  var moreModules = data[1];

  // add "moreModules" to the modules object,
  // then flag all "chunkIds" as loaded and fire callback
  var moduleId,
    chunkId,
    i = 0,
    resolves = [];
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (
      Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      resolves.push(installedChunks[chunkId][0]);
    }
    installedChunks[chunkId] = 0;
  }
  for (moduleId in moreModules) {
    if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      modules[moduleId] = moreModules[moduleId];
    }
  }
  if (parentJsonpFunction) parentJsonpFunction(data);

  while (resolves.length) {
    resolves.shift()();
  }
}
```

同样也是白话文翻译下流程

1. 执行对应模块的 resolve 方法，同时将缓存对象中的值置为 0，标识已经加载完成了

2. 执行模块方法，将模块内容添加到 `modules` 中，

3. 将模块添加到 `window["webpackJsonp"]` 中。

#### 动态导入逻辑总结

1. 重写 `window["webpackJsonp"]` 方法

2. 入口模块使用 `__webpack_require__.e` 下载动态资源

3. 资源下载完成后执行 `window["webpackJsonp"].push`，即 `webpackJsonpCallback`

4. 下载完成后调用 `__webpack_require__` 真正开始加载代码
