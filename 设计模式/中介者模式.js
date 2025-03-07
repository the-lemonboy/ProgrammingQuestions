// ------------ 智能家居控制系统 -----------
// 中介者：智能家居控制器
class SmartHomeMediator {
    constructor() {
        this.devices = {};
    }

    registerDevice(device) {
        this.devices[device.name] = device;
        device.setMediator(this);
    }

    sendCommand(command, fromDevice) {
        console.log(`📡 中控面板收到指令: ${command}（来自 ${fromDevice.name}）`);
        for (const device of Object.values(this.devices)) {
            if (device !== fromDevice) {
                device.receiveCommand(command, fromDevice);
            }
        }
    }
}

// 参与者：智能设备
class SmartDevice {
    constructor(name) {
        this.name = name;
        this.mediator = null;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    sendCommand(command) {
        console.log(`🔧 ${this.name} 发送指令: ${command}`);
        this.mediator.sendCommand(command, this);
    }

    receiveCommand(command, fromDevice) {
        console.log(`📥 ${this.name} 收到 ${fromDevice.name} 的指令: ${command}`);
    }
}

// 使用
const homeMediator = new SmartHomeMediator();

const light = new SmartDevice("智能灯");
const ac = new SmartDevice("空调");
const speaker = new SmartDevice("音响");

homeMediator.registerDevice(light);
homeMediator.registerDevice(ac);
homeMediator.registerDevice(speaker);

light.sendCommand("开灯");
ac.sendCommand("调到 26°C");


// ---------------- 案例 1：聊天室（多人通信） ---------------
class ChatRoom {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        user.setChatRoom(this);
    }
    sendMessage(message, fromUser, toUser = null) {
        if (toUser) {
            toUser.receiveMessage(message, fromUser);
        } else {
            // 发送给所有用户（除了自己）
            this.users.forEach(user => {
                if (user !== fromUser) {
                    user.receiveMessage(message, fromUser);
                }
            });
        }
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.chatRoom = null;
    }
    setChatRoom(chatRoom) {
        this.chatRoom = chatRoom
    }
    sendMessage(message, toUser = null) {
        console.log(`📤 ${this.name} 发送消息: ${message}`);
        this.chatRoom.sendMessage(message, this, toUser)
    }
    receiveMessage(message, fromUser) {
        console.log(`📩 ${this.name} 收到 ${fromUser.name} 的消息: ${message}`);
    }
}


// 使用
const chatRoom = new ChatRoom();

const alice = new User("Alice");
const bob = new User("Bob");
const charlie = new User("Charlie");

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

alice.sendMessage("Hello everyone!"); // 群发
bob.sendMessage("Hey Alice!", alice); // 私聊 Alice