// https://leetcode.cn/problems/invert-binary-tree/description/
// 翻转二叉树
var invertTree = function(root) {
  // 终止条件
  if (!root) {
      return null;
  }
  // 交换左右节点
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  root.left = right
  root.right = left
  return root
};
  // https://leetcode.cn/problems/sum-of-left-leaves/description/
// 404. 左叶子之和
var sumOfLeftLeaves = function(root) {
    //采用后序遍历 递归遍历
    // 1. 确定递归函数参数
    const nodesSum = function(node) {
        // 2. 确定终止条件
        if(node === null) {
            return 0;
        }
        let leftValue = nodesSum(node.left);
        let rightValue = nodesSum(node.right);
        // 3. 单层递归逻辑
        let midValue = 0;
        if(node.left && node.left.left === null && node.left.right === null) {
            midValue = node.left.val;
        }
        let sum = midValue + leftValue + rightValue;
        return sum;
    }
    return nodesSum(root);
};



// ----------二叉树遍历
// 前序遍历
function preorderTraversal(root) {
    const res = [];
    const dfs = function (root) {
      if (!root) return;
      res.push(root.val);
      dfs(root.left);
      dfs(root.right);
    };
    dfs(root);
    return res;
  }
  
  // 中序遍历
  function inorderTraversal(root) {
    const res = [];
    const dfs = function (root) {
      if (!root) return;
      dfs(root.left);
      res.push(root.val);
      dfs(root.right);
    };
    dfs(root);
    return res;
  }
  
  // 后序遍历
  function postorderTraversal(root) {
    const res = [];
    const dfs = function (root) {
      if (!root) return res;
      dfs(root.right);
      dfs(root.left);
      res.push(root.val);
    };
    dfs(root);
    return res;
  }



  // https://leetcode.cn/problems/balanced-binary-tree/description/
  // 110. 平衡二叉树
  // 后续遍历求高度，前序遍历求深度
  // 高度  深度
  // 3     1
  // 2     2
  // 1     3 
var isBalanced = function(root) {
  const getDepth = (node)=>{
      if(node === null) return 0
      let leftDepth = getDepth(node.left)
      if(leftDepth === -1) return -1
      let rightDepth = getDepth(node.right)
      if(rightDepth === -1) return -1
      if(Math.abs(rightDepth - leftDepth) > 1) return -1
      else return 1 + Math.max(leftDepth, rightDepth)
  }
return  !(getDepth(root) === -1)
};


// https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
// 111. 二叉树的最小深度
var minDepth = function(root) {
  if(!root) return 0
  let left = minDepth(root.left)
  let right = minDepth(root.right)
  if(root.left == null && root.right !=null){
      return right +1
  }
  if(root.left !== null && root.right ===null){
      return left +1
  }
  return Math.min(left,right) + 1
};



// 101. 对称二叉树
// https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=selected-coding-interview
var isSymmetric = function(root) {
  const compareNode = (left,right)=>{
      if(left === null && right !== null || left !== null && right === null) return false
      else if(left === null && right === null) return true
      else if(left.val !== right.val) return false
      const outSide = compareNode(left.left, right.right)
      const inSide = compareNode(left.right, right.left)
      return outSide && inSide
  }
return   compareNode(root.left,root.right)
};

const 