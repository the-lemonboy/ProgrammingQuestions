function CamelCaseToUnderline(str) {
    return str.split('').reduce((acc, cur, idx) => {
      if (cur >= 'A' && cur <= 'Z' && idx < str.length) {
        return acc + '_' + cur.toLowerCase();
      }
      return acc + cur;
    }, '');
  }


  function UnderlineToCamelCase(str) {
    let shouldUpper = false;
    return str.split('').reduce((acc, cur) => {
      if (cur === '_') {
        shouldUpper = true;
        return acc;
      }
      if (shouldUpper) {
        shouldUpper = false;
        return acc + cur.toUpperCase();
      }
      return acc + cur;
    }, '');
  }