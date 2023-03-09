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
