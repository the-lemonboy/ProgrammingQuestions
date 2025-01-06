const undefinedToNull = (arg) => {
    for(let key in arg){
      if(typeof arg[key] === 'undefined'){
        arg[key] = null;
      }
      
      if(typeof arg[key] === 'object'){
        undefinedToNull(arg[key])
      }
    }
    return arg
    };
    undefinedToNull({a: undefined, b: 'BFE.dev'})
    undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})

    // https://bigfrontend.dev/zh/problem/what-is-composition-create-a-pipe
    // 现在需要你自己写一个pipe() 方法。
    function pipe(funcs){
      return function(args){
        return funcs.reduce((result,fn)=> fn.call(this,result),args)
      }
    }


    // 实现json.parse
    // https://bigfrontend.dev/zh/problem/implement-JSON-parse/discuss
    function parse(str) {
      if(str === '') {
        throw Error();
      }
      if(str[0] === "'") {
        throw Error();
      }
      if(str === 'null') {
        return null;
      }
      if(str === '{}') {
        return {};
      }
      if(str === '[]') {
        return [];
      }
      if(str === 'true') {
        return true;
      }
      if(str === 'false') {
        return false;
      }
      if(str[0] === '"') {
        return str.slice(1, -1);
      }
      // +str === +str解决NaN问题
      if(+str === +str) {
        return Number(str);
      }
      if(str[0] === '{') {
        return str.slice(1, -1).split(',').reduce((acc, item) => {
          const index = item.indexOf(':');
          const key = item.slice(0, index)
          const value = item.slice(index + 1);
          acc[parse(key)] = parse(value);
          return acc;
        }, {});
      }
      if(str[0] === '[') {
        return str.slice(1, -1).split(',').map((value) => parse(value));
      }
    }
    


    // 实现json.stringify
    // https://bigfrontend.dev/zh/problem/implement-JSON-stringify/discuss
    /**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
  if(typeof data === 'bigint') {
    throw new Error('Do not know how to serialize a BigInt at JSON.stringify');
  } 
  if(typeof data === 'string') {
    return `"${data}"`;
  } 
  if(typeof data === 'function') {
    return undefined;
  }
  if(data !== data) {
    return 'null';
  }
  if(data === Infinity) {
    return 'null';
  }
  if(data === -Infinity) {
    return 'null';
  }
  if(typeof data === 'number') {
   return `${data}`;
  }
  if(typeof data === 'boolean') {
    return `${data}`;
  }
  if(data === null) {
    return 'null';
  }
  if(data === undefined) {
    return 'null';
  }
  if(typeof data === 'symbol') {
    return 'null';
  }
  if(data instanceof Date) {
    return `"${data.toISOString()}"`;
  }
  if(Array.isArray(data)) {
    const arr = data.map((el) => stringify(el));
    return `[${arr.join(',')}]`;
  }
  if(typeof data === 'object') {
    const arr = Object.entries(data).reduce((acc, [key, value]) => {
      if(value === undefined) {
        return acc;
      }
      acc.push(`"${key}":${stringify(value)}`);
      return acc;
    }, [])
    return `{${arr.join(',')}}`;
  }
}
