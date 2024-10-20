// Array.prototype.MyFilter = function(func){
//     if(typeof func !== 'function'){
//         throw new Error('参数不是一个函数')
//     }
//     const result = []
//     for(let i=0; i<this.length; i++){
//         func(this[i]) && result.push(this[i])
//     }
//     return result
// }

Array.prototype.MyFilter2 = function(func,thisArgs){
    if(typeof func !== 'function'){
        throw new Error('参数不是一个函数')
    }
    const result = []
    let curArray = this
    for(let i = 0; i<curArray.length; i++){
        // thisArgs确保this指向func内部
        if(func.call(thisArgs,curArray[i],i,curArray)){
            result.push(curArray[i])
        }
    }
    return result
}



let a = [1,2,2,4,5,6]
let res = a.MyFilter2((item,i)=>{
    return a>3
})