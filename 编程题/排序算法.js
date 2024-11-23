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
// 选择排序关键是找到当前最小值索引只是记下，继续向后遍历，直到遍历完
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }

// 归并算法
function mergeSort(arr) {
    if (arr.length < 2) return;
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    mergeSort(left);
    mergeSort(right);
    let l = 0, r = 0;
    while (l < left.length || r < right.length) {
      if (r == right.length || (l < left.length && left[l] <= right[r]))
        arr[l + r] = left[l++];
      else
        arr[l + r] = right[r++];
    }
  }