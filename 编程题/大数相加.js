// 输入：num1 = '1234567890', num2 = '987654321'
// 输出：'2222222211'

function bigSum(num1, num2) {
    let num1Arr = num1.split('').reverse();  // 将字符串转换为数组并反转
    let num2Arr = num2.split('').reverse();
    let maxLen = Math.max(num1Arr.length, num2Arr.length);  // 获取较长的长度
    let ans = '';
    let carry = 0;
    for (let i = 0; i < maxLen; i++) {
        // 判断是否还是数
        let digit1 = i < num1Arr.length ? Number(num1Arr[i]) : 0;
        let digit2 = i < num2Arr.length ? Number(num2Arr[i]) : 0;
        let sum = digit1 + digit2 + carry;

        if (sum >= 10) {
            carry = 1;
            sum -= 10;
        } else {
            carry = 0;
        }

        ans = sum + ans;
    }

    if (carry) {
        ans = carry + ans;
    }
    return ans;
}
// 输入：num1 = '1234567890', num2 = '987654321'
// 输出：'2222222211'
let num1 = '1234567890'
let num2 = '987654321'

console.log(bigSum(num1,num2))
