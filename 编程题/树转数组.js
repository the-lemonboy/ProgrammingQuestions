// 深度遍历
function treeToList(data) {
    let res = [];
    const dfs = (tree) => {
      tree.forEach((item) => {
        if (item.children) {
          dfs(item.children);
          delete item.children;
        }
        res.push(item);
      });
    };
    dfs(data);
    return res;
  }

  // 迭代
  function treeToList(data) {
    let res = [];
    let stack = [...data];
  
    while (stack.length) {
      let node = stack.pop();
      
      // 将当前节点的副本加入结果数组，并移除其 children 属性
      let { children, ...rest } = node;
      res.push(rest);
      
      if (children && children.length > 0) {
        // 将子节点逆序入栈，保证遍历顺序是从左到右
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  
    return res;
  }

  // 递归
  function flattenTree(node) {
    let result = [];
    function traverse(currentNode) {
      result.push({
        id: currentNode.id,
        name: currentNode.name
        // 添加其他需要的属性
      });
      if (currentNode.children) {
        currentNode.children.forEach(child => traverse(child));
      }
    }
    traverse(node);
    return result;
  }



  function treeToArr(tree){
    let res = []
    tree.forEach(node=>{
      if(node.children){
        res = res.concat(treeToArr(node.children))
      }else{
        res = node.delete(children)
      }
    })
    return res
  }