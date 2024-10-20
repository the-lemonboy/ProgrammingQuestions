// floor:向下取整
function binarySearch(arr, target) {
  // 核心：改变left或者right的指向
   let left = 0;
   let right = arr.length - 1;
 
   while (left <= right) {
     const mid = Math.floor((left + right) / 2);
     const midVal = arr[mid];
 
     if (midVal === target) {
       return mid;
     } else if (midVal < target) {
       left = mid + 1;
     } else {
       right = mid - 1;
     }
   }
   return -1; // 如果找不到目标值，返回 -1
 }
 
 // 示例
 const arr = [1, 3, 5, 7, 9, 11, 13, 15];
 const target = 9;
 const resultIndex = binarySearch(arr, target);
 console.log(resultIndex); // 输出: 4


 