
// https://leetcode.cn/problems/valid-parentheses/
// 20. 有效的括号
// 思路：Map中匹配，如果匹配到右括号，找不到map
var isValid = function(s) {
    let pairs = new Map([
     [')','('],
     ['}','{'],
     [']','['],
    ])
    const stack = []
    for(let ch of s){
        // 遇到左括号
     if(pairs.has(ch)){
         if(!stack.length || stack[stack.length -1] !== pairs.get(ch)){
             return false
         }
         stack.pop()
     }
    //  遇到右括号
     else{
        stack.push(ch)
    }
    }

 };
