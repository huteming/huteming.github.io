import memoize from './memoize'

function isNotDefined(val: any): boolean {
  return val === null || val === undefined
}

function defaultTo(defaultVal: any) {
  return (val: any) => {
    if (isNotDefined(val) || Number.isNaN(val)) {
      return defaultVal
    }
    return val
  }
}

function matchOption<T extends Object>(
  options: T[],
  value: any,
  valueKey: keyof T,
  returnKey: keyof T,
  defaultValue: any = value,
) {
  const matched = options?.find((o) => o[valueKey] === value)
  return defaultTo(defaultValue)(matched?.[returnKey])
}

/**
 * 缓存的 key 该怎么计算？
 * https://github.com/ramda/ramda/issues/1384#issuecomment-220621188
 */
const pickOptionValue = memoize(matchOption)

export default pickOptionValue
