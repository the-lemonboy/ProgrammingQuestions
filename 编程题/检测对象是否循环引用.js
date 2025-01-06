function isCircleUse(obj) {
    const setDic = new Set();
    
    function checkFn(checkObj) {
        if (checkObj && typeof checkObj === 'object') {
            if (setDic.has(checkObj)) {
                return true;
            }
            setDic.add(checkObj);
            for (let key in checkObj) {
                if (checkFn(checkObj[key])) {
                    return true;
                }
            }
        }
        return false;
    }
    
    return checkFn(obj);
}

let a = {};
let b = {a: a};
a.b = b;

console.log(isCircleUse(a)); // 输出 true

let c = {d: {}};
console.log(isCircleUse(c)); // 输出 false