
function enhancedFetch(url, options = {}, timeout = 5000, retryCount = 3, retryDelay = 1000) {
  // 超时逻辑：返回一个可用于超时的 Promise
  function fetchWithTimeout(fetchPromise, timeout) {
    return Promise.race([
      fetchPromise,
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('请求超时')), timeout);
      }),
    ]);
  }

  // 重试逻辑：返回一个可以重试的 Promise
  function retryFetch(retries) {
    return fetchWithTimeout(fetch(url, options), timeout)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        return response.json(); // 假设请求返回 JSON
      })
      .catch((err) => {
        if (retries > 0) {
          console.warn(`请求失败，${retryDelay}ms 后重试，剩余重试次数：${retries}`);
          return new Promise((resolve) => setTimeout(resolve, retryDelay)).then(() =>
            retryFetch(retries - 1)
          );
        } else {
          throw err; // 最终重试次数用完，抛出错误
        }
      });
  }

  // 开始重试请求
  return retryFetch(retryCount);
}

// 使用示例
const url = 'https://jsonplaceholder.typicode.com/posts/1'; // 测试地址
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

enhancedFetch(url, options, 3000, 2, 1000) // 超时 3 秒，重试 2 次，重试间隔 1 秒
  .then((data) => {
    console.log('请求成功：', data);
  })
  .catch((err) => {
    console.error('请求最终失败：', err.message);
  });

  function enhancedFetch(promises, options) {
    const { retryCount, delay } = options;
  
    // 用于设置延迟的fetch函数
    function fetchWithTimeout(fetchFn) {
      return Promise.race([
        fetchFn(), // 执行 fetch 请求
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timed out')); // 请求超时
          }, delay);
        })
      ]);
    }
  
    // 执行 fetch 请求，并重试
    function getFetch(value) {
      return new Promise((resolve, reject) => {
        function tryFetch(attempt) {
          fetchWithTimeout(() => fetch(value)) // 使用 fetch 进行请求
            .then(res => {
              resolve(res); // 成功返回结果
            })
            .catch(err => {
              if (attempt < retryCount) {
                setTimeout(() => {
                  tryFetch(attempt + 1); // 重试
                }, delay);
              } else {
                reject(err); // 超过重试次数则抛出错误
              }
            });
        }
  
        tryFetch(0); // 初始调用
      });
    }
  
    // 返回所有请求的结果
    return Promise.all(promises.map(promise => getFetch(promise)));
  }

