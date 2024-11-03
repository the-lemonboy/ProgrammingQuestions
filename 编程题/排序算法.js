// 插入排序
function insertionSort(arr) {
    if(arr.length <= 1) return arr;
    for(let i = 1; i < arr.length; i++) {
        for(let j = i; j > 0; j--) {
            if(arr[j] < arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}
// 冒泡排序
function bubbleSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}
// 选择排序
function selectionSort(arr){

}

// 归并算法