function get(source, path, defaultValue) {
    const paths = Array.isArray(path) ? path : path.replaceAll('[','.').replaceAll(']', '').split('.')
    const curNode = source
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        if(curNode[i] === undefined) return defaultValue
        if(i === path.length-1) return curNode[i]
        else curNode = curNode[i]
    }
}
