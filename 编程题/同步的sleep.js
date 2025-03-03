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

  class LazyLog {
    constructor() {
      this.tasks = [];
      // 异步启动任务队列
      setTimeout(() => this.next(), 0);
    }
  
    // 执行队列中的下一个任务
    next() {
      const task = this.tasks.shift();
      if (task) {
        task();
      }
    }                                                                                    
  
    // log 方法，立即打印内容并加入任务队列
    log(value) {
      this.tasks.push(() => {
        console.log(value);
        this.next();
      });
      return this;
    }
  
    // sleep 方法，延迟指定时间后继续执行任务
    sleep(milliseconds) {
      this.tasks.push(() => {
        setTimeout(() => {
          this.next();
        }, milliseconds);
      });
      return this;
    }
  }
  
  // 测试用例
  (new LazyLog()).log(1).sleep(1000).log(2)