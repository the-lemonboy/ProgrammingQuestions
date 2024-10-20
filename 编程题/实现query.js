// 提供了一个数组结构的 data，要求实现一个 query 方法，返回一个新的数组，query 方法内部有
//  过滤、排序、分组 等操作，并且支持链式调用，调用最终的 execute 方法返回结果：
// ----------方法一
class Query {
    constructor(data) {
      this.data = data;
      this.operations = [];
    }
  
    where(filterFn) {
      this.operations.push(data => data.filter(filterFn));
      return this;
    }
  
    sortBy(key) {
      this.operations.push(data => data.sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      return this;
    }
  
    groupBy(key) {
      this.operations.push(data => {
        return data.reduce((result, item) => {
          (result[item[key]] = result[item[key]] || []).push(item);
          return result;
        }, {});
      });
      return this;
    }
  
    execute() {
      return this.operations.reduce((result, operation) => operation(result), this.data);
    }
  }
  // ------- 方法二
  class Query {
    constructor(data) {
      this.results = data;
    }
   
    where(callback) {
      this.results = this.results.filter(callback);
      return this;
    }
   
    sortBy(callback) {
      this.results = this.results.sort(callback);
      return this;
    }
   
    groupBy(key) {
      const groups = new Map();
      this.results.forEach((item) => {
        const group = item[key];
        if (groups.has(group)) {
          groups.get(group).push(item);
        } else {
          groups.set(group, [item]);
        }
      });
      this.results = groups;
      return this;
    }
   
    execute() {
      return this.results;
    }
  }
  // --------------示例数据
  const list = [
    { id: 1, name: 'Alice', age: 22 },
    { id: 2, name: 'Bob', age: 17 },
    { id: 3, name: 'Alice', age: 25 },
    { id: 4, name: 'Charlie', age: 23 },
    { id: 5, name: 'Bob', age: 19 }
  ];
  
  // 使用 query 方法
  const result = new Query(list)
    .where(item => item.age > 18)
    .sortBy('id')
    .groupBy('name')
    .execute();
  
  console.log(result);
  