const tree1 = {
  val: 4,
  left: {
    val: 2,
    left: { val: 1, left: null, right: null },
    right: { val: 3, left: null, right: null }
  },
  right: {
    val: 7,
    left: { val: 6, left: null, right: null },
    right: { val: 9, left: null, right: null }
  }
};

// 翻转后应该变成：
/*
      4
     / \
    7   2
   / \ / \
  9  6 3  1
*/


// https://leetcode.cn/problems/invert-binary-tree/description/
// 翻转二叉树
// 后序遍历
var invertTree = function (root) {
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
var sumOfLeftLeaves = function (root) {
  //采用后序遍历 递归遍历
  // 1. 确定递归函数参数
  const nodesSum = function (node) {
    // 2. 确定终止条件
    if (node === null) {
      return 0;
    }
    let leftValue = nodesSum(node.left);
    let rightValue = nodesSum(node.right);
    // 3. 单层递归逻辑
    let midValue = 0;
    if (node.left && node.left.left === null && node.left.right === null) {
      midValue = node.left.val;
    }
    let sum = midValue + leftValue + rightValue;
    return sum;
  }
  return nodesSum(root);
};


// https://leetcode.cn/problems/balanced-binary-tree/description/
// 110. 平衡二叉树
// 后续遍历求高度，前序遍历求深度
// 高度  深度
// 3     1
// 2     2
// 1     3 
var isBalanced = function (root) {
  const getDepth = (node) => {
    if (node === null) return 0
    let leftDepth = getDepth(node.left)
    if (leftDepth === -1) return -1
    let rightDepth = getDepth(node.right)
    if (rightDepth === -1) return -1
    if (Math.abs(rightDepth - leftDepth) > 1) return -1
    else return 1 + Math.max(leftDepth, rightDepth)
  }
  return !(getDepth(root) === -1)
};


// https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
// 111. 二叉树的最小深度
var minDepth = function (root) {
  if (!root) return 0
  let left = minDepth(root.left)
  let right = minDepth(root.right)
  if (root.left == null && root.right != null) {
    return right + 1
  }
  if (root.left !== null && root.right === null) {
    return left + 1
  }
  return Math.min(left, right) + 1
};



// 101. 对称二叉树
// https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=selected-coding-interview
var isSymmetric = function (root) {
  const compareNode = (left, right) => {
    if (left === null && right !== null || left !== null && right === null) return false
    else if (left === null && right === null) return true
    else if (left.val !== right.val) return false
    const outSide = compareNode(left.left, right.right)
    const inSide = compareNode(left.right, right.left)
    return outSide && inSide
  }
  return compareNode(root.left, root.right)
};

// ---------- 递归
// 前序遍历
const root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};
var preorderTraversal = function (tree) {
  let res = []
  const dfs = (root) => {
    if (!root) return
    res.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }
  dfs(root)
  return res
}
preorderTraversal(root)
// 中序遍历
var inorderTraversal = function (root) {
  let res = []
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    res.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return res
}

// 后序遍历
var postorderTraversal = function (root) {
  let res = []
  const traversal = (root) => {
    if (!root) return
    dfs(root.left)
    dfs(root.right)
    res.push(root.val)
  }
  traversal(root)
  return res
}

// ----------------迭代遍历
// 前序迭代
var preorderTraversal = function (root) {
  let stack = [root]
  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return res
}

// 中序迭代
// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右
var inorderTraversal = function (root) {
  let stack = []
  let res = []
  let cur = root
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur);
      // 左
      cur = cur.left;
    } else {
      // --> 弹出 中
      cur = stack.pop();
      res.push(cur.val);
      // 右
      cur = cur.right;
    }
  }
  return res
}

// 后续迭代 
// 入栈 左 -> 右
// 出栈 中 -> 右 -> 左 结果翻转
var postorderTraversal = function(root, res = []) {
  if (!root) return res;
  const stack = [root];
  let cur = null;
  do {
      cur = stack.pop();
      res.push(cur.val);
      cur.left && stack.push(cur.left);
      cur.right && stack.push(cur.right);
  } while(stack.length);
  return res.reverse();
};