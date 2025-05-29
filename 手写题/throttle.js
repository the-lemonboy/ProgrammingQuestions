// 方法二：定时器
function throttle(fn, delay) {
  // 重置定时器
  let timer = null;
  // 返回闭包函数
  return function () {
    // 记录事件参数
    let args = arguments;
    // 如果定时器为空
    if (!timer) {
      // 开启定时器
      timer = setTimeout(() => {
        // 执行函数
        fn.apply(this, args);
        // 函数执行完毕后重置定时器
        timer = null;
      }, delay);
    }
  };
}



// 节流进阶
// https://bigfrontend.dev/zh/problem/implement-throttle-with-leading-and-trailing-option/discuss
function throttle(func, wait, option = {leading: true, trailing: true}) {
  let waiting = false;
  let lastArgs = null;
  return function wrapper(...args) {
    if(!waiting) {
      waiting = true;
      const startWaitingPeriod = () => setTimeout(() => {
        if(option.trailing && lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
          startWaitingPeriod();
        }
        else {
          waiting = false;
        }
      }, wait);
      if(option.leading) {
        func.apply(this, args);
      } else {
        lastArgs = args; // if not leading, treat like another any other function call during the waiting period
      }
      startWaitingPeriod();
    }
    else {
      lastArgs = args; 
    }
  }
}

function throttle(func, wait, option = {leading: true, trailing: true}) {
  let waiting = false;
  let lastArgs = null;
  return function wrapper(...args) {
    if(!waiting) {
      waiting = true;
      const startWaitingPeriod = () => setTimeout(() => {
        if(option.trailing && lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
          startWaitingPeriod();
        }else{
          waiting = false;
        }
      }, wait);
      if(option.leading) {
        func.apply(this, args);
      } else {
        lastArgs = args; // if not leading, treat like another any other function call during the waiting period
      }
      startWaitingPeriod();
    }
    else {
      lastArgs = args; 
    }
  }
}



function throttle(fn,delay){
  let timer = null
  return function(...args){
    let context = this
    if(!timer){
      timer = setTimeout(()=>{
        fn.call(context,...args)
        timer = null
      },delay)
    }
  }
}




function throttle(func, wait, option = {leading: true, trailing: true}) {
  // 1. cooling or not
  // 2. call posponed.
  
  //     1. once called,
  //       - if cooling, stash the call
  //       - if not colling, run it  and set the timer
  //     2. when time is up, reset cooling
  //       - if stashed call, call it, go to 1
  let timer = null
  let stashed = null
  
  const startCooling = () => {
     timer = window.setTimeout(check, wait)
  }
  
  const check = () => {
    timer = null
    if (stashed !== null) {
      func.apply(stashed[0], stashed[1])
      stashed = null
      startCooling()
    }
  }
  
  return function(...args) {
    if (timer !== null) {
      // cooling, stash it
      if (option.trailing) {
        stashed = [this, args]
      }
      return
    } 
    
    if (option.leading) {
      func.apply(this, args)
      startCooling()
      return
    } 
    if (option.trailing) {
      stashed = [this, args]
      startCooling()
    }  
  }
}
