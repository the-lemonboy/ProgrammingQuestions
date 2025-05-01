// 原型链继承
// 优点
// ✅ 继承了父类的属性和方法
// ✅ 父类的方法可以被子类共享（节省内存）  
// 缺点
// ❌ 引用类型共享问题（如果父类有数组/对象，子类修改会影响所有实例）
// ❌ 无法传递参数（创建子类实例时，不能给父类传参）  
function Parent() {
  this.name = "jack"
}
Parent.prototype.sayHello = function () {
  console.log("Hello" + this.name)
}
function Child() { }
Child.prototype = new Parent()
const child1 = new Child();
console.log(child1.name); // Jack
child1.sayHello(); // Hello, Jack



// 借用构造函数（经典继承 / Constructor Stealing）
// 核心思想：在子类构造函数中调用父类构造函数
// 优点
// ✅ 解决了原型链继承的引用类型共享问题
// ✅ 可以向父类传递参数  
// 缺点
// ❌ 方法不能复用（每个实例都有自己的方法，影响性能）
// ❌ 父类的方法不能放在原型上，无法继承  
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

function Child(name, age) {
  Parent.call(this, name); // 调用父类构造函数
  this.age = age;
}

const child1 = new Child("Tom", 18);
const child2 = new Child("Jerry", 20);

child1.colors.push("black");
console.log(child1.colors); // ["red", "blue", "green", "black"]
console.log(child2.colors); // ["red", "blue", "green"]


// 3. 组合继承（原型链 + 借用构造函数）
// 核心思想：结合原型链和构造函数继承，既继承方法又继承属性
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Parent.prototype.sayHello = function () {
  console.log("Hello, " + this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 继承属性
  this.age = age;
}

Child.prototype = new Parent(); // 继承方法
Child.prototype.constructor = Child; // 修正 constructor 指向

const child1 = new Child("Tom", 18);
child1.colors.push("black");

console.log(child1.name); // Tom
console.log(child1.colors); // ["red", "blue", "green", "black"]
child1.sayHello(); // Hello, Tom
// 优点
// ✅ 继承了 实例属性（构造函数调用）
// ✅ 继承了 方法（原型链继承）
// ✅ 解决了原型链继承的 引用类型共享问题  
// 缺点
// ❌ 调用了两次父类构造函数（Parent.call(this) 和 new Parent()）
// ❌ 子类原型上的方法是多余的（它们是从父类实例继承来的，而不是直接来自 Parent.prototype）  


// 4. 原型式继承（Prototype Delegation）
// 核心思想：用 Object.create 创建新对象
// 优点
// ✅ 代码简洁，直接创建对象继承父类
// ✅ 方法共享（不会影响内存）  
// 缺点
// ❌ 引用类型共享问题（多个子对象修改 colors 会互相影响）
// ❌ 不能传参  
const parent = {
  name: "Jack",
  colors: ["red", "blue", "green"],
  sayHello() {
    console.log("Hello, " + this.name);
  }
};

const child1 = Object.create(parent);
child1.name = "Tom";
child1.colors.push("black");

const child2 = Object.create(parent);
console.log(child2.colors); // ["red", "blue", "green", "black"]