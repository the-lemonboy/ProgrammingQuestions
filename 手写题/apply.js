Function.prototype.MyApply = function(thisArg,args){
    if(typeof thisArg !== 'function'){
        throw new Error('param is not a function')
    }
    thisArg = thisArg || window
    thisArg.func = this
    let result
    if(args instanceof Array){
        result = this.func(...args) 
    }else{
         result = this.func()
    }
    delete thisArg.func
    return result
}