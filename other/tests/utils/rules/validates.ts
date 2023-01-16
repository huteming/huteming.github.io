import { RuleName } from './enums'
import {
  RuleLength,
  RuleRegExp,
  RuleRequired,
  RuleStartsWith,
  Validate,
} from './types'
import {
  getValueType,
  isString,
  isInvalidValue,
  replace,
  warn,
  isNumber,
} from './utils'

interface ValidateMap {
  [RuleName.Required]: Validate<RuleRequired>
  [RuleName.RegExp]: Validate<RuleRegExp>
  [RuleName.StartsWith]: Validate<RuleStartsWith>
  [RuleName.Length]: Validate<RuleLength>
}

const validateMap: ValidateMap = {
  [RuleName.Length]: (key, values, rule) => {
    const val = values[key]
    const { name, message, min, max } = rule

    if (isInvalidValue(val)) {
      return null
    }

    if (!isString(val)) {
      warn(
        `字段 ${key} 的值类型期望为 string, 实际为 ${getValueType(
          val,
        )}, 无法进行 "${name}" 校验.`,
      )
      return null
    }

    const length = val.length
    if (isNumber(min) && length < min) {
      return message
    }
    if (isNumber(max) && length > max) {
      return message
    }

    return null
  },
  [RuleName.Required]: (key, values, rule) => {
    const { required, message } = rule
    const val = values[key]

    if (!required) {
      return null
    }

    if (isInvalidValue(val)) {
      return message
    }

    return null
  },
  [RuleName.RegExp]: (key, values, rule) => {
    const val = values[key]
    const {
      name,
      message,
      reg,
      flags,
      errorWhenTested = false,
      useMatch = false,
    } = rule

    if (isInvalidValue(val)) {
      return null
    }

    if (!isString(val)) {
      warn(
        `字段 ${key} 的值类型期望为 string, 实际为 ${getValueType(
          val,
        )}, 无法进行 "${name}" 校验.`,
      )
      return null
    }

    const regexp = new RegExp(reg, flags)

    if (!useMatch) {
      if (regexp.test(val) !== Boolean(errorWhenTested)) {
        return null
      }
      return message
    }

    const res = val.match(regexp)

    if (!res) {
      return null
    }

    const includeG = flags?.toLowerCase()?.includes('g')
    const matches = includeG ? res : [res[0]] // #
    const captures = includeG ? [] : res.slice(1) // $

    const a = replace('#', message, matches)
    const b = replace('$', a, captures)

    return b
  },
  [RuleName.StartsWith]: (key, values, rule) => {
    const val = values[key]
    const { name, message, searchString } = rule

    if (isInvalidValue(val)) {
      return null
    }

    if (!isString(val)) {
      warn(
        `字段 ${key} 的值类型期望为 string, 实际为 ${getValueType(
          val,
        )}, 无法进行 "${name}" 校验.`,
      )
      return null
    }

    if (val.startsWith(searchString)) {
      return null
    }
    return message
  },
}

export default validateMap
