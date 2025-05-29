async function async1() {
    console.log('async1 start')
      await async2()  //同步 
    console.log('async1 end')  
  }
  
  async function async2() {
    console.log('async2')
  }
  
  console.log('script start')
  
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  
  async1()
  
  new Promise(resolve => {
    console.log('promise1')
    resolve()
  }).then(function() {
    console.log('promise2')
  })
  console.log('script end')

//      script start  |  async1 start |  async2 | promise1   | script end | async1 end | promise2 |setTimeout





async function async1() {
  console.log(1);
  await new Promise((resolve) => {
    console.log(2);
  });
  console.log(3);
  return console.log(4);
}

console.log(5);

async1().then((res) => {
  console.log(res);
  console.log(6);
});
// 5 -> 1 -> 2
// 🔍 步骤分析（结合微任务、宏任务、事件循环）：
// 	1.	执行同步代码 console.log(5) → 输出 5
// 	2.	调用 async1()，进入函数体：
// 	•	输出 1
// 	•	遇到 await new Promise(...)
// 	•	执行 new Promise(...) 本体（同步），输出 2
// 	•	resolve 没有被调用，所以该 Promise 永远 pending，不会继续往下走。
// 	•	因为 await 遇到了 pending 状态，后面的 console.log(3) 和 console.log(4) 永远不会执行
// 	3.	async1() 返回的是一个 pending 的 Promise
// 	4.	调用 .then(...)，此时不会进入回调（因为 Promise 没有被 resolve）