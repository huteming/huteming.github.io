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
