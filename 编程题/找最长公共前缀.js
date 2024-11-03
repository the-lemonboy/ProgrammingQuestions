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
// 测试
console.log(findSame(['aaafsd', 'aawwewer', 'aaddfff']));  // 输出 'aa'