class PubSub {
  constructor() {
    this.events = {};
  }
  // 订阅
  subscribe(cb, type) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }
  // 发布
  publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((cb) => cb(...args));
    }
  }
  // 取消订阅方法
  unsubscribe(type, cb) {
    if (this.events[type]) {
      const cbIndex = this.events[type].findIndex((e) => e === cb);
      if (cbIndex != -1) {
        this.events[type].splice(cbIndex, 1);
      }
    }
    if (this.events[type].length === 0) {  
      delete this.events[type];
    }
  }
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}


// 创建 PubSub 实例
const pubSub = new PubSub();

// 订阅事件
pubSub.subscribe((message) => {
  console.log(`Received message: ${message}`);
}, 'message');

// 发布事件
pubSub.publish('message', 'Hello, World!');

// 取消订阅事件
const callback = (message) => {
  console.log(`Another callback received message: ${message}`);
};
pubSub.subscribe(callback, 'message');
pubSub.unsubscribe('message', callback);

// 发布事件
pubSub.publish('message', 'This message should only be received by the first subscriber.');

// 取消所有订阅
pubSub.unsubscribeAll('message');

// 发布事件
pubSub.publish('message', 'This message should not be received by any subscriber.');