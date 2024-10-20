function format(num) {
  let [value, fraction] = num.toString().split('.');
  value = value.split('').reverse();
  let ans = '';
  for (let i = 0; i < value.length; i++) {
      if (i % 3 === 0 && i !== 0) {
          ans = value[i] + ',' + ans;
      } else {
          ans = value[i] + ans;
      }
  }
  ans = ans + (fraction ? `.${fraction}` : '');
  return ans;
}

console.log(format(98276514321.02)); // 输出 9,876,514,321.02
console.log(format(1234567));       // 输出 1,234,567