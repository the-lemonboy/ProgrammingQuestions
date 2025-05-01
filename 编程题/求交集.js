function intersection(a, b) {
    return a.filter(item => b.includes(item))
}
function intersection(a, b) {
    let mapA = new Map()
    a.forEach((item, key) => {
        mapA.set(item, item)
    })
    let res = []
    b.forEach(item => {
        if (mapA.has(item)) {
            res.push(item)
        }
    })
    return res
}
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(intersection(array1, array2))

// some和includes区别： 
// includes：接收一个参数，表示要检查的元素值。
// some：接收一个回调函数作为参数，用于定义对每个元素的检查条件。

// 数组有哪些函数：inclueds、some、filter、reserve
// map、forEach、sort、reduce、reduceRight、split、splice、
// every、pop、push、shift、unshift、flat、flatMap
// findIndex、find、findLast、findLastIndex、indexOf
// keys、values
// concat、join、fill



function intersection2(arr1,arr2){
    const map = new Map()
    const ans = []
    arr1.forEach(item=>{
        if(typeof item === 'object' && item !== null){
            const key = JSON.stringify(item)
            map.set(key,item)
        }
    })
    for(let value1 of arr1){
        for(let value2 of arr2){
            if(typeof value2 === 'object' && value2 !== null){
                const key = JSON.stringify(value2)
                if(map.has(key)){
                    ans.push(map.get(key))
                    map.delete(key)
                }
            }else{
                if(value1 === value2){
                    ans.push(value2)
                }
            }
        }
    }
    return ans
}

const arr1 = [1,{a:1,b:2},2]
const arr2 = [{b:2,a:1},1]
console.log(intersection2(arr1,arr2))