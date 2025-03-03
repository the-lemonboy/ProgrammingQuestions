let tree = [
    {
      id: '1',
      children: [
        {
          id: '1-1',
          children: [
            {
              id: '1-1-1',
            },
            {
              id: '1-1-2',
            },
          ],
        },
        {
          id: '1-2',
          children: [
            {
              id: '1-2-1',
            },
            {
              id: '1-2-2',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      children: [
        {
          id: '2-1',
          children: [
            {
              id: '2-1-1',
            },
            {
              id: '2-1-2',
            },
          ],
        },
        {
          id: '2-2',
          children: [
            {
              id: '2-2-1',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      children: [
        {
          id: '3-1',
          children: [
            {
              id: '3-1-1',
            },
          ],
        },
        {
          id: '3-2',
          children: [
            {
              id: '3-2-1',
            },
          ],
        },
        {
          id: '3-3',
          children: [
            {
              id: '3-3-1',
            },
          ],
        },
      ],
    },
  ]


  function BFS(tree){
    function traversal(node){
        if(node.length === 0) return
        let nextLevel = []
        node.forEach(element => {
            const node = {...element}
            delete node.children
            console.log(node)
            if(element.children){
                element.children.forEach(item=>{
                    nextLevel.push(item)
                })
            }
        });
        traversal(nextLevel)
    }
    traversal(tree)
  }

  BFS(tree)