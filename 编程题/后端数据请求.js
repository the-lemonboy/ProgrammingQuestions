// XMLGHttpRequest
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