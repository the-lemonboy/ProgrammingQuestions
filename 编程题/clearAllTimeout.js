// https://bigfrontend.dev/zh/problem/implement-clearAllTimeout/discuss
function clearAllTimeout() {
    // your code here
    let id = setTimeout(null, 0);
    while(id>=0){
      window.clearTimeout(id);
      id--;
    }
  }

// https://bigfrontend.dev/zh/problem/implement-clearAllTimeout/discuss
//  法二
(() => {
    const originSetTimeout = setTimeout;
    const originClearTimeout = clearTimeout;
    const timers = new Set();
    // 重写定时器
    window.clearAllTimeout = () => {
      for (const timerId of timers) {
        clearTimeout(timerId);
      }
    }
    window.setTimeout = (callback, time, ...args) => {
      const callbackWrapper  = () => {
        callback(...args);
        timers.delete(timerId);
      }
      const timerId = originSetTimeout(callbackWrapper, time);
      timers.add(timerId);
      return timerId;
    }
    window.clearTimeout = (id) => {
      originClearTimeout(id);
      timers.delete(id);
    }
  })();



  