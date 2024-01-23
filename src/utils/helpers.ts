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
