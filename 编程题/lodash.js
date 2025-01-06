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
function once(fn){
    let isCalled = false
    let res = null
    return function(...args){
        if(!called){
            res = fn.call(this,...args)
            called = false
        }
        return res
    }
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