function reverseStr(str) {
    // 将字符串转换为数组
    let arr = str.split('');
    
    // 使用双指针法交换字符
    for (let i = 0; i < arr.length / 2; i++) {
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }
    
    // 将数组转换回字符串
    return arr.join('');
}

console.log(reverseStr('hello')); // 输出: "olleh"