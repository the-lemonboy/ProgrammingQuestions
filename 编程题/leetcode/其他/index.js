  // https://leetcode.cn/problems/merge-intervals/description/
//   合并区间
var merge = function(intervals) {
    intervals.sort((p, q) => p[0] - q[0]);
    const res = []
    for(let value of intervals){
        if(res.length && value[0]<=res[res.length-1][1]){
            res[res.length-1][1] =  Math.max(res[res.length - 1][1], value[1]);
        }else{
            res.push(value)
        }
    }
    return res
};

// https://leetcode.cn/problems/sliding-window-maximum/description/
// 滑动窗口最大值
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



// https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
// 无重复字符的最长子串
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};




// // https://leetcode.cn/problems/string-compression/
// 字符串压缩
var compress = function(chars) {
    let write = 0; // 写入的位置
    let count = 1; // 记录连续字符的个数

    for (let i = 1; i <= chars.length; i++) {
        if (i < chars.length && chars[i] === chars[i - 1]) {
            count++; // 连续字符，计数加 1
        } else {
            chars[write++] = chars[i - 1]; // 写入当前字符
            if (count > 1) {
                // 写入计数
                const countStr = count.toString();
                for (let c of countStr) {
                    chars[write++] = c; // 将计数每位字符写入
                }
            }
            count = 1; // 重置计数
        }
    }

    return write; // 返回压缩后的长度
};
// 法二
var compress = function(chars) {
    let ans = []; // 用于存储压缩后的结果
    let count = 0; // 计数连续字符

    for (let i = 0; i < chars.length; i++) {
        count++; // 当前字符计数加 1

        // 如果当前字符和下一个字符不同，或者到达数组末尾
        if (i === chars.length - 1 || chars[i] !== chars[i + 1]) {
            ans.push(chars[i]); // 把当前字符加入结果数组
            if (count > 1) {
                // 如果计数大于 1，将计数转换为字符串并逐字符加入结果数组
                ans.push(...count.toString());
            }
            count = 0; // 重置计数器
        }
    }

    // 将结果覆盖原数组
    for (let i = 0; i < ans.length; i++) {
        chars[i] = ans[i];
    }

    return ans.length; // 返回新数组的长度
};



// https://leetcode.cn/problems/longest-common-prefix/
// 最长公共前缀
function findSame(arr) {
    if (!arr || arr.length === 0) return '';
    
    return arr.reduce((prefix, current) => {
        let i = 0;
        // 比较当前累积的前缀与当前字符串
        while (i < prefix.length && i < current.length && prefix[i] === current[i]) {
            i++;
        }
        // 返回共同前缀部分
        return prefix.slice(0, i);
    });
}


function findSame(arr){
    arr.reduce((acc,pre)=>{
      let count = 0
      while(acc[count] === pre[count] && acc.length > count && pre.length > count){
        count ++
      }  
      return acc.slice(0,count)
    })
}

// 搜索二维矩阵
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




// 53. 最大子数组和
// https://leetcode.cn/problems/maximum-subarray/description/
var maxSubArray = function(nums){
    let pre=0, maxNum = nums[0]
    nums.forEach(item=>{
        pre = Math.max(item, pre+item)
        maxNum = Math.max(pre,maxNum)
    })
    return maxNum
}



