function myPromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return Promise.reject(new TypeError("Argument must be an array"));
    }
    // 处理空数组
    if (promises.length === 0) {
      return Promise.resolve([]);
    }
    const res = [];
    let counter = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((value) => {
          counter++;
          res.push(value);
          if (counter === promiseArr.length) {
            return resolve(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
}

// Promise.resolve(value)包裹value为promise
