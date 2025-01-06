/**
实现这个函数： function cacheAsyncFnWrap(fn) {} 
满足如下要求： 
1. 如果第一次调用，那就等待调用返回 
2. 如果第二次调用，那就等待第一次调用结束之后一起返回结果 
3. 如果第三次调用，已经有结果了，那么直接返回结果 
**/

// 测试代码：
function testFn() { 
	console.log('testFn called'); 
	return new Promise((resolve) => { 
	setTimeout(() => { 
	resolve('testFnResult'); }, 5000) 
}) 
} 
const wrapedTestFn = cacheAsyncFnWrap(testFn);

wrapedTestFn().then(res => { console.log('1:', res); }); 

setTimeout(() => { 
	wrapedTestFn().then(res => { console.log('2:', res); }); 
}, 2000); 

setTimeout(() => { 
	wrapedTestFn().then(res => { console.log('3:', res); }); 
	}, 6000); 

/**
打印结果将是： 
testFn called 
// 过了5秒之后打印： 
1: testFnResult 
2: testFnResult 
// 过了6秒之后打印： 
3: testFnResult
**/
function cacheAsyncFnWrap(fn) {
    let cache = null;
    let pending = null;
    return function() {
        if (cache) {
            // 如果已经缓存结果，直接返回
            return Promise.resolve(cache);
        }
        if (!pending) {
            // 如果没有正在进行的 `Promise` 实例，创建一个新的
            pending = fn().then(result => {
                cache = result; // 缓存结果
                pending = null; // 清空正在进行的 `Promise` 实例
                return result;
            });
        }
        // 返回当前的 `Promise` 实例
        return pending;
    };
}


// 方法二
function cacheAsyncFnWrap(fn) {
    let result;
    let promise;
  
    return async function () {
      if (!promise) {
        // 如果还没有进行的 promise，则启动一个新的 promise
        promise = fn().then((res) => {
          result = res; // 缓存结果
          promise = null; // 清除 promise，以便新的调用可以重新启动
        });
      }
      await promise; // 等待当前的 promise 完成
      return result; // 返回缓存的结果
    };
  }