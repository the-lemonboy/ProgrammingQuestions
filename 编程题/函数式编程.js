const memoize = (f) => {
    const cache = {};

    return (...args) => {
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
        return cache[argStr];
    };
};

const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];


const pipe = (...fns) => (...args) => fns.reduce((res, fn) => fn(...res), args);

function once(fn) {
    let called = false;
    return function(...args) {
      if (!called) {
        called = true;
        return fn(...args);
      }
    };
  }


  function memoize(fn) {
    const cache = {};
    return function(...args) {
      const key = JSON.stringify(args);
      if (key in cache) {
        return cache[key];
      }
      const result = fn(...args);
      cache[key] = result;
      return result;
    };
  }


  
  
  const slowFunction = (num) => {
    console.log('Computing...');
    return num * 2;
  };
  
  const memoized = memoize(slowFunction);
  console.log(memoized(2)); // 输出: Computing... 4
  console.log(memoized(2)); // 输出: 4（不再计算）




  function fold(fn, initialValue, list) {
    let accumulator = initialValue;
  
    for (let i = 0; i < list.length; i++) {
      accumulator = fn(accumulator, list[i], i, list);
    }
  
    return accumulator;
  }
  
  // 示例用法：将数组中的数字加起来
  const sum = (a, b) => a + b;
  const numbers = [1, 2, 3, 4, 5];
  
  const result = fold(sum, 0, numbers);
  console.log(result); // 输出: 15