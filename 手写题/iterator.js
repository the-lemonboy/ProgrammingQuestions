function myIterator(array) {
  let index = 0;
  return {
    next: function () {
      return array.length > index ? { value: array[index++], done: false } : { value: undefined, done: true };
    },
  };
}


// 如何让obj可以迭代
function iteratorObj(obj){
  let index = 0
}