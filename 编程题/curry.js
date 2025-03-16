// https://bigfrontend.dev/zh/problem/create-a-sum/discuss  相关题目
function add(...args) {
  let vessel = []; // 存储所有参数

  const curried = (...nums) => {
    if (nums.length === 0) {
      return vessel.reduce((acc, pre) => acc + pre, 0); // 计算总和
    } else {
      vessel.push(...nums); // 继续收集参数
      return curried; // 继续返回自己，实现链式调用
    }
  };

  return curried(...args);
}
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





function sum(...args) {
  const allArgs = [...args];
  const fn = (...newArgs) => {
    allArgs.push(...newArgs);
    return fn;
  };
  fn.sumOf = () => allArgs.reduce((acc, curr) => acc + curr, 0);
  return fn;
}

// 设计一个sum函数，使其满足以下要求

sum(1, 2).sumOf() // 返回 3
console.log(sum(1, 2).sumOf())
sum(1, 2)(3).sumOf() // 返回 6

sum(1)(2, 3, 4).sumOf() // 返回 10

sum(1, 2)(3, 4)(5).sumOf() // 返回 15