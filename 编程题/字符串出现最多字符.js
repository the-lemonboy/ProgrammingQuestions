// 查找字符串中出现最多的字符和个数
function findMostStr(str) {
    let map = new Map();
    // 创建hash
    for (let i = 0; i < str.length; i++) {
        if (map.has(str[i])) {
            map.set(str[i], map.get(str[i]) + 1);
        } else {
            map.set(str[i], 1);
        }
    }
    let max = 0;
    let maxStr = '';
    for (let [key, value] of map) {
        if (value > max) {
            max = value;
            maxStr = key;
        }
    }
    return [maxStr, max];
}

// 题目： 输入一个字符串，找到第一个不重复字符的下标

// 输入： 'abcabcde'

// 输出： 6

function firstUniqueCharIndex(str) {
    const charCount = {};
  
    // 第一次遍历字符串，记录每个字符出现的次数
    for (let char of str) {
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }
  
    // 第二次遍历字符串，找到第一个出现次数为1的字符
    for (let i = 0; i < str.length; i++) {
      if (charCount[str[i]] === 1) {
        return i;
      }
    }
  
    // 如果没有找到不重复的字符，返回 -1
    return -1;
  }
  
  // 测试用例
  const input = 'abcabcde';
  const result = firstUniqueCharIndex(input);
  console.log(result); // 输出：6