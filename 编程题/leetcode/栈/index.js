
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
        // 遇到右括号
     if(pairs.has(ch)){
         if(!stack.length || stack[stack.length -1] !== pairs.get(ch)){
             return false
         }
         stack.pop()
     }
    //  遇到左括号
     else{
        stack.push(ch)
    }
    }

 };



 // https://leetcode.cn/problems/trapping-rain-water/description/
// 接雨水
//单调栈 js数组作为栈
var trap = function(height) {
    const len = height.length;
    if(len <= 2) return 0; // 可以不加
    const st = [];// 存着下标，计算的时候用下标对应的柱子高度
    st.push(0);
    let sum = 0;
    for(let i = 1; i < len; i++){
        if(height[i] < height[st[st.length - 1]]){ // 情况一
            st.push(i);
        }
        if (height[i] == height[st[st.length - 1]]) {  // 情况二
            st.pop(); // 其实这一句可以不加，效果是一样的，但处理相同的情况的思路却变了。
            st.push(i);
        } else { // 情况三
            while (st.length !== 0 && height[i] > height[st[st.length - 1]]) { // 注意这里是while
                let mid = st[st.length - 1];
                st.pop();
                if (st.length !== 0) {
                    let h = Math.min(height[st[st.length - 1]], height[i]) - height[mid];
                    let w = i - st[st.length - 1] - 1; // 注意减一，只求中间宽度
                    sum += h * w;
                }
            }
            st.push(i);
        }
    }
    return sum;
};

// 739. 每日温度
// https://leetcode.cn/problems/daily-temperatures/
var dailyTemperatures = function (temperatures) {
    let n = temperatures.length;
    let ans = new Array(n).fill(0); // 初始化结果数组为 0
    let stack = [];  //存入下标

    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let index = stack.pop();
            ans[index] = i - index;
        }
        stack.push(i);
    }

    return ans;
};
