function patch(n1,n2){
    if(n1.tag === n2.tag){
        const el = n2.el = n1.el
        const oldProps = n1.props || {}
        const newProps = n2.props || {}
        for(const key in newProps){
            const oldValue = oldProps[key]
            const newValue = newProps[key]
            if(newValue !== oldValue){
                el.setAttribute(key,newValue)
            }
        }
        for(const key in oldProps){
            if(!(key in newProps)){
                el.removeAttribute(key)
            }
        }
    }
        // children
        const oldChildren = n1.children
        const newChildren = n2.children
        if(typeof newChildren === 'string'){
            if(typeof oldChildren === 'string'){
                if(newChildren !== oldChildren){
                    el.textContent = newChildren
                }
            }else{
                el.textContent = newChildren
            }
        }else{
            if(typeof oldChildren === 'string'){
                el.innerHTML = ''
                newChildren.forEach(child=>{
                    mount(child,el)
                })
            }
        }
        else{
            const commonLength = Math.min(oldChildren.length,newChildren.length)
            for(let i=0; i<commonLength; i++){
                patch(oldChildren[i],newChildren[i])
            }
            if(newChildren.length > oldChildren.length){
                newChildren.slice(oldChildren.length).forEach(child=>{
                    mount(child.el)
                })
            }else if(newChildren.length < oldChildren.length){
                oldChildren.slice(newChildren.length).forEach(item=>{
                    el.removeChild(child.el)
                })
            }
         }
}