import isGreaterThan from './utils/isGreaterThan'

describe('isGreaterThan', () => {
  describe('正常比较', () => {
    it('数字', () => {
      expect(isGreaterThan(2, 1)).toEqual(true)
      expect(isGreaterThan(0, 1)).toEqual(false)
    })

    it('字符串类型的数字', () => {
      expect(isGreaterThan('2', 1)).toEqual(true)
      expect(isGreaterThan('0', 1)).toEqual(false)
    })
  })

  describe('通过', () => {
    it('null', () => {
      expect(isGreaterThan(null, 1)).toEqual(true)
      expect(isGreaterThan(1, null)).toEqual(true)
    })

    it('undefined', () => {
      expect(isGreaterThan(undefined, 1)).toEqual(true)
      expect(isGreaterThan(1, undefined)).toEqual(true)
    })

    it('空字符串', () => {
      expect(isGreaterThan('', 1)).toEqual(true)
      expect(isGreaterThan(1, '')).toEqual(true)
    })
  })

  describe('不通过', () => {
    it('布尔值', () => {
      expect(isGreaterThan(true, 1)).toEqual(false)
      expect(isGreaterThan(1, true)).toEqual(false)
    })

    it('对象', () => {
      expect(isGreaterThan({}, 1)).toEqual(false)
      expect(isGreaterThan(1, {})).toEqual(false)
    })

    it('数组', () => {
      expect(isGreaterThan([], 1)).toEqual(false)
      expect(isGreaterThan(1, [])).toEqual(false)
    })
  })
})
