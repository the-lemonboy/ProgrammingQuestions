const val = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
function compareVersions(versions) {
  return versions.sort((a, b) => {
    // 先去掉.
    const tempA = a.split(".");
    const tempB = b.split(".");
    // 找出长度最长的
    const maxLen = Math.max(tempA.length, tempB.length);
    for (let i = 0; i < maxLen; i++) {
        // 判断i位置的值是否存在，不存在则为0
      const valueA = +tempA[i] || 0;
      const valueB = +tempB[i] || 0;
      if (valueA === valueB) {
        continue;
      }
      return valueA - valueB;
    }
    return 0;
  });
}