function PromiseRace(arrs){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(arrs)){
             reject('is not a Array')
        }
        for(let i=0; i<arrs.length; i++){
            arrs[i].then(resolve,reject)
        }
    })
}
