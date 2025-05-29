const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
}

class MyPromise {
  #thenCbs = []
  #catchCbs = []
  #state = STATE.PENDING
  #value
  #onSuccessBind = this.#onSuccess.bind(this)
  #onFailBind = this.#onFail.bind(this)

  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind)
    } catch (e) {
      this.#onFail(e)
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      // then().then()
      this.#thenCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#thenCbs = []
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#catchCbs = []
    }
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      // 为什么要这一步？ 不是pending说明已经执行过了
      if (this.#state !== STATE.PENDING) return


      // 为什么要用instanceof： 遇到 promise(resolve=> new Promise(resolve=>resolve(2)) resolve(1)) 这种情况
      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind)
        return
      }

      this.#value = value
      this.#state = STATE.FULFILLED
      this.#runCallbacks()
    })
  }

  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind)
        return
      }
      // 为什么要这一步？
      if (this.#catchCbs.length === 0) {
        throw new UncaughtPromiseError(value)
      }

      this.#value = value
      this.#state = STATE.REJECTED
      this.#runCallbacks()
    })
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push(result => {
        // p.then().then(res)
        if (thenCb == null) {
          resolve(result)
          return
        }
        // 这里为什么要try catch？
        // try catch 用于捕获 thenCb 和 catchCb 回调函数执行过程中可能抛出的异常。
        // 如果不使用 try catch，一旦回调函数抛出异常，整个 Promise 链将会中断，
        // 无法正确处理错误。通过捕获异常并调用 reject，可以确保 Promise 链能够正确地传递错误，
        // 保持一致的错误处理机制。
        // --------例子
        // const promise = new MyPromise((resolve, reject) => {
        //   resolve('Initial value');
        // });
        
        // promise
        //   .then(result => {
        //     console.log(result); // 输出: Initial value
        //     throw new Error('Something went wrong'); // 故意抛出错误
        //   })
        //   .catch(error => {
        //     console.error(error); // 输出: Error: Something went wrong
        //   });
        try {
          resolve(thenCb(result))
        } catch (error) {
          reject(error)
        }
      })

      this.#catchCbs.push(result => {
        if (catchCb == null) {
          reject(result)
          return
        }

        try {
          resolve(catchCb(result))
        } catch (error) {
          reject(error)
        }
      })

      this.#runCallbacks()
    })
  }

  catch(cb) {
    return this.then(undefined, cb)
  }

  finally(cb) {
    return this.then(
      result => {
        cb()
        return result
      },
      result => {
        cb()
        throw result
      }
    )
  }
  static resolve(value) {
    return new MyPromise(resolve => {
      resolve(value)
    })
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }

  static all(promises) {
    const results = []
    let completedPromises = 0
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i]
        promise
          .then(value => {
            completedPromises++
            results[i] = value
            if (completedPromises === promises.length) {
              resolve(results)
            }
          })
          .catch(reject)
      }
    })
  }

  static allSettled(promises) {
    const results = []
    let completedPromises = 0
    return new MyPromise(resolve => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i]
        promise
          .then(value => {
            results[i] = { status: STATE.FULFILLED, value }
          })
          .catch(reason => {
            results[i] = { status: STATE.REJECTED, reason }
          })
          .finally(() => {
            completedPromises++
            if (completedPromises === promises.length) {
              resolve(results)
            }
          })
      }
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve).catch(reject)
      })
    })
  }

  static any(promises) {
    const errors = []
    let rejectedPromises = 0
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i]
        promise.then(resolve).catch(value => {
          rejectedPromises++
          errors[i] = value
          if (rejectedPromises === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"))
          }
        })
      }
    })
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error)

    this.stack = `(in promise) ${error.stack}`
  }
}

module.exports = MyPromise
