import { Nullable } from './types'

export function fuzzyMatch(word: Nullable<string>, searchValue: Nullable<string>): boolean {
  word = word?.trim()
  searchValue = searchValue?.trim()

  if (!searchValue) {
    return true
  }
  if (!word) {
    return false
  }

  word = word.toLowerCase()
  searchValue = searchValue.toLowerCase()

  return word.includes(searchValue)
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function log(...args: any[]): void {
  if (isDevelopment()) {
    console.log(...args)
  }
}
