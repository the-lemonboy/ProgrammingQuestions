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


 // 法二
 function get(source, path, defaultValue) {
    const paths = typeof path === 'string' ? path.match(/[^\[\]\.]+/g) : path
    if (!(paths && paths.length)) return;
    const res = paths.reduce((acc,cur)=> acc && acc[cur],source)
    return res || defaultValue
 }