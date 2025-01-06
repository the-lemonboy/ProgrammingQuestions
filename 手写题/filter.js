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
        // thisArgs确保this指向func内部    curArray是filter的第一个参数，i是filter第二个参数序号
        // 逻辑: func绑定参数，如果func正确就push
        if(func.call(thisArgs,curArray[i],i,curArray)){
            result.push(curArray[i])
        }
    }
    return result
}