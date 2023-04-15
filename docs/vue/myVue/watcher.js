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
