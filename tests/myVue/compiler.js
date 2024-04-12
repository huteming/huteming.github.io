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
