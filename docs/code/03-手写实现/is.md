---
sidebar_position: 1
---

```ts monaco
function equal(a, b) {
  // NaN
  if (a !== b) {
    if (isNaN(a) && isNaN(b)) {
      return true
    }
    return false
  }
  // -0 +0
  if (a === 0 && b === 0 && 1 / a !== 1 / b) {
    return false
  }
  return true
}
```
