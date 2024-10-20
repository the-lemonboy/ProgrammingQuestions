// 使用Promise实现红绿灯交替重复亮
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
function light(fn,timer){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            fn()
            resolve()
        },timer)
    })
}
// 方法1
async function step(){
   await light(red,3000)
   await light(green,2000)
   await light(yellow,1000)
   await step()
}
// 方法2
function step2(){
  Promise.resolve().then(()=>{
    return light(red,3000)
  }).then(()=>{
    return light(green,2000)
  }).then(()=>{
    return light(yellow,1000)
}).then(()=>{
    step2()
})
}
  step();


// 方法三
function* trafficLight() {
    while (true) {
        yield light(red, 3000);    // 红灯持续 3 秒
        yield light(green, 2000);  // 绿灯持续 2 秒
        yield light(yellow, 1000); // 黄灯持续 1 秒
    }
}

function startTrafficLight() {
    const generator = trafficLight(); // 创建生成器实例

    function next() {
        const { value, done } = generator.next(); // 获取生成器的下一个值

        if (!done) {
            value.then(next); // 等待 Promise 完成后再继续
        }
    }

    next(); // 启动交通灯
}

// 调用启动函数
startTrafficLight();