import { getLocal, setLocal } from './utils/localStorage'

describe('localStorage', () => {
  it('数组', () => {
    const data = [1, 2, 3]

    const req = setLocal('array', data)
    const res = getLocal('array')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('对象', () => {
    const data = {
      arr: [1, 2, 3],
    }

    const req = setLocal('object', data)
    const res = getLocal('object')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('字符串', () => {
    const data = '1'

    const req = setLocal('string', data)
    const res = getLocal('string')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('数字', () => {
    const data = 1

    const req = setLocal('number', data)
    const res = getLocal('number')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('布尔值', () => {
    const data = false

    const req = setLocal('boolean', data)
    const res = getLocal('boolean')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('null', () => {
    const data = null

    const req = setLocal('null', data)
    const res = getLocal('null')

    expect(req).toBe(data)
    expect(res).toEqual(data)
  })

  it('undefined', () => {
    const data = undefined

    const req = setLocal('undefined', data)
    const res = getLocal('undefined')

    expect(req).toBe(null)
    expect(res).toEqual(null)
  })
})
