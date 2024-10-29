function add() {
  // 创建空数组来维护所有要 add 的值
  const args = [];
  // curry 函数，存入每次调用传入的参数
  function curried(...nums) {
    if (nums.length === 0) {
      // 长度为0，说明调用结束，返回 args 的 sum
      return args.reduce((pre, cur) => pre + cur, 0);
    } else {
      // 长度不为0，将传入的参数存入 args，返回 curried函数给下一次调用
      args.push(...nums);
      return curried;
    }
  }
  // 核心的一步
  // 一开始给 curried 传递 add 接收到的参数 arguments
  return curried(...Array.from(arguments));
}
console.log(add(1, 2)(1)()); // 输出：4
console.log(add(1)(2)(3)(4)()); // 输出：10
console.log(add(5)()); // 输出：5

// 其他curry实现
function curry(fn) {
  let length = fn.length;
  let params = []
  return function patical(x) {
    params.push(x);
    if(params.length === length) {
      return fn(...params);
    }else{
      return patical
    }
  };
}
const testCurry = curry((a, b, c) => a + b + c);
console.log(testCurry(1)(2)(3));