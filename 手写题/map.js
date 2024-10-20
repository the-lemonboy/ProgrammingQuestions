// Array.prototype.myMap = function(fn, thisArg)：将自定义的 map 方法添加到数组原型上，使得所有数组实例都可以调用这个方法。这个方法接受两个参数：fn 是要对数组中的每个元素执行的回调函数，thisArg 是执行回调函数时的 this 指向。

// if (typeof fn !== 'function') { throw new Error() }：首先检查传入的回调函数是否是一个函数，如果不是则抛出错误。

// let curArray = this：将当前数组赋值给 curArray 变量，以便后续操作。

// let result = []：创建一个空数组 result，用于存放处理后的结果。

// for (let i = 0; i < curArray.length; i++)：遍历当前数组的每个元素。

// result.push(fn.apply(thisArg, [curArray[i], i, curArray]))：对数组的每个元素调用回调函数 fn，并将结果添加到 result 数组中。使用 apply 方法将 thisArg 作为回调函数中的 this，并传入当前元素、当前索引和原数组作为参数。

// return result：返回处理后的新数组 result
Array.prototype.myMap =  function(fn,thisArg){
    if(typeof fn !== 'function'){
        throw new Error()
    }
    let curArray = this
    let result = []
    for(let i = 0; i<curArray.length; i++){
        result.push(fn.apply(thisArg, [curArray[i],i,curArray]))
    }
    return result
} 