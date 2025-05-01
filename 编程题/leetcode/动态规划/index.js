// https://leetcode.cn/problems/fibonacci-number/
// 斐波那契数
var fib = function(n) {
    let dp = [0, 1]
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};


// https://leetcode.cn/problems/climbing-stairs/
// 爬楼梯
var climbStairs = function(n) {
    let dp = [1 , 2]
    for(let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
};


// https://leetcode.cn/problems/longest-increasing-subsequence/description/
// 最长递增子序列
const lengthOfLIS = (nums) => {
    let dp = Array(nums.length).fill(1);
    let result = 1;
  
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        result = Math.max(result, dp[i]);
    }
  
    return result;
  };



//   https://leetcode.cn/problems/palindromic-substrings/description/
//   647. 回文子串   动态规划

const countSubstrings = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;
    let dp = Array.from(Array(strLen), () => Array(strLen).fill(false));

    for(let j = 0; j < strLen; j++) {
        for(let i = 0; i <= j; i++) {
            if(s[i] === s[j]) {
                if((j - i) < 2) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i+1][j-1];
                }
                numOfPalindromicStr += dp[i][j] ? 1 : 0;
            }
        }
    }

    return numOfPalindromicStr;
}


// https://leetcode.cn/problems/unique-paths/description/
// 不同路径
var uniquePaths = function(m, n) {
    let dp = Array.from({length:m},()=> new Array(n).fill(1))
    for(let i=1; i<m; i++){
        for(let j=1; j<n; j++){
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
};


// 128. 最长连续序列
// https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=problem-list-v2&envId=2cktkvj
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
     const sorted = [...new Set(nums)].sort((a, b) => a - b);
      let dp = new Array(sorted.length).fill(1)
     for(let i=1; i<sorted.length; i++){
         if(sorted[i] - sorted[i-1] === 1){
             dp[i] = dp[i-1] +1
         }
     }
     return Math.max(...dp)
 };