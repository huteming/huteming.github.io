```ts monaco
/**
 * Expect: { isReadonly: boolean; isEnable: boolean; }
 */
type OnlyBoolean = PickByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
>

// 实现
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] }
```
