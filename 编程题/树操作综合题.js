let arrs = [
    { "id": 1, "title": "child1", "parentId": 0 },
    { "id": 2, "title": "child2", "parentId": 0 },
    { "id": 3, "title": "child1_1", "parentId": 1 },
    { "id": 4, "title": "child1_2", "parentId": 1 },
    { "id": 5, "title": "child2_1", "parentId": 2 }
]


// function arrToTree(arr){
//     let map = {}
//     arr.forEach(item=>{
//         map[item.id] = {...item,children:[]}
//     })
//     arr.forEach(item=>{
//         if(item.parentId !== 0){}
//     })
// }
// function arrayToTree(nodes,root) {
//     const map = {};
//     const roots = [];

//     // 将节点数组转换成一个哈希表，方便通过 id 查找节点
//     nodes.forEach(node => {
//         map[node.id] = { ...node, children: [] };
//     });

//     // 将每个节点添加到其父节点的 children 数组中
//     nodes.forEach(node => {
//         if (node.parentId !== root) {
//             map[node.parentId].children.push(map[node.id]);
//         } else {
//             roots.push(map[node.id]);
//         }
//     });
//     return roots;
// }
// function arrayToTree(list, root) {
//     const result = [] // 用于存放结果
//     const map = {} // 用于存放 list 下的节点
  
//     // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
//     for (const item of list) {
//       map[item.id] = { ...item } // 浅拷贝
//     }
//     // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
//     for (const item of list) {
//       // 3. 获取节点的 id 和 父 id
//       const { id, parentId } = item // ES6 解构赋值
//       // 4. 如果是根节点，存入 result
//       if (item.parentId === root) {
//         result.push(map[id])
//       } else {
//         // 5. 反之，存入到父节点  
//         // *** 这步重要
//         map[parentId].children
//           ? map[parentId].children.push(map[id])
//           : (map[parentId].children = [map[id]])
//       }
//     }
//     // 将结果返回
//     return result
//   }
  function arrayToTree(list, root) {
    return list
      .filter(item => item.parentId === root)
      .map(item => ({ ...item, children: arrayToTree(list, item.id) }))
  }
let test = arrayToTree(arrs,0)
 * Converts a list of nodes into a tree structure.
 * @param {Object[]} list A list of nodes where each node is an object with at least an `id` property.
 * @returns {Object[]} A tree structure where each node has a `children` property that is an array of its children.
 */
// console.log(Array.isArray(test))
// console.log(test)
// test.forEach(item=>{
    
//     if(item.children){
//         arrayToTree(item,item.id)
//     }
//     console.log()
// })
// 深度遍历
function deepTree(nodes){
    let res = []
   function deep(nodes){
 
    nodes.forEach(node=>{
        res.push(node.id)
        if(node.children){
            deep(node.children)
        }
        })
    }
    deep(nodes)
    return res
}
// 广度遍历
function rangeTree(nodes){
    
}
console.log(fn(test))