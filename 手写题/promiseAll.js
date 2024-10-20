
function myPromiseAll(promiseArr){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promiseArr)){
            console.error(reject+"promise")
        }
        const res = []
        let counter = 0
        for(let i=0 ;i<promiseArr.length; i++){
            Promise.resolve(promiseArr[i]).then(value=>{
                counter++
                res.push(value)
                if(counter === promiseArr.length){
                    return resolve(res)
                }
            }).catch(err=>{
                console.error(err)
            })
        } 
    })
}


// Promise.resolve(value)包裹value为promise
