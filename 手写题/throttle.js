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