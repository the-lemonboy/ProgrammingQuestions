var invertTree = function (root) {
  // 终止条件
  if (!root) {
    return null;
  }
  // 交换左右节点
  const rightNode = root.right;
  root.right = invertTree(root.left);
  root.left = invertTree(rightNode);
  return root;
};
