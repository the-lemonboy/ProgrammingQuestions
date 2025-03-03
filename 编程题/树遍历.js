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

  // 有多节点
  // 递归 DFS 遍历树
function DFSTree(tree) {
  const result = []; // 用于存储节点值
  
  // 定义递归函数
  function traverse(node) {
    result.push(node.value); // 访问当前节点值
    
    // 如果当前节点有子节点，则递归遍历每个子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child));
    }
  }
  
  // 如果树是一个数组形式（多根节点），则需要遍历每个根节点
  tree.forEach((node) => traverse(node));
  
  return result; // 返回最终结果
}

// 递归 BFS  ，树太深可能会造成栈溢出。
function BFS(tree) {
  const result = []; // 存储结果

  // 辅助函数：递归处理一层节点
  function traverseLevel(nodes) {
    if (nodes.length === 0) return; // 如果当前层没有节点，终止递归
    for (const node of nodes) {
      result.push(node.value); // 记录当前节点的值
      if (node.children) {
        traverseLevel(node.children); // 递归处理下一层的子节点
      }
    }
  }

  traverseLevel([tree]); // 从根节点开始递归
  return result;
}
function bfsRecursive(queue, result = []) {
  if (queue.length === 0) return result; // 终止条件
  
  const levelSize = queue.length; // 当前层节点数
  for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 取出队列头部节点
      result.push(node.value); // 记录节点值
      
      // 将子节点加入队列
      if (node.children) {
          queue.push(...node.children);
      }
  }
  
  return bfsRecursive(queue, result); // 递归处理下一层
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
// 迭代 BFS 遍历树
function BFSTree(tree) {
  const queue = [...tree]; // 初始化队列（可以接受多根节点的树）
  const res = []; // 存储遍历结果

  while (queue.length > 0) {
    const node = queue.shift(); // 从队列头部取出节点
    res.push(node.value); // 记录当前节点值

    // 如果有子节点，将子节点从左到右依次加入队列
    if (node.children) {
      queue.push(...node.children); // 保持原顺序
    }
  }

  return res;
}



