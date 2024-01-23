---
tags: [js]
---

在做 [ts 类型练习](https://typehero.dev/explore)的时候，碰到需要比较两个类型是否相同，看到答案里有这么一种方法

<!-- prettier-ignore -->
```ts
export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;
```

这里的泛型 T 是什么意思？这段代码该怎么理解？

搜索到比较好的答案在[这里](https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript)，也顺便记录下自己看完后的理解

## 泛型 T 是什么意思？

**没有意思**！！这就是一个定义的泛型，只是我们平时用的比较多的是像这样

```ts
type Identity<T> = (data: T) => T
```

区别只是上面这段代码在执行时会自动根据传入的 data 类型推断 T 的类型，而 Equal 中的写法需要手动传入，默认是 `unknown`，没有任何特殊的含义

## 怎么理解这段代码

Equal 这段代码重点在于比较两个函数 `(<T>() => T extends X ? 1 : 2)` 和 `(<T>() => T extends Y ? 1 : 2)` 是否相同。

那么问题就变成 X 和 Y 是否相同。

如果 X 和 Y 相同，没什么好说的， extends 一定成立；如果不同时，那么我们总能找到一种类型，使得用它作为 T 时，extends 不成立。代码如下

```ts
declare let x: <T>() => T extends number ? 1 : 2
declare let y: <T>() => T extends string ? 1 : 2

const a = x<string>() // 2
const b = x<number>() // 1

const c = y<string>() // 1
const d = y<number>() // 2
```

```ts
declare let x: <T>() => T extends { foo: string; bar: number } ? 1 : 2
declare let y: <T>() => T extends { foo: string } ? 1 : 2

const a = x<{ foo: string }>() // 2
const b = y<{ foo: string }>() // 1
```

因此我们就可以用它来判断 X 和 Y 是否相同。

## 特殊情况

以上只是解释了 Equal 的基本原理，ts 内部实现可能要复杂的多，可能有时候为了性能或者什么原因，会出现一些和常规认识不一样的结果

### NativeEqual

```ts
type NaiveEquals<X, Y> = X extends Y ? (Y extends X ? true : false) : false

type A = NaiveEquals<{ a?: number }, {}> // true
type B = Equals<{ a?: number }, {}> // false
```

理论上 A 也应该是 false，因为类型 `{a: string}` 可分配给 {} ，但不能分配给 `{a?: number}`

### 联合类型

```ts
type A = Equals<{ x: 1 } & { y: 2 }, { x: 1; y: 2 }> // false
```

理论上这里 A 应该是 true，但结果却是 false，了解不了，但是事实。

## 总结

Equal 当作日常使用应该是没问题的，特殊情况我觉得完全可以当作补充知识去了解下。

再次说明，原文在[这里](https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript)。
