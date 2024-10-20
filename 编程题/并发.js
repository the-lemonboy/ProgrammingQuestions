async function sleep(n,name='test'){
    return new Promise(resolve=>{
        console.log(n,name,'start')
        setTimeout(()=>{
            console.log(n,name,'end','--------')
            resolve({n,name})
        },n*1000)
    })
}
async function asyncPool({limit,items}){
    let promises = []
    let pool = new Set()
for(let item of items){
    const fn = async item => await item()
    const promise = fn(item)
    pool.add(promise)
    const clean = ()=> pool.delete(promise)
    promise.then(clean,clean)
    if(pool.size>=limit){
        await Promise.race(pool)
    }
}
return Promise.all(promises)
}
async function start(){
    await asyncPool({
        limit:2,
        items:[
            ()=> sleep(1,'吃饭'),
            ()=> sleep(3,'睡觉'),
            ()=> sleep(5,'打游戏'),
            ()=> sleep(3.5,'学习算法'),
            ()=> sleep(4,'学习vue'),
        ]
    })
}
start()