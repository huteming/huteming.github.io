import addModuleByPath from './utils/addModuleByPath'

describe('addModuleByPath', () => {
  it('./en/index.json', () => {
    const module = {}
    const data = { hello: 'hello' }
    const res = addModuleByPath(module, './en/index.json', data)

    expect(res).toEqual({ en: { ...data } })
  })

  it('./en/a/index.json', () => {
    const module = {}
    const data = { hello: 'hello' }
    const res = addModuleByPath(module, './en/a/index.json', data)

    expect(res).toEqual({ en: { a: { ...data } } })
  })

  it('./en/a/b.json', () => {
    const module = {}
    const data = { hello: 'hello' }
    const res = addModuleByPath(module, './en/a/b.json', data)

    expect(res).toEqual({ en: { a: { b: { ...data } } } })
  })
})
