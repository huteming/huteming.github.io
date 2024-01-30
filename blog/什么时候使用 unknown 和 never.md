---
tags: [ts]
image: https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/bd5a56ec3630c1b5dd1b2a9e1fbdef0e?_a=AQAEufR
---

**unknown 是所有可能值的集合**。任何值都可以分配给 unknown 类型的变量。这意味着 unknown 是所有其他类型的超类型。因此， unknown 被称为顶级类型

**never 是空集**。没有值可以分配给 never 类型的变量。事实上，将值类型解析为 never 是一个错误，因为这会产生矛盾。空集可以放入任何其他集合中，因此 never 是所有其他类型的子类型。这就是为什么 never 被称为底部类型

![unknown+never](/img/blog/unknown+never.avif)

对于任何类型的 T

```ts
T | never ⇒ T
T & unknown ⇒ T
```

## never 类型

利用值类型解析为 never 是一个错误，可以用来裁剪或者说缩小类型范围

<!-- prettier-ignore -->
```ts
// timeout 永远不会调用 resolve
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout elapsed')), ms))
}

async function fetchPriceWithTimeout(tickerSymbol: string): Promise<number> {
  const stock = await Promise.race([
    fetchStock(tickerSymbol), // returns `Promise<{ price: number }>`
    timeout(3000),
  ])
  return stock.price
}
```

Promise.race 签名的工作方式如下

```ts
function race<A, B>(inputs: [Promise<A>, Promise<B>]): Promise<A | B>
```

就上面这段代码，将 fetchStock 与 timeout 组合在一起，因此输入 Promise 解析类型为 `{ price: number } 和 never`，

输出的解析类型 stock 的类型应为 `{ price: number } | never` 。

因为 never 是联合的标识，所以该类型简化为 `{ price: number }`

如果我们使用 any ，我们就会失去类型检查的好处，因为 ` { price: number } | any` 相当于 any

如果我们使用 unknown ，那么 stock 的类型将是 `{ price: number } | unknown` ，它简化为 unknown

**使用 never 来修剪不需要的情况**

```ts
// 它从联合类型中删除了 null 和 undefined
type NonNullable<T> = T extends null | undefined ? never : T
```

## unknown 类型

任何值都可以分配给 unknown 类型的变量。因此，当值可能具有任何类型，或者不方便使用更具体的类型时，请使用 unknown

```ts
function prettyPrint(x: unknown): string {
  if (Array.isArray(x)) {
    return '[' + x.map(prettyPrint).join(', ') + ']'
  }
  if (typeof x === 'string') {
    return `"${x}"`
  }
  if (typeof x === 'number') {
    return String(x)
  }
  return 'etc.'
}
```

在 TypeScript 3.0 之前，编写 prettyPrint 的最佳方法是使用 any 作为 x 的类型。类型缩小对 any 的作用与对 unknown 的作用基本相同；

但是，如果我们犯了一个错误，**有时候认为类型已经缩小，但实际上并没有缩小**，那么使用 unknown 可以拯救我们：

```ts
function prettyPrint(x: any): string {
  if (isArray(x)) {
    // whoops - this `isArray` is not a type guard!
    return '[' + x.mop(prettyPrint).join(', ') + ']'
  }
  /* snip */
  return 'etc.'
}
```

因为 isArray 不是类型保护，并且我们使用 any 作为 x 的类型，所以 x 的类型仍然是 any 在 if 正文中。因此，编译器不会捕获此版本 prettyPrint 中的拼写错误。如果 x 的类型是 unknown ，我们会得到这个错误： `Object is of type ‘unknown’.`

## 参考

[When to use never and unknown in TypeScript](https://blog.logrocket.com/when-to-use-never-unknown-typescript/)
