qiankun 框架为了实现 js 隔离，提供了三种不同场景使用的沙箱，分别是 snapshotSandbox、proxySandbox、legacySandbox。

## SnapshotSandbox(快照沙箱)

可以理解快照就是给你着一张相片，来记录你此刻的状态。qiankun 的快照沙箱是基于 diff 来实现的，主要用于不支持 window.Proxy 的低版本浏览器，而且也只适应单个的子应用。

### 1.1 过程

- 激活时

1. 通过属性复制的方式为当前的 window 创建一份快照。
2. 判断是否有上次变更属性，如果有，同样通过复制的方式将修改值还原到 window 上。

- 退出时

1. 通过属性遍历的方式对比 window 和上次的快照对象，将修改值记录下来，便于下次激活时还原。
2. 然后将快照信息还原到 window 上

![快照沙箱](/img/doc/microapp/snapshotSandbox.png)

### 1.2 源码

```ts
function iter(obj: typeof window, callbackFn: (prop: any) => void) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) || prop === 'clearInterval') {
      callbackFn(prop)
    }
  }
}

class SnapshotSandbox implements SandBox {
  constructor(name: string) {
    this.name = name
    this.proxy = window
    this.type = SandBoxType.Snapshot
  }

  active() {
    // 记录当前快照
    this.windowSnapshot = {} as Window
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop]
    })

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p: any) => {
      window[p] = this.modifyPropsMap[p]
    })

    this.sandboxRunning = true
  }

  inactive() {
    this.modifyPropsMap = {}

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop]
        window[prop] = this.windowSnapshot[prop]
      }
    })

    this.sandboxRunning = false
  }
}
```

### 1.3 优劣

可以支持不兼容 Proxy 的浏览器，但是 snapshotSandbox 还是会污染全局 window

## LegacySandbox(单例模式)

### 2.1 过程

- 初始化时

1. 创建一个空对象，用于代理对 window 的操作，拦截 get 和 set
2. 在 get 时，返回原生 window 上的属性
3. 在 set 时，需要记录这个时是新增还是修改，但最终还是赋值到原生的 window 上

- 激活时

1. 如果有上次的更新记录，把这些值重新还原到 window 上。
2. 注意这里相对于快照沙箱，**没有创建快照的过程**，因为不需要。记录快照，是为了还原，但这里所有的新增或者修改都已经通过 Proxy 做了记录了。

- 退出时

1. 根据更新记录，还原 window 上的值为原始值。
2. 相对于快照沙箱，**没有记录 diff 值的过程**，因为在 Proxy 拦截的时候已经记录了。

### 2.2 源码

```ts
class LegacySandbox implements SandBox {
  /** 沙箱期间新增的全局变量 */
  private addedPropsMapInSandbox = new Map<PropertyKey, any>()
  /** 沙箱期间更新的全局变量 */
  private modifiedPropsOriginalValueMapInSandbox = new Map<PropertyKey, any>()
  /** 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
  private currentUpdatedPropsValueMap = new Map<PropertyKey, any>()

  active() {
    if (!this.sandboxRunning) {
      this.currentUpdatedPropsValueMap.forEach((v, p) =>
        this.setWindowProp(p, v),
      )
    }

    this.sandboxRunning = true
  }

  inactive() {
    // renderSandboxSnapshot = snapshot(currentUpdatedPropsValueMapForSnapshot);
    // restore global props to initial snapshot
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) =>
      this.setWindowProp(p, v),
    )
    this.addedPropsMapInSandbox.forEach((_, p) =>
      this.setWindowProp(p, undefined, true),
    )

    this.sandboxRunning = false
  }

  constructor(name: string, globalContext = window) {
    this.name = name
    this.globalContext = globalContext
    this.type = SandBoxType.LegacyProxy
    const {
      addedPropsMapInSandbox,
      modifiedPropsOriginalValueMapInSandbox,
      currentUpdatedPropsValueMap,
    } = this

    const rawWindow = globalContext
    const fakeWindow = Object.create(null) as Window

    const setTrap = (
      p: PropertyKey,
      value: any,
      originalValue: any,
      sync2Window = true,
    ) => {
      if (this.sandboxRunning) {
        if (!rawWindow.hasOwnProperty(p)) {
          addedPropsMapInSandbox.set(p, value)
        } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
          // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
          modifiedPropsOriginalValueMapInSandbox.set(p, originalValue)
        }

        currentUpdatedPropsValueMap.set(p, value)

        return true
      }
      // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
      return true
    }

    const proxy = new Proxy(fakeWindow, {
      set: (_: Window, p: PropertyKey, value: any): boolean => {
        const originalValue = (rawWindow as any)[p]
        return setTrap(p, value, originalValue, true)
      },

      get(_: Window, p: PropertyKey): any {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        // or use window.top to check if an iframe context
        // see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13
        if (p === 'top' || p === 'parent' || p === 'window' || p === 'self') {
          return proxy
        }

        const value = (rawWindow as any)[p]
        return getTargetValue(rawWindow, value)
      },
    })

    this.proxy = proxy
  }
}
```

### 2.3 优劣

同样会对 window 造成污染，但是性能比快照沙箱好，不用遍历 window 对象。

## ProxySandbox(多例模式)

### 3.1 过程

- 初始化

1. 复制 window 上不可配置的属性（`!descriptor?.configurable`）生成一个 fakeWindow 对象
2. 代理 fakeWindow，拦截 get 和 set
3. get 时，如果在 fakeWindow 上，直接返回，否则从 window 上查找
4. set 时，直接保存在 fakeWindow 上。

- 激活，退出

1. 因为是多例模式，这里就不再需要创建快照或者保存更新属性了

### 3.2 源码(相似的 demo，非真实源码)

```js
class ProxySandbox {
  active() {
    this.sandboxRunning = true
  }
  inactive() {
    this.sandboxRunning = false
  }
  constructor() {
    const rawWindow = window
    const fakeWindow = {}
    const proxy = new Proxy(fakeWindow, {
      set: (target, prop, value) => {
        if (this.sandboxRunning) {
          target[prop] = value
          return true
        }
      },
      get: (target, prop) => {
        // 如果fakeWindow里面有，就从fakeWindow里面取，否则，就从外部的window里面取
        let value = prop in target ? target[prop] : rawWindow[prop]
        return value
      },
    })
    this.proxy = proxy
  }
}
```

### 3.3 优劣

不会污染全局 window，支持多个子应用同时加载

## 参考

- [qiankun 运行时沙箱源码解析](https://mdnice.com/writing/59a55e6d76264290a07322d472ec8478)
- [微前端连载](https://juejin.cn/post/6846687602439897101#heading-22)
