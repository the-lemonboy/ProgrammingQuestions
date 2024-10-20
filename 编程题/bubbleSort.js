function bubbleSort(arr){
    for(let i = 0; i<arr.length-1; i++){
        for(let j  = i+1; j<arr.length -1; j++){
            if(arr[i]>arr[j]){
                [arr[i],arr[j]]=[arr[j],arr[i]]
            }
        }
    }
    return arr
}
let value = [2,1,4,5,2,3]