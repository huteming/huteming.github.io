import pickOptionValue from './utils/pickOptionValue'

const options = [{ label: 'label', value: 'value' }]

describe('pickOptionValue', () => {
  it('选项不变时, 不会重复执行', () => {
    const res1 = pickOptionValue(options, 'value', 'value', 'label')

    options.unshift({ value: 'value', label: 'aa' })
    const res2 = pickOptionValue(options, 'value', 'value', 'label')
    const newOptions = [...options]
    const res3 = pickOptionValue(newOptions, 'value', 'value', 'label')
    options.shift()

    expect(res1).toEqual('label')
    expect(res2).toEqual('label')
    expect(res3).toEqual('aa')
  })

  it('未设置默认值, 返回默认值为 value 值', () => {
    const res = pickOptionValue(options, 'abc', 'value', 'label')

    expect(res).toEqual('abc')
  })

  it('有 defaultValue, 返回 defaultValue', () => {
    const res = pickOptionValue(options, 'abc', 'value', 'label', 'defaults')

    expect(res).toEqual('defaults')
  })
})
