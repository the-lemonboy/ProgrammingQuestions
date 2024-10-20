Function.prototype.myCall = function (thisArg, ...args) {
    if(typeof this !== 'function'){
        throw new Error('not function')
    }
    thisArg = thisArg || window;
    thisArg.func = this;
    const result = thisArg.func(...args)
    delete thisArg.func;
    return result;
}