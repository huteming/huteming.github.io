export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}

export function isInvalidValue(val: any): boolean {
  return val === null || val === undefined || val === ''
}

export function getValueType(val: any): string | undefined {
  const reg = /\[object (\w*)\]/
  const str = Object.prototype.toString.call(val)
  return str.match(reg)?.[1]
}

export function warn(...args: any[]) {
  console.warn('[异步规则校验]: ', ...args)
}

export function replace(mark: string, str: string, data: string[]) {
  const reg = new RegExp(`\\${mark}([\\${mark}\\d])`, 'g')
  return str.replace(reg, (matchStr, p1) => {
    const defaultStr = matchStr

    if (p1 === mark) {
      return data.length ? data.join('') : defaultStr
    }
    return data[p1] || defaultStr
  })
}
