import memoize from './utils/memoize'

describe('memoize', function () {
  let nbExecs = 0
  const fn: any = function () {
    return ++nbExecs
  }
  const options = {}

  beforeEach(function () {
    nbExecs = 0
  })

  it('should memoize a result when called with 0 args', function (done) {
    const memoizedFn = memoize(fn, options)

    expect(memoizedFn()).toEqual(1)
    expect(nbExecs).toEqual(1)

    expect(memoizedFn()).toEqual(1)
    expect(nbExecs).toEqual(1)

    done()
  })

  it('should memoize a result when called with 1 primitive arg', function (done) {
    const memoizedFn = memoize(fn, options)
    var arg1 = 12

    expect(memoizedFn(arg1)).toEqual(1)
    expect(nbExecs).toEqual(1)

    expect(memoizedFn(arg1)).toEqual(1)
    expect(nbExecs).toEqual(1)

    done()
  })

  it('should memoize a result when called with 1 non-primitive arg', function (done) {
    const memoizedFn = memoize(fn, options)
    var arg1 = {}

    expect(memoizedFn(arg1)).toEqual(1)
    expect(nbExecs).toEqual(1)

    // second execution
    expect(memoizedFn(arg1)).toEqual(1)
    expect(nbExecs).toEqual(1)

    done()
  })

  it('should memoize a result when called with mixed primitive and non-primitive args', function (done) {
    const memoizedFn = memoize(fn)
    const arg1 = { a: 'b' }
    const arg2 = 'string'
    const arg3 = [1, 2]
    const arg4 = function () {}
    const arg5 = 12
    const arg6 = null
    const arg7 = false
    const arg8 = undefined

    // first execution with empty cache
    expect(memoizedFn(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)).toEqual(
      1,
    )
    expect(nbExecs).toEqual(1)

    // second execution
    expect(memoizedFn(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)).toEqual(
      1,
    )
    expect(nbExecs).toEqual(1)

    done()
  })

  it('should set the displayName of the memoized function', function (done) {
    var sum = function sum() {}

    expect(memoize(sum).displayName).toEqual('sumMemoized')

    done()
  })
})
