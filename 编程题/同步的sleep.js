// 调用方式：(new LazyLog()).log(1).sleep(1000).log(2)
// 输出：先输出1，延迟1秒后输出2
// promise 无法满足链式调用
class LazyLog {
    log(str) {
      console.log(str)
      return this;
    }
    sleep(delay) {
      const current = Date.now();
      while (Date.now() - current < delay) {
        // 什么都不做
      }
      return this;
    }
  }
  (new LazyLog()).log(1).sleep(1000).log(2)
  