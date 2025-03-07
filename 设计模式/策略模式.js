const discountStrategies = {
    normal: (price) => price,
    vip: (price) => price * 0.9,
    superVip: (price) => price * 0.7,
}

function calculatePrice(type, price) {
    return discountStrategies[type] ? discountStrategies[type](price) : price;
}


// ----------- 表单验证 -------------

// 🛠 策略模式 - 校验规则
class ValidatorStrategy {
    static isNonEmpty(value, errorMsg) {
        return value === "" ? errorMsg : null;
    }

    static minLength(value, length, errorMsg) {
        return value.length < length ? errorMsg : null;
    }

    static isMobile(value, errorMsg) {
        return !/^1[3-9]\d{9}$/.test(value) ? errorMsg : null;
    }
}

// 🛠 Validator 类
class Validator {
    constructor() {
        this.cache = []; // 存储所有校验规则
    }

    // 添加校验规则
    add(dom, rules) {
        rules.forEach(rule => {
            const { strategy, errorMsg } = rule;
            const strategyArgs = strategy.split(":"); // 分割参数
            const strategyName = strategyArgs.shift(); // 取出策略名
            this.cache.push(() => {
                return ValidatorStrategy[strategyName] 
                    ? ValidatorStrategy[strategyName](dom.value, ...strategyArgs, errorMsg) 
                    : `未知校验规则：${strategyName}`;
            });
        });
    }

    // 执行所有校验规则
    start() {
        for (const validatorFunc of this.cache) {
            const errorMsg = validatorFunc();
            if (errorMsg) return errorMsg; // 只返回第一个错误
        }
        return null;
    }
}

// 📝 客户调用代码
const registerForm = document.getElementById("registerForm");

const validateForm = () => {
    const validator = new Validator();
    
    validator.add(registerForm.userName, [
        { strategy: "isNonEmpty", errorMsg: "用户名不能为空" },
        { strategy: "minLength:6", errorMsg: "用户名长度不能小于6位" }
    ]);
    
    validator.add(registerForm.password, [
        { strategy: "minLength:6", errorMsg: "密码长度不能小于6位" }
    ]);

    return validator.start();
};

registerForm.onsubmit = function () {
    const errorMsg = validateForm();
    if (errorMsg) {
        alert(errorMsg);
        return false; // 阻止提交
    }
};

