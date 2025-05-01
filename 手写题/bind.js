Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Bind must be called on a function");
  }

  const self = this; // 保存调用 `bind` 的原函数

  // 返回一个新的函数
  return function F(...newArgs) {
    // 如果被作为构造函数调用，`this` 应该指向当前实例而不是 `context`
    if (this instanceof F) {
      return new self(...args, ...newArgs);
    }
    // 如果不是构造函数调用，正常使用 `context`
    return self.apply(context, [...args, ...newArgs]);
  };
};

scrollTop
innerHeight

offsetTop