function promise(){
    new promise((resolve, reject) => {
        if(success){
            resolve()
        }else{
            reject()
        }
    })
}