
  // 思路： 1）、遍历对象； 2）、是否有parentkey；3）、判断当前是数组还是对象
  // 用Object.assign()，遍历对象，将值添加到result中
  // 如果是数组，将数组每个元素都添加到result中
//？？？ Object.assign(result,flattenObject({[newArray]:item}))为什么不用再传入key？
function flattenObject(obj, parentKey = ''){
  let result = {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      let newKey = parentKey ? `${parentKey}.${key}` : key
      // 判断是否是对象，再递归
      if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
        Object.assign(result,flattenObject(obj[key],newKey))
      }
      // 判断是否是数组，再递归数组的值
      else if(Array.isArray(obj[key])){
      obj[key].forEach((item,index)=>{
        // 如c[0]类型的字符串
        let newArray = `${newKey}[${index}]`
        // 递归数组中的值
        Object.assign(result,flattenObject({[newArray]:item}))
      })
      }else{
        result[key] = obj[key]
      }
    }
  }
  return result
}
  const nestedObject = {
    "a": {
      "b": {
        "c": {
          "d": 2
        }
      }
    },
    "aa": 2,
    'aa':3,
    "c": [1, 2]
  };
  
  const flattenedObject = flattenObject(nestedObject);
  console.log(flattenedObject);
  


