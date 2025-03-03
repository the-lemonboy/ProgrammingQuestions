
const STATE = {
    PENDING: 'pending',
    FULFILlED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    #state
    #thenCbs = []
    #catchCbs = []
    #onSucessBind = this.#onSucess.bind(this)
    #onFailBind = this.#onFail.bind(this)
    constructor(cb) {
        try {
            cb(this.#onSucessBind,this.#onFailBind)
        } catch (e) {
            this.#onFial(e)
        }
    }
    #runCallBack(){
        if(this.#state === STATE.FULFILlED){
            this.#thenCbs.forEach(cb=>{
                cb(this.#value)
            })
            this.#thenCbs = []
        }
        if(this.#state === STATE.REJECTED){
            this.#catchCbs.forEach(cb=>{
                cb(this.#value)
            })
            this.#catchCbs = []
        }
    }
    #onSucesse(value) {
        queueMicrotask(() => {
            if (value !== STATE.PENDING) return
            this.#thenCbs.push(value)
            this.#state = STATE.FULFILlED
            this.#runCallBack()
        })

    }
    #onFial(value) {
        queueMicrotask(() => {
            if (value !== STATE.PENDING) return
            this.#catchCbs.push(value)
            this.#state = STATE.REJECTED
            this.#runCallBack()
        })
    }
    then(thenCb,catchCb){
        return new MyPromise((resolve,reject)=>{
            this.#thenCbs.push(result=>{
                if(resolveCb === null){
                    resolve(result)
                    return
                }
                try{
                    resolve(thenCb)
                }catch(e){
                    reject(e)
                }
            })
            
        })
    }
}