const STATE = {
    'PENDDING': 'pendding',
    'FULFILLED': 'fulfilled',
    'REJECTED': 'rejected'
}

class MyPromise {
    #value
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDDING
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
            this.#thenCbs.forEach(cb => {
                cb(this.#value)
            })
            this.#thenCbs = []
        }
        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(cb => {
                cb(this.#value)
            })
            this.#catchCbs = []
        }

    }
    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDDING) return
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
            if (this.#state !== STATE.PENDDING) return
            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind)
                return
              }
              if (this.#catchCbs.length === 0) {
                throw new UncaughtPromiseError(value)
              }
            this.#value = value
            this.#state = STATE.REJECTED
            this.#runCallbacks()
        })
    }
    then(thencb, catchcb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push(result => {
                if (thencb == null) {
                    resolve(result)
                    return
                }
                try {
                    resolve(thencb(result))
                } catch (e) {
                    reject(e)
                }
            })
            this.#catchCbs.push(result => {
                if (catchcb == null) {
                    reject(result)
                    return
                }
                try {
                    resolve(catchcb(result))
                } catch (e) {
                    reject(e)
                }
            })
            this.#runCallbacks()
        })
    }
    catch(cb) {
        return this.then(undefined, cb)
    }
    finally(cb) {
        return this.then(result => {
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
    
    static all(promises){
        let res = []
        return new MyPromise((resolve,reject)=>{
            for(let pr of promises){
                pr.then(value=>{
                    res.push(value)
                    if(res.length === promises.length){
                        resolve(res)
                    }
                }).catch(e=>{
                    reject(e)
                })
            }
        })
    }
    static allSettled(promises){
        let count = 0
        let res = []
        return new MyPromise((resolve,reject)=>{
            for(let pr of promises){
                pr.then(value=>{
                    res.push({status:STATE.FULFILLED, value})
                  
                }).catch(reason=>{
                    res.push({status:STATE.REJECTED, reason})
                }).finally(()=>{
                    count++ 
                    if(count === res.length){
                        resolve(res)
                    }
                })
            }
        })
    }
    static race(promises){
        return new MyPromise((resolve,reject)=>{
            for(let pr of promises){
                pr.then(resolve).catch(reject)
            }
        })
    }
    static any(promises){
       return new MyPromise((resolve,reject)=>{
        let errors = [] 
        for(let pr of promises){
            pr.then(res=>{
                resolve(res)
            }).catch(e=>{
                errors.push(e)
                if(errors.length === promises.length){
                   reject(new AggregateError(errors))
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
