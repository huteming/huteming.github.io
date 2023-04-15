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
