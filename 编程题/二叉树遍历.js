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
