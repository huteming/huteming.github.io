```js
const toString = Object.prototype.toString
const isEnumerable = Object.prototype.propertyIsEnumerable

function isFunction(data) {
  return typeof data === 'function'
}

function isBigInt(data) {
  return typeof data === 'bigint'
}

function isDate(data) {
  return toString.call(data).includes('Date')
}

function isRegExp(data) {
  return toString.call(data).includes('RegExp')
}

function isMap(data) {
  return toString.call(data).includes('Map')
}

function isSet(data) {
  return toString.call(data).includes('Set')
}

function cloneArray(data) {
  return data.reduce((result, value) => {
    return result.concat(cloneDeep(value))
  }, [])
}

function getObjectKeys(data) {
  const keys = []
  // 包括原型链上的属性，但不包括 Symbol 属性
  for (const key in data) {
    keys.push(key)
  }
  // 需要递归从原型链上获取 Symbol 属性，注意判断 Symbol 是否可枚举
  while (data) {
    const symbols = Object.getOwnPropertySymbols(data).filter((s) =>
      isEnumerable.call(data, s),
    )
    keys.push(...symbols)
    data = Object.getPrototypeOf(data)
  }
  return keys
}

function cloneObject(data) {
  const result = {}
  const keys = getObjectKeys(data)
  keys.forEach((key) => {
    result[key] = cloneDeep(data[key])
  })
  return result
}

function cloneMap(data) {
  const result = new Map()
  data.forEach((val, key) => {
    result.set(key, cloneDeep(val))
  })
  return result
}

function cloneSet(data) {
  const set = new Set()
  data.forEach((val) => {
    set.add(cloneDeep(val))
  })
  return set
}

function saveAndReturn(stack, key, value) {
  stack.set(key, value)
  return value
}

// 1. 循环引用, 利用栈. 只需要保存引用类型(数组, 对象)
// 2. 原型对象. 只关注对象
// 3. object 中的 key 为 Symbol
export default function cloneDeep(data) {
  const stack = cloneDeep.stack
  if (stack.has(data)) {
    return stack.get(data)
  }
  // function
  if (isFunction(data)) {
    return {}
  }
  // bigint
  if (isBigInt(data)) {
    return BigInt(data)
  }
  // null, undefined, number, string, boolean, symbol
  if (typeof data !== 'object' || data === null) {
    return data
  }
  // date
  if (isDate(data)) {
    return new Date(data.valueOf())
  }
  // regexp
  if (isRegExp(data)) {
    const reg = new RegExp(data.source, data.flags)
    reg.lastIndex = data.lastIndex
    return reg
  }
  // array
  if (Array.isArray(data)) {
    return saveAndReturn(stack, data, cloneArray(data))
  }
  // map
  if (isMap(data)) {
    return saveAndReturn(stack, data, cloneMap(data))
  }
  // set
  if (isSet(data)) {
    return saveAndReturn(stack, data, cloneSet(data))
  }
  // object
  return saveAndReturn(stack, data, cloneObject(data))
}
cloneDeep.stack = new Map()
```
