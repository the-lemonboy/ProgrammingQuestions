
function logDecorator(fn){
    return (...args){
        console.log(`调用${fn.name}:参数：${args}`)
        const result = fn(...args)
        console.log(`返回值：${result}`)
        return result
    }
}
// 原函数
function add(a, b) {
    return a + b;
}

// 使用装饰者
const decoratedAdd = logDecorator(add);

// 🔥 测试
decoratedAdd(5, 3);


//-------------使用 ES7 装饰器 给类的方法增加权限控制。

// 权限装饰器
function checkPermission(role) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (role !== "admin") {
                console.log(`❌ 访问被拒绝：你没有权限！`);
                return;
            }
            return originalMethod.apply(this, args);
        };
    };
}

class User {
    @checkPermission("admin") // 只有 admin 角色可以调用
    deleteUser() {
        console.log("✅ 用户已删除");
    }
}

const user = new User();
user.deleteUser(); // ✅ 用户已删除

const guest = new User();
checkPermission("guest")(guest, "deleteUser", Object.getOwnPropertyDescriptor(User.prototype, "deleteUser"));
guest.deleteUser(); // ❌ 访问被拒绝
