;(() => {
    const list = new Set();
    function myInterval(fn, ms) {
      const ref = {};
      const exec = () => {
        return setTimeout(() => {
          fn.apply(null);
          const timer = exec();
          ref.current = timer;
        }, ms);
      };
      ref.current = exec();
      list.add(ref);
      return ref;
    }
  
    function myClearInterval(ref) {
      clearTimeout(ref.current);
      list.delete(ref);
    }
    window.myInterval = myInterval;
    window.myClearInterval = myClearInterval;
  })()