var X = {
    y: { c: { d: 1 } },
    z: { e: { d: 2 } },
    q: { f: { d: 3 } },
    o: { m: { g: { h: { d: 4 } } } }
  };
  
  
  function findDValues(obj) {
    var dValues = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            // 如果当前属性值是对象，则递归搜索
            dValues = dValues.concat(findDValues(obj[key]));
          } else if (key === 'd') {
            // 如果当前属性是 'd'，将其值加入到结果数组中
            dValues.push(obj[key]);
          }
        }
      }
    return dValues;
  }
  // function findAllD(obj) {
  //   const results = [];
  
  //   function search(obj) {
  //     for (const key in obj) {
  //       if (typeof obj[key] === 'object') {
  //         search(obj[key]); // 递归调用自身
  //       } else if (key === 'd') {
  //         results.push(obj[key]);
  //       }
  //     }
  //   }
  
  //   search(obj);
  //   return results;
  // }
  console.log(findDValues(X))

