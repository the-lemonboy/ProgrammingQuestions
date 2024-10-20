function intersection(a,b){
   return a.filter(item=> b.includes(item))
}
function intersection(a,b){
    let mapA =  new Map()
    a.forEach((item,key)=>{
        mapA.set(item,item)
    })
    let res = []
    b.forEach(item=>{
        if(mapA.has(item)){
            res.push(item)
        }
    })
return res
}
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(intersection(array1,array2))

// some和includes区别： 
// includes：接收一个参数，表示要检查的元素值。
// some：接收一个回调函数作为参数，用于定义对每个元素的检查条件。

// 数组有哪些函数：inclueds、some、filter、reserve
// map、forEach、sort、reduce、reduceRight、split、splice、
// every、pop、push、shift、unshift、flat、flatMap
// findIndex、find、findLast、findLastIndex、indexOf
// keys、values
// concat、join、fill