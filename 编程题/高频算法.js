
// 实现一个函数：统计数组中每一项出现次数，并记录出现位置
function findFn(arr) {
    let findTime = new Map();
    let findSite = new Map();

    for (let i = 0; i < arr.length; i++) {
        if (findTime.has(arr[i])) {
            // 更新元素出现的次数
            findTime.set(arr[i], findTime.get(arr[i]) + 1);
            // 更新元素出现的位置
            findSite.get(arr[i]).push(i);
        } else {
            // 初次出现的元素，记录次数和位置
            findTime.set(arr[i], 1);
            findSite.set(arr[i], [i]);
        }
    }

    console.log(findTime, findSite);
}
findFn([1, 2, 3, 5, 1, 3, 2, 1, 2, 3]); // 调用时传入数组，修复了参数传递的语法错误

// Map方法：set()、get(key)、size、delect(key)、clear()、has(key)、|| (keys()、values()、entries())




// [12, 3, 24, 1, 932, 6423]按照首位排序

function sortFirst(arr) {
    return arr.sort((a, b) => {
        while (a >= 10) {
            a = Math.floor(a / 10);
        }
        while (b >= 10) {
            b = Math.floor(b / 10);
        }
        return a - b;
    });
}

const result = sortFirst([12, 3, 24, 1, 932, 6423]);
console.log(result); // 输出：[1, 3, 12, 24, 6423, 932]