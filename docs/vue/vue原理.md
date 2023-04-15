Vue 主要通过以下 4 个大类来实现数据双向绑定的：

-   **Observer**: 对数据对象进行递归遍历，利用 Object.defineProperty() 配置属性的 setter 和 getter。在 getter 的时候**收集依赖**，在 setter 的时候**派发更新**

-   **Compile**: 解析 Vue 模板指令，将模板中的变量都替换成数据，并将每个指令对应的节点绑定更新函数，当数据有变动，会调用更新函数进行数据更新。

-   **Watcher**: Watcher 是 Observer 和 Compile 之间通信的桥梁，主要的任务是作为订阅者，在 Observer 中 getter 的时候被收集保存，当属性更新，派发更新时，调用 Watcher 上的 update 方法进行更新，而 update 实际上就是 Compiler 中绑定的更新函数。

-   **Dep**: Vue 中实现**发布-订阅**模式的类，订阅者是 Watcher，在属性更新的 setter 中派发更新。

## 代码

### index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Vue</title>
    </head>
    <body>
        <div id="app">
            <h1>大括号</h1>
            {{ msg }}

            <h1>v-text</h1>
            <h3 v-text="msg"></h3>
            <br />

            <h1>v-model</h1>
            <input type="text" v-model="msg" />
            <br />
        </div>

        <script src="./index.js" type="module"></script>
    </body>
</html>
```

### index.js

```js
import Vue from './vue.js'

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello World',
    },
    methods: {
        test() {
            alert('hello world')
        },
    },
})

console.log(vm)
```

### vue.js

```js
import Observer from './observer.js'
import Compiler from './compiler.js'

/**
 * 包括 vue 构造函数，接受各种配置参数
 */
export default class Vue {
    constructor(options = {}) {
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods

        this.initRootElement(options)
        // vue 里可以通过 this 来获取 data 里的属性
        this.proxyData(this.$data)

        new Observer(this)
        new Compiler(this)
    }

    initRootElement(options) {
        this.$el = document.querySelector(options.el)
    }

    proxyData(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                },
            })
        })
    }
}
```

### compiler.js

```js
import Watcher from './watcher.js'

export default class Compiler {
    constructor(vm) {
        this.vm = vm

        this.run()
    }

    run() {
        const nodes = this.vm.$el.childNodes
        Array.from(nodes).forEach((node) => {
            // {{ msg }}
            if (this.isTextNode(node)) {
                this.compileTextNode(node)
                return
            }
            // <div v-text="msg" v-model="msg" v-on:click="handler"></div>
            if (this.isElementNode(node)) {
                Array.from(node.attributes).forEach((attr) => {
                    const attrName = attr.name // v-text
                    const attrValue = attr.value // msg
                    if (!this.isDirective(attrName)) {
                        return
                    }
                    const subIndex = attrName.includes('on') ? 5 : 2
                    const directiveName = attrName.substring(subIndex)

                    if (directiveName === 'text') {
                        node.textContent = this.vm[attrValue]
                        new Watcher(this.vm, attrValue, (newValue) => {
                            node.textContent = newValue
                        })
                    }

                    if (directiveName === 'model') {
                        node.value = this.vm[attrValue]
                        new Watcher(this.vm, attrValue, (newValue) => {
                            node.value = newValue
                        })
                        node.addEventListener('input', (eve) => {
                            this.vm.$data[attrValue] = eve.target.value
                        })
                    }
                })
            }
        })
    }

    /**
     * 解析文本节点
     * 例如: {{ msg }}
     */
    compileTextNode(node) {
        const reg = /\{\{(.*)\}\}/
        const templateContent = node.textContent

        if (reg.test(templateContent)) {
            const key = RegExp.$1.trim()
            node.textContent = templateContent.replace(reg, this.vm[key])
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = templateContent.replace(reg, newValue)
            })
        }
    }

    isDirective(str) {
        return str.includes('v-')
    }

    isTextNode(node) {
        return node.nodeType === 3
    }

    isElementNode(node) {
        return node.nodeType === 1
    }
}
```

### watcher.js

```js
import Dep from './dep.js'

export default class Watcher {
    constructor(obj, key, updateFn) {
        this.obj = obj
        this.key = key
        this.updateFn = updateFn

        Dep.target = this
        this.oldValue = obj[key]
        Dep.target = null
    }

    update() {
        const newValue = this.obj[this.key]
        this.updateFn?.(newValue)
    }
}
```

### observer.js

```js
import Dep from './dep.js'

export default class Observer {
    constructor(vm) {
        this.vm = vm

        this.run(vm.$data)
    }

    run(obj) {
        if (!obj || typeof obj !== 'object') {
            return
        }
        Object.keys(obj).forEach((key) => {
            this.defineReactive(obj, key, obj[key])
        })
    }

    defineReactive(obj, key, value) {
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if (newValue === value) {
                    return
                }
                value = newValue
                dep.notify()
            },
        })
    }
}
```

### dep.js

```js
/**
 * 发布订阅的模式
 * 存储所有的观察者，watcher
 */
export default class Dep {
    constructor() {
        this.subs = []
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach((watcher) => {
            watcher.update()
        })
    }
}
```

## 参考

-   [vue 实现](https://www.bilibili.com/video/BV1Lo4y1277S/?vd_source=3818b14f34b24040d5a5cf9e48ac8261)
