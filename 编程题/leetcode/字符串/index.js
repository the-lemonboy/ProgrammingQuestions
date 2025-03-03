// https://leetcode.cn/problems/reverse-string/description/
// 344. 反转字符串
var reverseString = function(s) {
    let left = 0;
    let right = s.length-1;
    while(left<right){
        [s[left],s[right]] = [s[right],s[left]]
        left++
        right--
    }
    return s
};


// https://leetcode.cn/problems/reverse-string-ii/description/
// 541. 反转字符串 II
var reverseStr = function(s, k) {
    let ans = []
    const sArr = s.split('')
        while(sArr.length > 0){
        ans.push(...sArr.splice(0,k).reverse())
        if(sArr.length > 0){
              ans.push(...sArr.splice(0,k))
        }
    }
    return ans.join('')
};