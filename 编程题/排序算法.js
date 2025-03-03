// 插入排序
// 和前面的比较，插入到最小的位置
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
// 归并算法 //时间复杂度nlogn 空间复杂度n
function mergeSort(arr) {
    if (arr.length < 2) return;
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    mergeSort(left);
    mergeSort(right);
    // 合并
    let l = 0, r = 0;
    while (l < left.length || r < right.length) {
      // 如果right Arr没有了 或者 left Arr还有而且当前左边小于等于右边
      if (r == right.length || (l < left.length && left[l] <= right[r]))
        arr[l + r] = left[l++];
      else
        arr[l + r] = right[r++];
    }
  }

  // 快排序   时间复杂度nlogn 空间复杂度n
  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return quickSort(left).concat(pivot, quickSort(right));
  }


  // 计数排序
  function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}


// 希尔排序
function shellSort(arr) {
  let n = arr.length;
  // 初始化步长
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    // 从 gap 开始，逐步向右遍历
    for (let i = gap; i < n; i++) {
      let temp = arr[i]; // 当前待插入的元素
      let j = i;
      
      // 按 gap 分组，对分组内的数据进行插入排序
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // 移动数据
        j -= gap; // 调整索引
      }
      
      arr[j] = temp; // 插入元素
    }
    
    // 减小步长
    gap = Math.floor(gap / 2);
  }
  
  return arr; // 返回排序后的数组
}
