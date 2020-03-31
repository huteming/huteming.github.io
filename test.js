// class Person {
//   constructor (name) {
//     this.name = name
//   }

//   hello () {
//     console.log('hello')
//   }

//   static say () {
//     console.log('say')
//   }
// }

// 静态属性
// 和 new 操作符无关，和继承有关
// Person.age = 26

function mock () {}

function Person (name) {
  this.name = name
}

Person.prototype.hello = function () {
  console.log('hello')
}

Person.say = function () {
  console.log('say')
}
Person.age = 26




/**
 * 1. 创建一个新对象
 * 2. 新对象的 __proto__ 指向构造函数的原型对象
 * 3. 执行构造函数，给新对象赋值
 */
function mockNew () {
  const construct = arguments[0]
  const rest = Array.prototype.slice.call(arguments, 1)
  if (typeof construct !== 'function') {
    throw new Error('第一个参数必须是函数')
  }
  const result = Object.create(construct.prototype)
  const res = construct.prototype.constructor.apply(result, rest)
  return Object.prototype.toString.call(res) === '[object Object]' ? res : result
}


// const obj = mockNew(Person, 'tommy')

// console.log(obj.name)
// console.log(obj.age)
// console.log(obj.__proto__.constructor === Person)
// obj.hello()
// obj.say()


// 例子3 多加一个参数
function Student(name, age){
  this.name = name;
  this.age = age;
  return {}
}
Student.prototype.doSth = function() {
  console.log(this.name);
};
var student1 = mockNew(Student, '若', 18);

console.log(student1)
// var student1 = new Student('若');
// var student2 = new Student('川');
// console.log(student1, student1.doSth()); // {name: '若'} '若'
// console.log(student2, student2.doSth()); // {name: '川'} '川'

// console.log(student1.__proto__ === Student.prototype); // true
// console.log(student2.__proto__ === Student.prototype); // true
// __proto__ 是浏览器实现的查看原型方案。
// 用ES5 则是：
// console.log(Object.getPrototypeOf(student1) === Student.prototype); // true
// console.log(Object.getPrototypeOf(student2) === Student.prototype); // true


