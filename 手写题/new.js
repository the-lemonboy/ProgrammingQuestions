function myNew(fn, ...args) {
    // 基于原型链 创建一个新对象
    let newObj = Object.create(fn.prototype)
  
    // 添加属性到新对象上 并获取obj函数的结果
    let res = fn.call(newObj, ...args)
  
    // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
    return result instanceof Object ? result : obj
  }
// 方法二
  function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}


// 法二  推荐
function myObjectCreate(proto){
  if(typeof proto !== 'object' || proto === null) throw new Error('')
  const obj = {}
  obj.__proto__ = proto
  return obj
}
