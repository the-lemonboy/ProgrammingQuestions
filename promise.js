function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function (data) {
            console.log(data);
            resolve();
        });
        xhr.open("GET", url);
        xhr.send();
    });
}
// 发送第一个请求
request("http://www.example.com/").then(() => {
    // 发送第二个请求
    return request("http://www.example1.com/");
}).then(() => {
    // 发送第三个请求
    return request("http://www.example2.com/");
});

console.log("234")