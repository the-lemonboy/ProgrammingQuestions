
// https://leetcode.cn/problems/search-a-2d-matrix/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    for(let i=0; i<=matrix.length-1; i++){
     const  flag =  binarySearch(matrix[i],target)
     if(flag === 'next' && i<=matrix.length -1){
        continue
     }else if(flag === true){
        return true
     }
    }
    return false
};
function binarySearch(arr,target){
    let left = 0
    let right = arr.length
    if(target>arr[right-1] || target<arr[left]){
        return 'next'
    }
    for(let i=0; i<=arr.length -1; i++){
        let mid = Math.floor((left+right)/2)
        if(arr[mid]>target){
            right = mid-1
        }else if(arr[mid]<target){
            left = mid+1
        }else{
            return true
        }
    }
    return 'next'
}