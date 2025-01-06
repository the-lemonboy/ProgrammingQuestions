// https://leetcode.cn/problems/palindromic-substrings/
// 647. 回文子串
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
// 5. 最长回文子串

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