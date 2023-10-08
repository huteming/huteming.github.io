[MDN 详细介绍](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## 不能使用裸露的模块说明符

```js
// Bad: 这样是错误的写法，不支持的
import { name as squareNameOne } from 'shapes'
import { name as squareNameTwo } from 'shapes/square'

// Good: 应该这样子
import { name as squareName, draw } from './shapes/square.js'
import { name as squareName, draw } from '/shapes/square.js'
import { name as circleName } from 'https://example.com/shapes/circle.js'
```

默认情况下不支持，但是可以通过定义 **导入映射** 来实现。[查看详细文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps)

## 总是 CORS 跨域

## 默认 Defer 行为

## 模块只会执行一次

## 限定作用域

模块功能被导入到单个脚本的范围内, **它们在全局范围内不可用**。

因此，您只能在导入的脚本中访问导入的功能，而无法从 JavaScript 控制台访问它们。
