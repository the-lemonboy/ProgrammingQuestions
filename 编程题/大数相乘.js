function multiply(num1, num2) {
    // 处理特殊情况
    if (num1 === '0' || num2 === '0') return '0';
    
    // 将字符串转为数组，并反转便于计算
    const arr1 = num1.split('').reverse();
    const arr2 = num2.split('').reverse();
    
    // 结果数组，最大长度为两个数的长度之和
    const result = new Array(arr1.length + arr2.length).fill(0);
    
    // 模拟竖式乘法
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            // 当前位置的乘积
            const mul = arr1[i] * arr2[j];
            // 加到对应位置
            result[i + j] += mul;
        }
    }
    
    // 处理进位
    for (let i = 0; i < result.length - 1; i++) {
        result[i + 1] += Math.floor(result[i] / 10);
        result[i] = result[i] % 10;
    }
    
    // 去除前导零并返回结果
    return result.reverse()
                .join('')
                .replace(/^0+/, '') || '0';
}