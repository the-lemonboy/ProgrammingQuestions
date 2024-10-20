const tree = {
  "id": "121",
  "children": [
    {
      "id": "122",
      "children": [
        {
          "id": "126",
          "children": null,
          "dataCategory": "comment",
          "postId": "121",
          "title": null,
          "imageUrl": null,
          "content": "用户C评论",
          "isRead": false,
          "readCount": 0,
          "isDelete": false,
          "createUser": "用户C",
          "createTime": "2024-09-29 13:59:18",
          "deleteUser": null,
          "deleteTime": null,
          "modifyUser": null,
          "modifyTime": null,
          "parentId": "122"
        },
        {
          "id": "123",
          "children": [
            {
              "id": "124",
              "children": null,
              "dataCategory": "comment",
              "postId": "121",
              "title": null,
              "imageUrl": null,
              "content": "评论的评论的评论",
              "isRead": false,
              "readCount": 0,
              "isDelete": false,
              "createUser": "用户A",
              "createTime": "2024-09-25 15:59:42",
              "deleteUser": null,
              "deleteTime": null,
              "modifyUser": null,
              "modifyTime": null,
              "parentId": "123"
            },
            {
              "id": "125",
              "children": [
                {
                  "id": "127",
                  "children": null,
                  "dataCategory": "comment",
                  "postId": "121",
                  "title": null,
                  "imageUrl": null,
                  "content": "测试评论",
                  "isRead": false,
                  "readCount": 0,
                  "isDelete": false,
                  "createUser": "用户C",
                  "createTime": "2024-09-29 14:17:14",
                  "deleteUser": null,
                  "deleteTime": null,
                  "modifyUser": null,
                  "modifyTime": null,
                  "parentId": "125"
                }
              ],
              "dataCategory": "comment",
              "postId": "121",
              "title": null,
              "imageUrl": null,
              "content": "评论的评论的评论",
              "isRead": false,
              "readCount": 0,
              "isDelete": false,
              "createUser": "用户C",
              "createTime": "2024-09-25 16:00:05",
              "deleteUser": null,
              "deleteTime": null,
              "modifyUser": null,
              "modifyTime": null,
              "parentId": "123"
            }
          ],
          "dataCategory": "comment",
          "postId": "121",
          "title": null,
          "imageUrl": null,
          "content": "测试评论",
          "isRead": false,
          "readCount": 0,
          "isDelete": false,
          "createUser": "用户A",
          "createTime": "2024-09-25 15:57:55",
          "deleteUser": null,
          "deleteTime": null,
          "modifyUser": null,
          "modifyTime": null,
          "parentId": "122"
        }
      ],
      "dataCategory": "comment",
      "postId": "121",
      "title": null,
      "imageUrl": null,
      "content": "用户B的评论",
      "isRead": false,
      "readCount": 0,
      "isDelete": false,
      "createUser": "用户B",
      "createTime": "2024-09-25 14:56:03",
      "deleteUser": null,
      "deleteTime": null,
      "modifyUser": null,
      "modifyTime": null,
      "parentId": "121"
    },
    {
      "id": "128",
      "children": null,
      "dataCategory": "comment",
      "postId": "121",
      "title": null,
      "imageUrl": null,
      "content": "test",
      "isRead": false,
      "readCount": 0,
      "isDelete": false,
      "createUser": "用户C",
      "createTime": "2024-09-29 14:53:06",
      "deleteUser": null,
      "deleteTime": null,
      "modifyUser": null,
      "modifyTime": null,
      "parentId": "121"
    }
  ],
  "dataCategory": "post",
  "postId": null,
  "title": "用户A的文章标题",
  "imageUrl": null,
  "content": "<html><head></head><body><p>用户A的文章内容</p></body></html>",
  "isRead": true,
  "readCount": 100,
  "isDelete": false,
  "createUser": "用户A",
  "createTime": "2024-09-25 14:55:06",
  "deleteUser": null,
  "deleteTime": null,
  "modifyUser": null,
  "modifyTime": null,
  "parentId": null
}

// 深度优先遍历并记录父节点
function dfsWithParent(node, parent = null) {
  if (!node) return;

  // 处理当前节点，记录父节点
  console.log(`当前节点: ${node.id}, 父节点: ${parent ? parent.id : 'null'}`);

  // 遍历子节点
  for (const child of node.children) {
      dfsWithParent(child, node); // 将当前节点作为父节点传递
  }
}

// 从叶子节点向上遍历
// function traverseFromLeafToRoot(node) {
//   if (!node) return;

//   // 如果是叶子节点，开始向上遍历
//   if (node.children.length === 0) {
//       console.log(`到达叶子节点: ${node.id}`);
//       let currentNode = node;
//       while (currentNode) {
//           console.log(`向上遍历: ${currentNode.id}`);
//           // 这里可以加上任何处理逻辑
//           currentNode = currentNode.parent; // 需要在 dfsWithParent 函数中记录父节点
//       }
//   } else {
//       // 否则继续遍历
//       for (const child of node.children) {
//           traverseFromLeafToRoot(child);
//       }
//   }
// }

// 进行 DFS
dfsWithParent(root);

// 由于在上面的 DFS 函数中没有记录 parent 属性，所以在这里你需要自己添加父节点
// 示例：从 leaf1 开始向上遍历
// traverseFromLeafToRoot(leaf1);

function drag(){
  const dom = document.getElementById('container');
  dom.addEventListener('mousedown')
}

