// XMLHttpRequest
// XMLHttpRequest有哪些方法 open()，send(), abort(), setRequestHeader(), getResponseHeader(), getAllResponseHeaders()
// 主要事件监听器 onreadystatechange, ontimeout, onload, onerror, onprogress, onloadstart, onloadend
// readyState属性
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪
// status属性
// 2xx: 表示成功处理请求
// 3xx: 需要重定向
// 4xx: 客户端错误
// 5xx: 服务器错误
// responseText属性
// 返回响应文本
// responseXML属性
// 返回响应XML文档
// responseType属性
// 设置响应类型
// timeout属性
// 设置请求超时时间
// withCredentials属性
// 设置跨域请求是否携带cookie


const xhr = new XMLHttpRequest();
xhr.open("get", "url", async, user, password);
xhr.abort();

/**
 * 输出如下：
 *
 * UNSENT（未发送）0
 * OPENED（已打开）0
 * LOADING（载入中）200
 * DONE（完成）200
 */
xhr.state();
xhr.readyState();

// -----------------------
// fetch
const req = fetch(resource, options).then(res);

//--------------
// axios
const req = // 发起一个post请求
  axios({
    method: "post",
    url: "/user/12345",
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });


  //进度条
  function downloadFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob'; // 处理二进制数据
  
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log(`Download Progress: ${percentComplete.toFixed(2)}%`);
      }
    };
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 将文件保存到本地
        const blob = new Blob([xhr.response]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded-file';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };
  
    xhr.send();
  }
  
  downloadFile('https://example.com/large-file.zip');



  // fetch实现进度条
  async function downloadWithProgress(url) {
    const response = await fetch(url);
    const contentLength = response.headers.get('Content-Length'); // 文件总大小
    if (!contentLength) throw new Error('Content-Length not provided');

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body.getReader();
    const progressBar = document.getElementById('progressBar');

    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      loaded += value.length;
      progressBar.value = (loaded / total) * 100;
      console.log(`Download Progress: ${(loaded / total * 100).toFixed(2)}%`);
      chunks.push(value);
    }

    // 合并下载的文件并创建 Blob
    const blob = new Blob(chunks);
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'downloaded-file';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  downloadWithProgress('https://example.com/large-file.zip');




  // XMLHttpRequest进度条
  function downloadFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob"; // 以二进制数据(blob)的形式接收响应
  
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = ((event.loaded / event.total) * 100).toFixed(2);
        console.log(`下载进度：${percentComplete}%`);
      }
    };
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("下载完成");
        const url = window.URL.createObjectURL(xhr.response);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.jpg"; // 指定下载的文件名
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
  
    xhr.onerror = function () {
      console.error("下载出错");
    };
  
    xhr.send();
  }
  
  // 调用
  downloadFile("https://example.com/image.jpg");