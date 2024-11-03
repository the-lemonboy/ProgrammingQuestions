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
