
// {
//     "a": {
//       "b": {
//         "c": {
//           "d": 1
//         }
//       }
//     },
//     "aa": 2,
//     "c": [
//       1,
//       2
//     ]
//   } =>
//   { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
  对象扁平化
function flattenObject(obj, parentKey = '') {
    const result = {};
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let newKey = parentKey ? `${parentKey}.${key}` : key;
  
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          // 如果属性是对象并且不是数组，则递归扁平化
          Object.assign(result, flattenObject(obj[key], newKey));
        } else if (Array.isArray(obj[key])) {
          // 如果属性是数组，则将数组每个元素都扁平化
          obj[key].forEach((item, index) => {
            let arrayKey = `${newKey}[${index}]`;
            Object.assign(result, flattenObject({ [arrayKey]: item }));
          });
        } else {
          // 否则直接添加到结果中
          result[newKey] = obj[key];
        }
      }
    }
  
    return result;
  }
  
  const nestedObject = {
    "a": {
      "b": {
        "c": {
          "d": 1
        }
      }
    },
    "aa": 2,
    "c": [1, 2]
  };
  
  const flattenedObject = flattenObject(nestedObject);
  console.log(flattenedObject);
  