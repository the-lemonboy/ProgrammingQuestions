// 实现 createObject 函数， 用例如下；

// 比如：
const obj = createObject({ name: "name" });

obj.name = "name2"; // 错误， 禁止修改；
obj.set("name", "name2"); // 正确方式， 允许修改；
obj.set("address.info", "chongqing"); // 正确方式， 允许添加属性。


function createObject(initialData) {
    const data = { ...initialData }; // 浅拷贝初始数据
  
    return new Proxy(data, {
      set(target, property, value, receiver) {
        // 禁止直接修改任何属性
        throw new Error(`Direct assignment is not allowed. Use obj.set('property', value) instead.`);
        // 或者静默拒绝修改（不抛出错误）：
        // return false;
      },
  
      get(target, property, receiver) {
        if (property === 'set') {
          // 返回一个方法用于安全设置属性
          return function (path, value) {
            const keys = path.split('.');
            let current = target;
  
            // 遍历路径，确保中间对象存在
            for (let i = 0; i < keys.length - 1; i++) {
              const key = keys[i];
              if (!Reflect.has(current, key) || typeof Reflect.get(current, key) !== 'object') {
                Reflect.set(current, key, {});
              }
              current = Reflect.get(current, key);
            }
  
            // 设置最终属性
            const lastKey = keys[keys.length - 1];
            Reflect.set(current, lastKey, value);
            return true;
          };
        }
  
        // 其他属性直接返回
        return Reflect.get(target, property, receiver);
      }
    });
  }