function debounce(func, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = function () {
      setTimeout(func.apply(context, args), delay);
    };
  };
}

// 带立即执行
// •	当 immediate 为 true 时：
// •	const doNow = !timer; 检查是否存在一个进行中的定时器。如果没有进行中的定时器（timer 为 null），那么 doNow 将被设置为 true，表示函数 fn 需要立即执行。
// •	timer = setTimeout(() => { timer = null; }, delay); 设置一个新的定时器，delay 毫秒后将 timer 重置为 null。
// •	doNow && fn.apply(context, args); 只有当 doNow 为 true 时（即没有进行中的定时器），才立即执行函数 fn。

// 换句话说，当 immediate 为 true 时，函数 fn 会在首次调用时立即执行，然后在后续的 delay 毫秒内不会再次执行，直到定时器到期后才会允许再次立即执行。
function debounce2(fn, delay, immediate) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    timer && clearTimeout(timer);
    if (immediate) {
      const doNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      doNow && fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}


// 法三
/**
 * 
 * @param {回调} func 
 * @param {等待时间} wait 
 * @param {选项} option
 * leading 是否立即执行
 * trailing 是否在延迟后执行 
 */
  function debounce(func, wait, option = {leading: false, trailing: true}) {
    let timer = null
    return function(...args) {
      let isInvoked = false
      let context = this
      // if not cooling down and leading is true, invoke it right away
      if (timer === null && option.leading) {
        func.call(context, ...args)
        isInvoked = true
      }
      // no matter what, timer needs to be reset
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        // isInvoked这里主要是判断是不是第一次执行
        if (option.trailing && !isInvoked) {
          func.call(context, ...args)
        }
        timer = null
      }, wait)
    }
  }

  // 不需要trailing
  function  debounce(fn,delay,leading){
    let timer = null
    return function(...args){
      const context = this
      let isInvoked = false
      if(timer === null && leading){
        fn.call(context,...args)
        isInvoked = true
      }
      clearTimeout(timer)
      timer = setTimeout(()=>{
        if(!isInvoked){
          fn.call(context,...args)
        }
        timer = null
      },delay)
    }
  }
