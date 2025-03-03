const { default: config } = require("uview-plus/libs/config/config")

function deepClone(obj){
    if(typeof obj === 'object' && obj !== null){
        let result = Array.isArray(obj) ? [] : {}
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] === 'object' && obj[key] !== null){
                     result[key] = deepClone(obj[key])
                }else{
                     result[key] = obj[key]
                }
            }
        }
       return result
    }else{
        return obj
    }
}

function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
