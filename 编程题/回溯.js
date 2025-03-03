// 回溯
/** [
    ['戴尔', '苹果', '联想'],
    ['笔记本', '平板电脑', 'PC机', '上网本'],
    ['黑色', '银色', '白色'],
 ]
 输出：['戴尔-笔记本-黑色', '戴尔-笔记本-银色', '戴尔-笔记本-白色','戴尔-平板电脑-黑色', ....]
 */
 function combine(lists) {
    const res = [];
    const path = [];

    function backtrack(depth) {
        // 如果已经遍历到最后一个列表，则将 path 推入结果数组
        if (depth === lists.length) {
            res.push(path.join('-'));
            return;
        }

        for (let i = 0; i < lists[depth].length; i++) {
            // 选择当前列表的项并递归处理下一层
            path.push(lists[depth][i]);
            backtrack(depth + 1);
            // 回溯，撤销选择，返回上层
            path.pop();
        }
    }

    backtrack(0); // 从第一个列表开始
    return res;
}

const testList = [
    ['戴尔', '苹果', '联想'],
    ['笔记本', '平板电脑', 'PC机', '上网本'],
    ['黑色', '银色', '白色'],
 ]
