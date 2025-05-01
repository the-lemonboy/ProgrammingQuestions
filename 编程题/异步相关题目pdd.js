// 异步相关实现： 实现一个名为executeTasks的函数，
// 该函数接受两个参数：tasks：一个包含三个任务的数组([task1,task2,task3]),每个任务是一个返回Promise的函数
// retries：最大重试次数
// 函数要求：1、返回一个Promise对象。
// 2、任务必须是串行
// 3、如果任务执行成功，则继续执行下一个
// 4、如果任务执行失败，则重试该任务，直到成功或达到最大重试次数retries。
// 5、如果达到最大重试次数仍未成功，则抛出异常

async function executeTasks(tasks = [], retries = 3) {
    const results = []
  
    for (const task of tasks) {
      let attempts = 0
      let success = false
  
      while (attempts < retries) {
        try {
          const result = await task()  // 一定要调用 task()
          results.push(result)
          success = true
          break  // 成功就跳出 retry 循环
        } catch (err) {
          attempts++
          if (attempts >= retries) {
            throw new Error(`Task failed after ${retries} retries: ${err}`)
          }
        }
      }
  
      if (!success) {
        // 理论上这个不会触发，防御性判断
        throw new Error('Unknown failure.')
      }
    }
  
    return results
  }