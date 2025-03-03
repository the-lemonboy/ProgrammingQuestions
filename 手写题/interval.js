(() => {
  const list = new Set();
  function myInterval(fn, ms) {
    const ref = {};
    const exec = () => {
      return setTimeout(() => {
        fn.apply(null);
        const timer = exec();
        ref.current = timer;
      }, ms);
    };
    ref.current = exec();
    list.add(ref);
    return ref;
  }

  function myClearInterval(ref) {
    clearTimeout(ref.current);
    list.delete(ref);
  }
  window.myInterval = myInterval;
  window.myClearInterval = myClearInterval;
})();

// https://bigfrontend.dev/zh/problem/create-an-interval/discuss
// 法二
const map = new Map();
let globalId = 0;
function mySetInterval(func, delay, period) {
  let count = 0;
  let id = globalId++;

  function run() {
    let _id = setTimeout(() => {
      func();
      count++;
      run();
    }, delay + period * count);
    map.set(id, _id);
  }

  run();

  return id;
}



// https://bigfrontend.dev/zh/problem/create-an-interval/discuss
// 法三
/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
// wrap up the logic 
const myIntervalInstance = (() => {
  // map the initial timer to the ongoing timer
  const map = new Map()
  
  function setInterval(func, delay, period) {
    let count = 0
    // initial timer
    const id = setTimeout(() => run(), delay + period * count++)
    const run = () => {
      func()
      // create next timer
      const nextId = setTimeout(run, delay + period * count++)
      map.set(id, nextId)
    }
    
    return id
  }
  
  function clearInterval(id) {
    window.clearTimeout(id)
    // clear both the intial and ongoing timer
    if (map.has(id)) {
      window.clearTimeout(map.get(id))
      map.delete(id)
    }
  }
  
  return {
    setInterval,
    clearInterval
  }
})()
      
function mySetInterval(func, delay, period) {
  return myIntervalInstance.setInterval(func, delay, period)
}

function myClearInterval(id) {
  myIntervalInstance.clearInterval(id)
}
