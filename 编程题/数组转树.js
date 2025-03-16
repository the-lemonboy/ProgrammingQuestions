const { func } = require("uview-plus/libs/function/test")

const city = [
  { "id": 12, "parent_id": 1, "name": "朝阳区" },
  { "id": 241, "parent_id": 24, "name": "田林街道" },
  { "id": 31, "parent_id": 3, "name": "广州市" },
  { "id": 13, "parent_id": 1, "name": "昌平区" },
  { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" }]



/**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）的 id
 * @return array
 */
function arrayToTree(list, root) {
    const result = [] // 用于存放结果
    const map = {} // 用于存放 list 下的节点
  
    // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
    for (const item of list) {
      map[item.id] = { ...item } // 浅拷贝
    }
    // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
    for (const item of list) {
      // 3. 获取节点的 id 和 父 id
      const { id, parent_id } = item // ES6 解构赋值
      // 4. 如果是根节点，存入 result
      if (item.parent_id === root) {
        result.push(map[id])
      } else {
        // 5. 反之，存入到父节点  
        // *** 这步重要
        map[parent_id].children
          ? map[parent_id].children.push(map[id])
          : (map[parent_id].children = [map[id]])
      }
    }
    // 将结果返回
    return result
  }


  /**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）
 * @returns array
 */
function arrayToTreeV2(list, root) {
    const result = [] // 用于存放结果
    const map = {} // 用于存放 list 下的节点
    // 遍历 list
    for (const item of list) {
      // 1. 获取节点的 id 和 父 id
      const { id, parent_id } = item // ES6 解构赋值
      // 2. 将节点存入 map
      if (!map[id]) map[id] = {}
      // 3. 根据 id，将节点与之前存入的子节点合并
      map[id] = map[id].children
        ? { ...item, children: map[id].children }
        : { ...item }
      // 4. 如果是根节点，存入 result
      if (parent_id === root) {
        result.push(map[id])
      } else {
        // 5. 反之，存入父节点
        if (!map[parent_id]) map[parent_id] = {}
        if (!map[parent_id].children) map[parent_id].children = []
        map[parent_id].children.push(map[id])
      }
    }
    // 将结果返回
    return result
  }


  /**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）
 * @returns array
 * 解释： filter把parent_id等于当前id的选出---->map在组合成树
 */
function arrayToTreeV3(list, root) {
    return list
      .filter(item => item.parent_id === root)
      .map(item => ({ ...item, children: arrayToTreeV3(list, item.id) }))
  }
  // -------------gpt方法
  const list = [
    { id: 1, name: 'root', parentId: null },
    { id: 2, name: 'child1', parentId: 1 },
    { id: 3, name: 'child1.1', parentId: 2 },
    { id: 4, name: 'child1.2', parentId: 2 },
    { id: 5, name: 'child2', parentId: 1 },
    { id: 6, name: 'child2.1', parentId: 5 }
  ];
  function arrayToTree(items) {
    const itemMap = {};
    // 初始化所有节点到一个字典中
    items.forEach(item => {
      itemMap[item.id] = { ...item, children: [] };
    });
  
    const result = [];
  
    items.forEach(item => {
      const id = item.id;
      const parentId = item.parentId;
  
      if (parentId === null) {
        // 根节点
        result.push(itemMap[id]);
      } else {
        // 非根节点，添加到父节点的 children 中
        if (!itemMap[parentId]) {
          itemMap[parentId] = { children: [] };
        }
        itemMap[parentId].children.push(itemMap[id]);
      }
    });
  
    return result;
  }
  
  // 测试用例
  const tree = arrayToTree(list);
  console.log(JSON.stringify(tree, null, 2));




  function arrayToTree(array) {
    const map = new Map();
    const forest = [];
  
    // 初始化所有节点到 Map 中
    array.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });
  
    // 构建树
    array.forEach(item => {
      const node = map.get(item.id);
      if (item.parentId === null) {
        // 没有父节点，放入森林作为根节点
        forest.push(node);
      } else {
        // 找到父节点，将当前节点添加到其 children 中
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });
  
    return forest;
  }


  function arrToTree(arr){
    let map = new Map()
    let tree = []
    arr.forEach(item=>{
      map.set(item.id,{item,children:[]})
    })
    for(let value of arr){
      const node = map.get(value.id)
      if(!node.parent_id){
        tree.push(node)
      }
      else{
        const parent = map.get(node.parent_id)
        if(parent){
          parent.children.push(item)
        }
      }
    }
  }

/* 乌鸫 */
  const arr = [
    {id:1, child:[2,3]},
    {id:2, child:[4]},
    {id:3, child:[]},
    {id:4, child:[5]},
    {id:5, child:[6]}
  ]


  function convertToTree(data) {
    const nodeMap = {};      // 存储id到节点的映射
    const childIds = new Set(); // 存储所有子节点的id
  
    // 第一次遍历：创建节点并收集子节点id
    data.forEach(node => {
      const { child, ...rest } = node;
      nodeMap[rest.id] = { ...rest, children: [] };
      child.forEach(id => childIds.add(id));
    });
  
    // 第二次遍历：构建子节点引用
    data.forEach(node => {
      const parent = nodeMap[node.id];
      parent.children = node.child.map(id => nodeMap[id]);
    });
  
    // 找到根节点（没有父节点的节点）
    const rootId = data.find(node => !childIds.has(node.id))?.id;
    return nodeMap[rootId];
  }
