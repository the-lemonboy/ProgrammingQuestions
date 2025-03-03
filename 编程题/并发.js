async function sleep(n,name='test'){
    return new Promise(resolve=>{
        console.log(n,name,'start')
        setTimeout(()=>{
            console.log(n,name,'end','--------')
            resolve({n,name})
        },n*1000)
    })
}
 function asyncPool({limit,items}){
    let promises = []
    let pool = new Set()
    for(let item of items){
    const fn = async item => await item()
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)
    const clean = ()=> pool.delete(promise)
    promise.then(clean,clean)
    if(pool.size>=limit){
        await Promise.race(pool)
    }
}
return Promise.all(promises)
}


async function start(){
    await asyncPool({
        limit:2,
        items:[
            ()=> sleep(1,'吃饭'),
            ()=> sleep(3,'睡觉'),
            ()=> sleep(5,'打游戏'),
            ()=> sleep(3.5,'学习算法'),
            ()=> sleep(4,'学习vue'),
        ]
    })
}
start()

function asyncPool(limit,items){
  return new Promise(){
    items.forEach(item=>{
      item = promise.resolve(item)
      promise.race()
    })
  }
}
// -----------------------https://github.com/rxaviers/async-pool/blob/1.x/lib/es7.js
async function asyncPool(poolLimit, iterable, iteratorFn) {
  const ret = [];
  const executing = new Set();
  for (const item of iterable) {
    const p = Promise.resolve().then(() => iteratorFn(item, iterable));
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

module.exports = asyncPool;

//  ----------------方法二
// 运行池
const pool = new Set();

// 等待队列
const waitQueue = [];

/**
 * @description: 限制并发数量的请求
 * @param {*} reqFn：请求方法
 * @param {*} max：最大并发数
 */
const request = (reqFn, max) => {
  return new Promise((resolve, reject) => {
    // 判断运行吃是否已满
    const isFull = pool.size >= max;

    // 包装的新请求
    const newReqFn = () => {
      reqFn()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          // 请求完成后，将该请求从运行池中删除
          pool.delete(newReqFn);
          // 从等待队列中取出一个新请求放入等待运行池执行
          const next = waitQueue.shift();
          if (next) {
            pool.add(next);
            next();
          }
        });
    };

    if (isFull) {
      // 如果运行池已满，则将新的请求放到等待队列中
      waitQueue.push(newReqFn);
    } else {
      // 如果运行池未满，则向运行池中添加一个新请求并执行该请求
      pool.add(newReqFn);
      newReqFn();
    }
  });
};

requestList.forEach(async item => {
  const res = await request(item, 10);
  console.log(res);
});



// ---------------------------------
// Example usage
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3',
  // Add more URLs as needed
];

const limit = 2;

async function concurrentRequests(urls, limit) {
  const results = [];
  const inFlightRequests = [];
  
  async function makeRequest(url) {
      try {
          const response = await fetch(url);
          const data = await response.json();
          results.push(data);
      } catch (error) {
          results.push({ error: error.message });
      }
  }
  
  for (let i = 0; i < urls.length; i++) {
      const request = makeRequest(urls[i]);
      inFlightRequests.push(request);
      
      if (inFlightRequests.length === limit || i === urls.length - 1) {
          await Promise.all(inFlightRequests);
          inFlightRequests.length = 0;
      }
  }
  
  return results;
}

concurrentRequests(urls, limit)
  .then(results => console.log(results))
  .catch(error => console.error(error));


// ----------------https://github.com/rxaviers/async-pool/blob/master/lib/es9.js
  async function* asyncPool(concurrency, iterable, iteratorFn) {
    const executing = new Set();
    async function consume() {
      const [promise, value] = await Promise.race(executing);
      executing.delete(promise);
      return value;
    }
    for (const item of iterable) {
      // Wrap iteratorFn() in an async fn to ensure we get a promise.
      // Then expose such promise, so it's possible to later reference and
      // remove it from the executing pool.
      const promise = (async () => await iteratorFn(item, iterable))().then(
        value => [promise, value]
      );
      executing.add(promise);
      if (executing.size >= concurrency) {
        yield await consume();
      }
    }
    while (executing.size) {
      yield await consume();
    }
  }
  
  module.exports = asyncPool;

// ----------- https://github.com/rxaviers/async-pool/blob/1.x/lib/es6.js
  function asyncPool(poolLimit, iterable, iteratorFn) {
    let i = 0;
    const ret = [];
    const executing = new Set();
    const enqueue = function() {
      if (i === iterable.length) {
        return Promise.resolve();
      }
      const item = iterable[i++];
      const p = Promise.resolve().then(() => iteratorFn(item, iterable));
      ret.push(p);
      executing.add(p);
      const clean = () => executing.delete(p);
      p.then(clean).catch(clean);
      let r = Promise.resolve();
      if (executing.size >= poolLimit) {
        r = Promise.race(executing);
      }
      return r.then(() => enqueue());
    };
    return enqueue().then(() => Promise.all(ret));
  }
  
  module.exports = asyncPool;


