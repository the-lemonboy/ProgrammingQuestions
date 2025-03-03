// https://github.com/LuckyWinty/fe-weekly-questions/issues/21
// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan('Hank')输出:
// Hi! This is Hank!
// LazyMan('Hank').sleep(10).eat('dinner')输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
// LazyMan('Hank').sleep(10).eat('dinner').eat('supper')输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
// LazyMan('Hank').sleepFirst(5).eat('supper')输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper~
// 以此类推。
function LazyMan(name) {
    if(!(this instanceof LazyMan)){
        return new LazyMan(name)
    }
  const cb = (next)=>{
      console.log(`Hi This is ${name}!`)
      next()
  }
  this.cbs = [cb];
  setTimeout(()=>{
    this.next()
  },0)
}
LazyMan.prototype.eat = function (food){
    const cb = (next)=>{
        console.log(`Eat ${food}~`)
        next()
    } 
    this.cbs.push(cb);
    return this
}
LazyMan.prototype.sleepFirst = function (time){
    const cb = (next)=>{
        setTimeout(()=>{
            next()
        },time*1000) 
    } 
    this.cbs.unshift(cb);
    return this
}
LazyMan.prototype.sleep = function(time){
    const cb = (next)=>{
        setTimeout(()=>{
            next()
        },time*1000) 
    } 
    this.cbs.push(cb);
    return this
}
LazyMan.prototype.next = function(){
    if(this.cbs.length <= 0)return
    const first = this.cbs.shift()
    first(this.next.bind(this))
}



// -------------   法二
class LazyManClass {
    constructor(name) {
      this.name = name;
      this.tasks = [];
  
      // 将打印消息任务加入队列
      this.tasks.push(() => {
        console.log(`Hi! This is ${name}!`);
        this.next();
      });
  
      // 异步执行任务队列
      setTimeout(() => this.next(), 0);
    }
  
    // 执行队列中的下一个任务
    next() {
      const task = this.tasks.shift();
      if (task) {
        task();
      }
    }
  
    // sleep 方法，延迟指定秒数后继续执行任务
    sleep(seconds) {
      this.tasks.push(() => {
        setTimeout(() => {
          console.log(`Wake up after ${seconds}`);
          this.next();
        }, seconds * 1000);
      });
      return this;
    }
  
    // sleepFirst 方法，优先延迟指定秒数
    sleepFirst(seconds) {
      this.tasks.unshift(() => {
        setTimeout(() => {
          console.log(`Wake up after ${seconds}`);
          this.next();
        }, seconds * 1000);
      });
      return this;
    }
  
    // eat 方法，立即打印内容后继续执行
    eat(food) {
      this.tasks.push(() => {
        console.log(`Eat ${food}~`);
        this.next();
      });
      return this;
    }
  }
  
  // 工厂函数，便于调用
  function LazyMan(name) {
    return new LazyManClass(name);
  }
  
  // 测试用例
//   LazyMan('Hank');
//   LazyMan('Hank').sleep(10).eat('dinner');
  LazyMan('Hank').sleep(10).eat('dinner').eat('supper');
//   LazyMan('Hank').sleepFirst(5).eat('supper');
