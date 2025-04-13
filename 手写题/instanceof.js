function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)// 获取对象的原型
    let prototype = right.prototype; // 获取构造函数的 prototype 对象

  
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
      // 如果是null已经是最高层了prototype没有找到直接返回false
      if (!proto) return false;
      if (proto === prototype) return true;
  // 递归获取原型
      proto = Object.getPrototypeOf(proto);
    }
  }


  function myInstanceOf(obj, target) {
    if (obj == null || typeof obj !== 'object') return false; // (1)
    const proto = Object.getPrototypeOf(obj); // (2)
    return proto === target.prototype ? true : myInstanceOf(proto, target); // (3)
  }


  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }