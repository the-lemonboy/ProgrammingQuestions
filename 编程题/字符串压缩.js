
function compressString(str) {
    let res = '';
    let count = 1;
    for(let i =1; i<=str.length; i++){
        if(str[i] === str[i-1]){
            count++;
        }else{
            if(count > 1){
                res = `${res}${count}${str[i-1]}`
            }else{
                res = `${res}${str[i-1]}`
            }
            count = 1;
        }
    }
    return Array.from(res)
}
const str = 'aaabbbccca'
console.log(compressString(str))

// // https://leetcode.cn/problems/string-compression/
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


function permute(nums){
    const path = []
    const res = []
    function backTracking(arr,len,used = []){
        if(path.length === len){
            const curPath = Array.from(path)
            res.push(path)
            return
        }
        for(let i=0; i<arr.length; i++){
            if(used[i-1] === true && arr[i-1] === arr[i]) continue
            if(used[i]) continue
            path.push(arr[i])
            used[i] = true
            backTracking(arr,len,used)
            path.pop()
            used[i] = false
        }
    }
}