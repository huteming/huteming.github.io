import { RuleName } from './enums'

export type Values = Record<string, any>

export type Rules = (RuleRequired | RuleRegExp | RuleStartsWith)[]

export interface AsyncRuleConfig {
  [key: string]: Rules
}

export interface Validate<T extends Rule> {
  (key: string, values: Values, rule: T): string | null
}

// 单个规则
export interface Rule {
  name: RuleName // 规则名称, 也用于区分要使用的校验方法
  /**
   * 单个规则的前置条件, 满足时才会进行该条规则校验
   * 目前配置在 json 中, 暂时以字符串形式
   * (values: Values) => boolean
   */
  before?: string
  message: string // 错误提示
}

export interface RuleRequired extends Rule {
  name: RuleName.Required
  required: boolean
}

export interface RuleLength extends Rule {
  name: RuleName.Length
  /**
   * 长度校验包括相等
   */
  min?: number
  max?: number
}

export interface RuleRegExp extends Rule {
  name: RuleName.RegExp
  reg: string
  flags?: string
  /**
   * 默认是将正则 test 返回的 true 视为正确
   * 这个值为 true 时，则在 test 返回 true 时当作异常
   */
  errorWhenTested?: boolean
  /**
   * 默认使用正则的 test
   * 这个值为 true 时，则使用正则的 match
   */
  useMatch?: boolean
}

export interface RuleStartsWith extends Rule {
  name: RuleName.StartsWith
  searchString: string
}
