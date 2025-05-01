// 设计一个历史记录管理功能，支持添加，撤销，重做
class HistoryRecord {
    constructor() {
      this.undoStack = [];
      this.redoStack = [];
    }
  
    // 添加新操作
    add(action) {
      this.undoStack.push(action);
      this.redoStack = []; // 新操作清空 redo 栈
    }
  
    // 撤销
    undo() {
      if (this.undoStack.length === 0) return;
      const action = this.undoStack.pop();
      action.undo(); // 假设 action 对象有 undo 方法
      this.redoStack.push(action);
    }
  
    // 重做
    redo() {
      if (this.redoStack.length === 0) return;
      const action = this.redoStack.pop();
      action.redo(); // 假设 action 对象有 redo 方法
      this.undoStack.push(action);
    }
  }

  