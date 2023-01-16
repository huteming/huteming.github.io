/**
 * 借鉴自
 * https://github.com/memoize-immutable/TupleMap/blob/master/index.js
 */

export interface Options {
  limit?: number
}

export default class TupleMap {
  _limit?: number
  _cache: Map<string, any>
  _idMap: WeakMap<any, string>
  _id: number

  constructor(opts?: Options) {
    if (opts && 'limit' in opts) {
      this._limit = opts.limit
    }
    this.clear()
  }

  toString() {
    return '[object TupleMap]'
  }

  _hash(tuple: any[]): string {
    const hash = tuple.reduce<string[]>((result, arg) => {
      const argType = typeof arg

      // 基础类型
      if (arg === null || (argType !== 'object' && argType !== 'function')) {
        result.push(argType === 'string' ? '"' + arg + '"' : '' + arg)
        return result
      }

      const newHash = (() => {
        if (this._idMap.has(arg)) {
          return this._idMap.get(arg) as string
        }

        const id = '#' + this._id++
        this._idMap.set(arg, id)
        return id
      })()
      result.push(newHash)

      return result
    }, [])

    return hash.join('/<[MI_SEP]>/')
  }

  has(tuple: any[]): boolean {
    const hash = this._hash(tuple)
    return this._cache.has(hash)
  }

  set(tuple: any[], value: any): TupleMap {
    const hash = this._hash(tuple)

    if (this._limit !== undefined) {
      this._cache.delete(hash)
    }

    this._cache.set(hash, value)

    if (this._limit !== undefined && this._cache.size > this._limit) {
      this._cache.delete(this._cache.keys().next().value)
    }

    return this
  }

  get(tuple: any[]): any {
    const hash = this._hash(tuple)

    if (this._limit !== undefined && this._cache.has(hash)) {
      const value = this._cache.get(hash)
      this._cache.delete(hash)
      this._cache.set(hash, value)
      return value
    }

    return this._cache.get(hash)
  }

  clear() {
    this._cache = new Map()
    this._idMap = new WeakMap()
    this._id = 0
  }
}
