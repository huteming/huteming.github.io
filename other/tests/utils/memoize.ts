import TupleMap, { Options } from './tupleMap'

type AnyFunction = (...args: any[]) => unknown

/**
 * 借鉴自
 * https://github.com/memoize-immutable/memoize-immutable/blob/master/index.js
 */
export default function memoize<T extends AnyFunction>(
  fn: T,
  options?: Options,
): T {
  const cache = new TupleMap(options)

  const memoized = function (...args: any[]) {
    if (!cache.has(args)) {
      const result = fn.apply(this, args)
      cache.set(args, result)
      return result
    }
    return cache.get(args)
  }

  if (fn.name) {
    memoized.displayName = fn.name + 'Memoized'
  }

  return (memoized as unknown) as T
}
