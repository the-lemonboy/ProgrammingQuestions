// once
// -----------用例---------------
function func(num) {
    return num
  }
  const onced = once(func)
  onced(1)
  // 1
  onced(2)
  // 1，因为已经调用过了，前一次的结果被直接返回
  // -----------用例---------------
  function once(fn) {
    let isCalled = false;  // 标记函数是否已被调用
    let res = null;         // 存储第一次调用的返回值
    return function(...args) {
      if (!isCalled) {      // 如果函数尚未被调用
        res = fn.call(this, ...args);  // 执行函数并保存结果
        isCalled = true;     // 设置标记，表示函数已经调用过
      }
      return res;           // 返回第一次调用时的结果
    };
  }

// memo
// https://bigfrontend.dev/zh/problem/implement-general-memoization-function
function memo(func, resolver) {
    // your code here
    const cache = new Map();
    // Map<cacheKey, Map<context, value>>
    return function() {
      const cacheKey = resolver ?  resolver(...arguments) : Array.from(arguments).join(',');
      const contextMap = cache.get(cacheKey);
      // If there is a corresponding context map to cachekey
      // Check if context is in the map, if so, return value.
      // Else if no corresponding add contextMap, add new entry to the context map
      if (!contextMap) {
        const value = func.apply(this, arguments);
        cache.set(cacheKey, new Map([[ this, value ]]));
        return value;
      }
      if (contextMap.has(this)) {
        return contextMap.get(this);
      } 
      // If context not in the map, calculate and add to context map.
      const value = func.apply(this, arguments);
      contextMap.set(this, value);
      return value;
    }
  }


  // https://bigfrontend.dev/zh/problem/implement-lodash-get

function get(source, path, defaultValue = undefined) {
  // your code here
  const props = Array.isArray(path)? path: path.replaceAll('[','.').replaceAll(']','').split('.');
  let curNode = source;
  for(let i=0;i<props.length;i++){
    let k = props[i];
    if(curNode[k] === undefined) return defaultValue;
    if(i === props.length-1) return curNode[k];
    else  curNode = curNode[k];
  }
}
const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}
get(obj, 'a.b.c') // [1,2,3]
get(obj, 'a.b.c.0') // 1
get(obj, 'a.b.c[1]') // 2
get(obj, ['a', 'b', 'c', '2']) // 3
get(obj, 'a.b.c[3]') // undefined
get(obj, 'a.c', 'bfe') // 'bfe'
console.log(  get(obj, ['a', 'b', 'c', '2']) )// 'bfe'

//  // 法二
function get(source, path, defaultValue) {
  const paths = typeof path === 'string' ? path.match(/[^\[\]\.]+/g) : path
  if (!(paths && paths.length)) return;
  // acc存在则return acc[cur]
  const res = paths.reduce((acc,cur)=> acc && acc[cur],source)
  return res || defaultValue
}


