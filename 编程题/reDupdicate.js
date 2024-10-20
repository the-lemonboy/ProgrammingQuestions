function reDupdicate(arrs){
    let hash = {}
    let result= []
    for(let val of arrs){
        if(!hash[val]){
            result.push(val)
            hash[val]  = true
        }
    }
}