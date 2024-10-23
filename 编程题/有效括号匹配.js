// 思路：Map中匹配，如果匹配到右括号，找不到map
var isValid = function(s) {
    const n = s.length;
    if (n % 2 === 1) {
        return false;
    }
    const pairs = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    const stk = [];
    for (let ch of s){
        // 如果是右括号，找不到对应的左括号，返回false
        if (pairs.has(ch)) {
            if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
                return false;
            }
            stk.pop();
        } 
        else {
            stk.push(ch);
        }
    };
    return !stk.length;
};
const s = "()[]{}"
isValid(s)




function isValid(s) {
    const bracketValid = new Map([
        ['}','{'],
        [')','('],
        [']','['],
    ])
    const stack = []
    for(let val of s){
        if(bracketValid.has(val)){
            if(!stack.length || stack[stack.length-1] !== bracketValid.get(val)){
                return false
            }
            stack.pop()
        }else{
            stack.push(val)
        }
    }
}
