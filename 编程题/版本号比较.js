function compareVersions(version1, version2) {
    let v1 = version1.split('.');
    let v2 = version2.split('.');
    let maxLen = Math.max(v1.length, v2.length);

    v1 = handelValue(v1, maxLen);
    v2 = handelValue(v2, maxLen);

    for (let i = 0; i < maxLen; i++) {
        if (Number(v1[i]) > Number(v2[i])) {
            return 1;
        } else if (Number(v1[i]) < Number(v2[i])) {
            return -1;
        }
    }
    return 0; // 两个版本号相等
}

function handelValue(arr, length) {
    for (let i = 0; i < length; i++) {
        if (i >= arr.length) {
            arr[i] = '0';
        }
        if (arr[i].indexOf('_') > -1) {
            arr[i] = arr[i].split('_')[0];
        }
    }
    return arr;
}

let version1 = "1.10.10_beta", version2 = "1.10.9";

console.log(compareVersions(version1, version2)); // -1
