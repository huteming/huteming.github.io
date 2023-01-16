export function getLocal(key: string) {
  const data = window.localStorage.getItem(key)

  if (data === null || data === undefined) {
    return null
  }
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function setLocal(key: string, data: any) {
  if (data === null || data === undefined) {
    window.localStorage.removeItem(key)
    return null
  }
  window.localStorage.setItem(key, JSON.stringify(data))
  return data
}
