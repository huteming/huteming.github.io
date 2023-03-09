import Vue from './vue.js'

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello World',
  },
  methods: {
    test() {
      alert('hello world')
    },
  },
})

console.log(vm)
