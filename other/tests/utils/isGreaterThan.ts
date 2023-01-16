function warn(...args: any[]) {}

function isString(val: any): val is string {
  return typeof val === 'string'
}

function isNumber(val: any): val is number {
  return typeof val === 'number'
}

function isDefined<T>(val: null | undefined | T): val is T {
  return val !== null && val !== undefined
}

function toNumberForCompare(val: any): number | null {
  if (!isDefined(val)) {
    return null
  }
  if (isNumber(val)) {
    return val
  }
  if (!isString(val)) {
    return NaN
  }
  val = val.trim()
  // 空字符串
  if (!val) {
    return null
  }
  return Number(val)
}

/**
 * 判断 a 是否大于 b。
 * null, undefined, 空字符串  =>  通过
 * 数字                      =>  正常判断
 * 非空字符串                 =>  转换为数字判断
 * 其他                      =>  失败
 * 备注: NaN 比对时永远为 false
 */
export default function isGreaterThan(a: any, b: any): boolean {
  const num1 = toNumberForCompare(a)
  const num2 = toNumberForCompare(b)
  if (num1 === null || num2 === null) {
    return true
  }
  if (isNaN(num1)) {
    warn(`${a} 不是数字`)
  }
  if (isNaN(num2)) {
    warn(`${b} 不是数字`)
  }
  return num1 > num2
}
