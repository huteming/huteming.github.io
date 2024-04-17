---
sidebar_position: 2
---

实现一个泛型 PartialByKeys\<T, K\> ，它采用两个类型参数 T 和 K .

K 指定应设置为可选的 T 属性集。如果 K 未提供，则应使所有属性都像普通 Partial\<T\> 属性一样可选。

例子

```ts
interface User {
  name: string
  age: number
  address: string
}

/**
 * Expect: { name?:string; age:number; address:string }
 */
type UserPartialName = PartialByKeys<User, 'name'>
```

实现

```ts
type Prettify<T> = {
  [Property in keyof T]: T[Property]
}

type PartialByKeys<T, K extends keyof T = keyof T> = Prettify<
  {
    [Property in K]?: T[Property]
  } & {
    [Property in Exclude<keyof T, K>]: T[Property]
  }
>
```
