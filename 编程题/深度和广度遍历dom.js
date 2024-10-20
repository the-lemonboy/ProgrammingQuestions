// https://juejin.cn/post/6844903954673827848?searchId=20240223141835C30B05E9608098AB7392
const parentDOM = document.getElementById('container');
function breathTravalSal(node){
	const nodes = [];
	const queue = [];
	if(node){
		queue.push(node);
		while(queue.length){
			const item = queue.shift();
			nodes.push(item);
			for(const v of item.children){
				queue.push(v);
			}
		}
	}
	return nodes;
}
console.log(breathTravalSal(parentDOM));



// 广度遍历用队列   深度遍历用栈