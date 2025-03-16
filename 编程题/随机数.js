// 获取范围内的随机数
function getRandomArbitrary(min,max){
    return Math.random() * (max - min) + min
}


// 获取0-x的整数随机数
function getRandomInt(max){
    return Math.floor(Math.random() * max)
}


// 获取x-y之间的整数随机数，包含x不包含y
function getRandomArbitrary2(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// 获取x-y之间的整数随机数，不包含x包含y
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
  }
  