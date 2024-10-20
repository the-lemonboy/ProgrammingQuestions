Array.prototype.myFlat = function(depth = 1) {
    let res = [];
    const flattenArray = function(arr, currentDepth) {
      for (const value of arr) {
        if (Array.isArray(value) && currentDepth < depth) {
          flattenArray(value, currentDepth + 1);
        } else {
          res.push(value);
        }
      }
    };
    flattenArray(this, 1);
    return res;
  };
