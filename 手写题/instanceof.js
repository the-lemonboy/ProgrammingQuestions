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
