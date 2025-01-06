Function.prototype.MyApply = function (thisArg, args) {
  if (typeof this !== "function") {
    throw new Error("param is not a function");
  }
  thisArg = thisArg || window;
  thisArg.func = this;
  let result;
  if (args instanceof Array) {
    result = thisArg.func(...args);
  } else {
    result = thisArg.func();
  }
  delete thisArg.func;
  return result;
};

