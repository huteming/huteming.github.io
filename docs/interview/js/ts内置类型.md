## Partial

接口属性变为可选

## Required

与 `Partial` 相反。接口属性变为必须的。

## Pick

从接口中选择一些属性，得到一个新的接口

```js
type NewPerson = Pick<Person, 'name'> // { name: string; }
```

## Omit

与 `Pick` 相反。从接口中剔除一些属性，得到新的接口
