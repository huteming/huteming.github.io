/**
 * 依赖
 * 1. 表单值
 * 2. 表单之外的值
 */

import { AsyncRuleConfig, Rules, Values } from './types'
import { warn } from './utils'
import validateMap from './validates'

function validate(key: string, values: Values, rules: Rules): string | null {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    const { before, name } = rule

    // if (before && !before(values)) {
    if (before) {
      const beforeFn = new Function('values', before)
      if (!beforeFn(values)) {
        continue
      }
    }

    const handler = validateMap[name]
    if (!handler) {
      warn(`校验规则中, 字段 [${key}] 的校验方法 [${name}] 未找到.`)
      continue
    }

    const msg = handler(key, values, rule as any)
    /* istanbul ignore else */
    if (msg) {
      return msg
    }
  }
  return null
}

export default function createValidator(
  service:
    | (() => Promise<AsyncRuleConfig | null>)
    | (() => AsyncRuleConfig | null),
) {
  // 远程获取配置对象
  let asyncRuleConfig: AsyncRuleConfig | null = null

  // 支持 service 是 promise
  // 也支持从一个同步函数获取
  const setConfig = async () => {
    const maybePromise = service()

    if (maybePromise instanceof Promise) {
      const res = await maybePromise
      asyncRuleConfig = res
      return
    }
    asyncRuleConfig = maybePromise
  }

  setConfig()

  return (key: string, values: Values): string | null => {
    // 未配置属性规则
    if (!asyncRuleConfig) {
      warn(`远程属性接口未响应`)
      return null
    }
    if (!asyncRuleConfig[key]) {
      warn(`远程属性中, 未配置 [${key}] 的校验规则`)
      return null
    }
    return validate(key, values, asyncRuleConfig[key])
  }
}
