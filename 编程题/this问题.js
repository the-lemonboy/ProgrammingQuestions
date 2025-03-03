// 第一题
let a = 10
const b = 20

function foo () {
  console.log(this.a)
  console.log(this.b)
}
foo();
console.log(window.a)
// undefined
// undefined
// undefined


// ----第二题
"use strict";
var a = 10;
function foo () {
  console.log('this1', this)
  console.log(window.a)
  console.log(this.a)
}
console.log(window.foo)
console.log('this2', this)
foo();
// f foo() {...}
// 'this2' Window{...}
// 'this1' undefined
// 10
// Uncaught TypeError: Cannot read property 'a' of undefined



// 第三题
function foo () {
    console.log(this.a)
  };
  var obj = { a: 1, foo };
  var a = 2;
  var foo2 = obj.foo;
  
  obj.foo();
  foo2();
//   1
//   2
    

// ---------第四题
function foo () {
    console.log(this.a)
  };
  var obj = { a: 1, foo };
  var a = 2;
  var foo2 = obj.foo;
  var obj2 = { a: 3, foo2: obj.foo }
  
  obj.foo();
  foo2();
  obj2.foo2();

// 1
// 2
// 3


// --------第五题
function foo () {
    console.log(this.a)
  }
  function doFoo (fn) {
    console.log(this)
    fn()
  }
  var obj = { a: 1, foo }
  var a = 2
  doFoo(obj.foo)
// window
// 2  