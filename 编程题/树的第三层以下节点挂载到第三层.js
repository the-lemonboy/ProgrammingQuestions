flattenToThreeLayers(node) {
    const newTree = { id: node.id, children: [],title:node.title, createTime:node.createTime, content:node.content, createUser:node.createUser }; // 新的树结构
    let childrenCache = []; 
    function traverTree(currentNode, level = 0,parentCreateUser = null) {
        if (!currentNode) return;
        currentNode.children?.forEach(child => {
            traverTree(child, level + 1,currentNode.createUser);
        });
        if (level > 1) {
            delete currentNode.children;
            if(level > 2){
              childrenCache.push({ ...currentNode,parentCreateUser });
            }else{
              childrenCache.push({ ...currentNode });
            }
        } else if (level === 1) {
            newTree.children.push({ ...currentNode });
            childrenCache = [];
        }
    }
    traverTree(node);
    return newTree;
},