const getURLParam = (url, param) => {
    // 创建一个 URL 对象
    const searchParams = new URL(url).searchParams;
    // 获取所有与 param 匹配的参数值
    const paramValues = searchParams.getAll(param);
    // 处理 JSON 字符串
    const decodedValues = paramValues.map(value => {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (e) {
        return decodeURIComponent(value);
      }
    });
    // 返回单值或者数组
    return decodedValues.length > 1 ? decodedValues : decodedValues[0];
  }
  
  // 测试用例
  const url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu';
  const param1 = getURLParam(url,'tn');
  console.log(param1);  // baidu
  const param2 = getURLParam(url,'ie');
  console.log(param2);  // utf-8
  
  const url2 = 'http://hbos-section-dev.cfuture.shop:8000/?name=%E5%BC%A0%E4%B8%89&age=18&gender=%7B%22key%22%3A1%2C%22value%22%3A%22%E7%94%B7%22%7D&cardNo=医保1&cardNo=社保2&address=%E5%A4%A9%E5%BA%9C%E4%BA%8C%EF%BC%9F%E4%B8%89%E8%A1%97';
  const cardNo = getURLParam(url2, 'cardNo');
  console.log(cardNo);  // ["医保1", "社保2"]
  const gender = getURLParam(url2, 'gender');
  console.log(gender);  // {"key":1,"value":"男"}
  const address = getURLParam(url2, 'address');
  console.log(address);  // 天府二？三街


  // searchParams 获取参数
  // search   所以参数value和key的字符串
  // host 域名+端口   https默认443、http默认80
  // hostname  域名
  // origin  