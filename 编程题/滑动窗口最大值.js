function maxSlidingWindow(arr, k) {
    let ans = [];
    for (let i = 0; i <= arr.length - k; i++) {
        let window = arr.slice(i, i + k); // 取出当前窗口的所有元素
        ans.push(Math.max(...window)); // 找到当前窗口的最大值，并将其加入结果数组
    }
    return ans;
}


// 方法二
var maxSlidingWindow = function(nums, k) {
    let res = [];
    for (let i = 0; i <= nums.length - k; i++) {
        let slide = [];
        for (let j = i; j < i + k; j++) {
            slide.push(nums[j]);
        }
        res.push(Math.max(...slide));
    }
    return res;
};
let testArr = [1,3,-1,-3,5,3,6,7]
let testk = 3
console.log(maxSlidingWindow(testArr,testk))