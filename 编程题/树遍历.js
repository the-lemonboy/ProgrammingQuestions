// 递归DFS
function DFSTree(tree) {
    const result = [];
    function traverse(node) {
      result.push(node.value); // 收集节点值
      if (node.children) {
        node.children.forEach((child) => {
          traverse(child);
        });
      }
    }
    traverse(tree);
    return result; // 返回收集的值
  }
// 递归 BFS  ，树太深可能会造成栈溢出。
function BFS(tree) {
    const result = []; // 存储结果
  
    // 辅助函数：递归处理一层节点
    function traverseLevel(nodes) {
      if (nodes.length === 0) return; // 如果当前层没有节点，终止递归
      const nextLevel = []; // 用于存储下一层的节点
      for (const node of nodes) {
        result.push(node.value); // 记录当前节点的值
        if (node.children) {
          nextLevel.push(...node.children); // 收集所有子节点
        }
      }
      traverseLevel(nextLevel); // 递归处理下一层
    }
  
    traverseLevel([tree]); // 从根节点开始递归
    return result;
  }

// 迭代DFS
function DFSTree(tree) {
    const stack = [tree]; // 初始化栈，根节点入栈
    const res = []; // 用于存储结果
  
    while (stack.length > 0) {
      const node = stack.pop(); // 取出栈顶元素
      res.push(node.value); // 处理当前节点
      // 如果有子节点，按照从右到左的顺序入栈
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }
    return res; // 返回遍历结果
  }
// 迭代BFS
function BFSTree(tree) {
    const stack = [tree]; // 初始化栈，存入根节点
    const res = []; // 用于存储遍历结果
  
    while (stack.length > 0) { // 栈非空时循环
      const node = stack.pop(); // 弹出栈顶节点
      res.push(node.value); // 记录当前节点的值
  
      // 如果有子节点，将子节点按从左到右的顺序压栈
      if (node.children) {
        stack.push(...node.children.reverse()); // 需要反转，保证DFS从左到右遍历
      }
    }
    return res;
  }