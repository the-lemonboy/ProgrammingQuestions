class _Promise {
    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '拒绝';
  
  
    constructor(func) {
      this.status = _Promise.PENDING;
      this.result = null;
      this.resolveCallbacks = [];
      this.rejectCallbacks = [];
      try {
        func(this.resolve.bind(this), this.reject.bind(this));
      } catch (error) {
        this.reject(error);
      }
    }
  
  
    resolve(result) {
      setTimeout(() => {
        if (this.status === _Promise.PENDING) {
          this.status = _Promise.FULFILLED;
          this.result = result;
          this.resolveCallbacks.forEach(callback => {
            callback(result);
          });
        }
      });
    }
  
  
    reject(result) {
      setTimeout(() => {
        if (this.status === _Promise.PENDING) {
          this.status = _Promise.REJECTED;
          this.result = result;
          this.rejectCallbacks.forEach(callback => {
            callback(result);
          });
        }
      });
    }
  
  
  
    then(onFULFILLED, onREJECTED) {
      return new _Promise((resolve, reject) => {  //实现链式调用
        onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {};  //如果不是function传空函数，防止resolve不是函数
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {};
  
  
        const fulfillCallback = () => {
          try {
            const result = onFULFILLED(this.result);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        const rejectCallback = () => {
          try {
            const result = onREJECTED(this.result);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
  
  
        if (this.status === _Promise.PENDING) {
          this.resolveCallbacks.push(fulfillCallback);
          this.rejectCallbacks.push(rejectCallback);
        }
  
  
        if (this.status === _Promise.FULFILLED) {
          setTimeout(() => {
            fulfillCallback();
          });
        }
  
  
        if (this.status === _Promise.REJECTED) {
          setTimeout(() => {
            rejectCallback();
          });
        }
      });
    }
  }