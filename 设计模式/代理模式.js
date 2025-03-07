//  虚拟代理
// 图片懒加载代理
const createImageProxy = (realImageSrc) => {
    const placeholder = "https://via.placeholder.com/150"; // 占位图
    const img = new Image();
    img.src = placeholder;

    img.onload = () => {
        console.log("🔄 加载中...");
        setTimeout(() => {
            img.src = realImageSrc; // 加载真实图片
            console.log("✅ 图片已加载: " + realImageSrc);
        }, 2000); // 模拟网络延迟
    };

    return img;
};

// 使用代理加载图片
const imgElement = createImageProxy("https://source.unsplash.com/random");
document.body.appendChild(imgElement);


//  ----------- 缓存代理（函数结果缓存）---------
// 计算斐波那契数列（递归，性能较差）
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 🔥 代理模式 - 使用缓存
class FibonacciProxy {
    constructor() {
        this.cache = {}; // 存储计算结果
    }

    calculate(n) {
        if (this.cache[n] !== undefined) {
            console.log(`✅ 读取缓存：fib(${n})`);
            return this.cache[n];
        }
        console.log(`⚙️ 计算：fib(${n})`);
        this.cache[n] = fibonacci(n);
        return this.cache[n];
    }
}

// 🔥 测试
const proxy = new FibonacciProxy();
console.log(proxy.calculate(10)); // ⚙️ 计算：fib(10)
console.log(proxy.calculate(10)); // ✅ 读取缓存：fib(10)