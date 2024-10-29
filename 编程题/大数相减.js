function bigNumberSubtract(num1, num2) {
    // 确保 num1 大于或等于 num2，便于相减，否则交换两数
    let isNegative = false;
    if (num1.length < num2.length || (num1.length === num2.length && num1 < num2)) {
      [num1, num2] = [num2, num1];
      isNegative = true;
    }
  
    // 将两个数字倒序排列，方便从低位到高位逐位相减
    const arr1 = num1.split("").reverse();
    const arr2 = num2.split("").reverse();
    const result = [];
    
    let borrow = 0;
    for (let i = 0; i < arr1.length; i++) {
      // 当前位数值，减去对方的数字和借位
      let digit1 = parseInt(arr1[i]);
      let digit2 = i < arr2.length ? parseInt(arr2[i]) : 0;
      let diff = digit1 - digit2 - borrow;
      
      // 如果 diff 小于 0，则需要借位
      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      
      result.push(diff);
    }
    
    // 移除前导零
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }
    
    // 还原顺序并返回结果
    return (isNegative ? '-' : '') + result.reverse().join('');
  }
  
  // 测试
  console.log(bigNumberSubtract("1000000000000000000000", "999999999999999999999")); // 输出: "1"
  console.log(bigNumberSubtract("5000", "1000")); // 输出: "4000"
  console.log(bigNumberSubtract("1000", "5000")); // 输出: "-4000"
  console.log(bigNumberSubtract("1000", "5000")); // 输出: "-4000"
  console.log(bigNumberSubtract("1", "-100"));