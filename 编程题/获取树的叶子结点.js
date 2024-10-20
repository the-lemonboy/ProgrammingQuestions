function getTreeLeaf(tree){
    const stack = [tree]
    const leafArr = [] 
    while(stack.length > 0 ){
        const node =  stack.pop()
        if(node.children.length === 0){
            leafArr.push(node)
        }else{
            node.children.forEach(element => {
                stack.push(element)
            });
        }
    }
    return leafArr
}

// "city": [
//     { "id": 12, "parent_id": 1, "name": "朝阳区" },
//     { "id": 241, "parent_id": 24, "name": "田林街道" },
//     { "id": 31, "parent_id": 3, "name": "广州市" },
//     { "id": 13, "parent_id": 1, "name": "昌平区" },
//     { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" }]


    // function arrToTree(arr){
    //     const tree = {}
    //     arr.forEach(item=>{
            
    //     })
    // }


    function arrayToTreeV3(list, root) {
        return list
          .filter(item => item.parent_id === root)
          .map(item => ({ ...item, children: arrayToTreeV3(list, item.id) }))
      }

      // 定义一个示例数组
const list = [
    { id: 1, parent_id: null, name: 'Node 1' },
    { id: 2, parent_id: 1, name: 'Node 1.1' },
    { id: 3, parent_id: 1, name: 'Node 1.2' },
    { id: 4, parent_id: 2, name: 'Node 1.1.1' },
    { id: 5, parent_id: 2, name: 'Node 1.1.2' },
    { id: 6, parent_id: null, name: 'Node 2' },
    { id: 7, parent_id: 6, name: 'Node 2.1' },
    { id: 8, parent_id: 6, name: 'Node 2.2' },
  ];
  
  // 调用 arrayToTreeV3 函数将数组转换为树结构
  const tree = arrayToTreeV3(list, null);
  
  // 输出转换后的树结构
  console.log(tree);
