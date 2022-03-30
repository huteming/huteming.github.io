```js
function fakeInstanceof(instance, constructor) {
  try {
    const proto = Object.getPrototypeOf(instance)
    if (proto === constructor.prototype) {
      return true
    }
    return fakeInstanceof(proto, constructor)
  } catch {
    return false
  }
}
```

测试代码

```js
class Parent {}
class Child extends Parent {}
const child = new Child()

console.log(fakeInstanceof(child, Child))
console.log(fakeInstanceof(child, Parent))
console.log(fakeInstanceof(child, Object))
console.log(fakeInstanceof(1, Number))
console.log(fakeInstanceof(null, Object))
```
