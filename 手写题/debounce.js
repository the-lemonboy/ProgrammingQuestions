function debounce(func, delay) {
  let timer = null;
  let context = this;
  return function () {
    let args = arguments;
    clearTimeout(timer);
    timer = function () {
      setTimeout(func.bind(context, args), delay);
    };
  };
}

// 带立即执行
function debounce2(fn, delay, immediate) {
  let timer = null;
  return function() {
      const context = this;
      const args = arguments;
      timer && clearTimeout(timer);
      if(immediate) {
          const doNow = !timer;
          timer = setTimeout(() => {
              timer = null;
          }, delay);
          doNow && fn.apply(context, args);
      }else {
          timer = setTimeout(() => {
              fn.apply(context, args);
          }, delay);
      }
  };
}
