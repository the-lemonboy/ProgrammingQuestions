class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 取消订阅事件
  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((fn) => fn !== listener);
  }

  // 只订阅一次事件
  once(event, listener) {
    const onceListener = (...args) => {
      listener.apply(this, args);
      this.off(event, onceListener); // 触发后移除
    };
    this.on(event, onceListener);
  }

  // 触发事件
  trigger(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => {
      listener.apply(this, args);
    });
  }
}

// 示例用法
const emitter = new EventEmitter();

function logData(data) {
  console.log("logData:", data);
}

// 订阅事件
emitter.on("data", logData);

// 只订阅一次
emitter.once("data", (data) => {
  console.log("This will only log once:", data);
});

// 触发事件
emitter.trigger("data", "Hello World"); // 两个监听器都会执行
emitter.trigger("data", "Another Event"); // 只有 logData 会执行

// 取消订阅
emitter.off("data", logData);

// 再次触发时没有监听器
emitter.trigger("data", "This will not be logged");
