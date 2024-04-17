---
sidebar_position: 3
---

TS 内置关键字中有一个 keyof，实现一个类似的 ValueOf

实现

```ts
type ValueOf<T> = T[keyof T]
```

## 来源

- [stackoverflow](https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript)
