import createValidator from './utils/rules'

async function sleep(time: number = 10) {
  await new Promise((r) => setTimeout(r, time))
}

const mockValues = {
  empty: '',
  hello: 'hello',
  repeat: 'abacad',
  number: 1,
}

function createConfig(config: any) {
  return async () => {
    await sleep(5)
    return config
  }
}

describe('rules', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Length', () => {
    it('通过最小长度校验', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'Length',
              min: 5,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('不通过最小长度校验', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'Length',
              min: 6,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe('msg')
    })

    it('通过最大长度校验', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'Length',
              max: 5,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('不通过最小长度校验', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'Length',
              max: 4,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe('msg')
    })

    it('值为空时跳过校验', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'Length',
              min: 100,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe(null)
    })

    it('值类型错误提示', async () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)

      const validater = createValidator(
        createConfig({
          number: [
            {
              name: 'Length',
              min: 100,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('number', mockValues)

      expect(msg).toBe(null)
      expect(mockWarn).toBeCalledTimes(1)
    })
  })

  describe('Required', () => {
    it('必填通过', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'Required',
              required: true,
              message: '校验通过',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('必填不通过', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'Required',
              required: true,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe('msg')
    })

    it('非必填', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'Required',
              required: false,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe(null)
    })
  })

  describe('RegExp', () => {
    it('正则通过', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'RegExp',
              reg: /hello/,
              flags: 'g',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('正则不通过', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'RegExp',
              reg: /aaa/,
              flags: 'g',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe('msg')
    })

    it('正则test为true时作为失败', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'RegExp',
              reg: /hello/,
              flags: 'g',
              errorWhenTested: true,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe('msg')
    })

    it('正则match不匹配时, 作为成功', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'RegExp',
              reg: /aaa/,
              flags: 'g',
              useMatch: true,
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('正则match匹配且存在g标志符,  message只能替换匹配值', async () => {
      const validater = createValidator(
        createConfig({
          repeat: [
            {
              name: 'RegExp',
              reg: /a(\w)/,
              flags: 'g',
              useMatch: true,
              message: '$$$0$9$+ ###0#9#-',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('repeat', mockValues)

      expect(msg).toBe('$$$0$9$+ abacadab#9#-')
    })

    it('正则match匹配且不存在g标志符,  message可以替换匹配值和捕获值', async () => {
      const validater = createValidator(
        createConfig({
          repeat: [
            {
              name: 'RegExp',
              reg: /a(\w\w\w\w(\w))/,
              flags: 'i',
              useMatch: true,
              message: '$$$0$9$+ ###0#9#-',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('repeat', mockValues)

      expect(msg).toBe('bacaddbacad$9$+ abacadabacad#9#-')
    })

    it('值为空时跳过校验', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'RegExp',
              reg: /b/,
              flags: 'g',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe(null)
    })

    it('值类型错误提示', async () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)

      const validater = createValidator(
        createConfig({
          number: [
            {
              name: 'RegExp',
              reg: /b/,
              flags: 'g',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('number', mockValues)

      expect(msg).toBe(null)
      expect(mockWarn).toBeCalledTimes(1)
    })
  })

  describe('StartsWith', () => {
    it('校验通过', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'StartsWith',
              searchString: 'he',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe(null)
    })

    it('校验不通过', async () => {
      const validater = createValidator(
        createConfig({
          hello: [
            {
              name: 'StartsWith',
              searchString: 'aaa',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('hello', mockValues)

      expect(msg).toBe('msg')
    })

    it('值为空时跳过校验', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'StartsWith',
              searchString: 'he',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe(null)
    })

    it('值类型错误提示', async () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)

      const validater = createValidator(
        createConfig({
          number: [
            {
              name: 'StartsWith',
              searchString: 'he',
              message: 'msg',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('number', mockValues)

      expect(msg).toBe(null)
      expect(mockWarn).toBeCalledTimes(1)
    })
  })

  describe('before', () => {
    it('前置条件不满足跳过验证', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'Required',
              required: true,
              message: 'msg',
              before: 'return values.number === 1',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe('msg')
    })

    it('前置条件满足正常验证', async () => {
      const validater = createValidator(
        createConfig({
          empty: [
            {
              name: 'Required',
              required: true,
              message: 'msg',
              before: 'return values.hello === "aa"',
            },
          ],
        }),
      )
      await sleep()

      const msg = validater('empty', mockValues)

      expect(msg).toBe(null)
    })
  })

  it('远程属性接口未响应', async () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)

    const validater = createValidator(
      createConfig({
        empty: [
          {
            name: 'Required',
            required: true,
            message: 'msg',
          },
        ],
      }),
    )

    const msg = validater('empty', mockValues)

    expect(msg).toBe(null)
    expect(mockWarn).toBeCalledTimes(1)
  })

  it('校验规则未配置', async () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)

    const validater = createValidator(createConfig({}))
    await sleep()

    const msg = validater('abc', mockValues)

    expect(msg).toBe(null)
    expect(mockWarn).toBeCalledTimes(1)
  })

  it('配置的校验规则不存在', async () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)

    const validater = createValidator(
      createConfig({
        empty: [
          {
            name: 'invalid',
            required: true,
            message: 'msg',
          },
        ],
      }),
    )
    await sleep()

    const msg = validater('empty', mockValues)

    expect(msg).toBe(null)
    expect(mockWarn).toBeCalledTimes(1)
  })

  it('支持从同步函数获取配置', async () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)

    const validater = createValidator(() => {
      return {
        empty: [
          {
            name: 'Required',
            required: true,
            message: 'msg',
          },
        ],
      } as any
    })

    const msg = validater('empty', mockValues)

    expect(msg).toBe('msg')
    expect(mockWarn).toBeCalledTimes(0)
  })
})
