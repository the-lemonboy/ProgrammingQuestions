// https://leetcode.cn/problems/palindromic-substrings/
// 647. 回文子串   双指针
const countSubstrings = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;

    for(let i = 0; i < 2 * strLen - 1; i++) {
        let left = Math.floor(i/2);
        let right = left + i % 2;

        while(left >= 0 && right < strLen && s[left] === s[right]){
            numOfPalindromicStr++;
            left--;
            right++;
        }
    }

    return numOfPalindromicStr;
}



// https://leetcode.cn/problems/longest-palindromic-substring/description/
// 5. 最长回文子串   双指针

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let ans = ''
    for(let i=0; i<s.length;i++){
     if(s.length % 2 !==0) helper(i,i)
     else helper(i,i+1) 
    }

    function helper(l,r){
        while(l>=0 && r<s.length && s[l] === s[r]){
            --l
            ++r
        }
        if(r - l -1 > ans.length){
            ans = s.slice(l+1,r)
        }
    }
    return ans
};



/**
 * https://leetcode.cn/problems/3sum/description/
 * 三数之和
 * 双指针，第一步：排序. 第二步：遍历数组，第三步：第一个大于0直接退出，双指针，做去重复
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            // 前后双指针
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};