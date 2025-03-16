//输入
var arr = [1,2,[3,4,5,[6,7,8],9],10,[11,12]];
//输出
[1,2,3,4,5,6,7,8,9,10,11,12]

function flat(arr){
  if(!Array.isArray(arr)){
    console.error("error")
    return
  }
  let res = []
  for(let value of  arr){
    if(Array.isArray(value)){
      res = res.concat(flat(value))
    }else{
      res.push(value)
    }
  }
  return res
}
console.log(flat(arr))


function flat2(arr){
  let res = []
  function search(arr){
    for(let value of arr){
      if(Array.isArray(value)){
        search(value)
      }else{
        res.push(value)
      }
    }
  }
  search(arr)
  return res
}
console.log(flat2(arr))


