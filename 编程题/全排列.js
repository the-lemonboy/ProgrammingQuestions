/**
 * 全排列
 * https://leetcode.cn/problems/permutations/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = [];
    backtracking(nums,nums.length,[])
    function backtracking(n,k,used){
        if(path.length === k){
            res.push(Array.from(path));
            return
        }
        for(let i=0; i<k; i++){
            if(used[i]) continue
            used[i] = true
            path.push(n[i])
            backtracking(n,k,used)
            path.pop();
            used[i] = false
        }
    }
    return res
};



/**
 * 全排列二
 * https://leetcode.cn/problems/permutations-ii/description/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const sortNums = nums.sort((a,b) => a - b); // 排序以便于去重
    const res = [], path = [];
    backTracking(sortNums, sortNums.length, []);
    return res;

    function backTracking(n, k, used) {
        if (path.length === k) {
            res.push(Array.from(path)); // 保存当前路径的拷贝
            return;
        }
        for (let i = 0; i < k; i++) {
            // 去重逻辑：当前元素与前一个相同且前一个未使用时，跳过
            if (i > 0 && n[i] === n[i - 1] && !used[i - 1]) continue;
            if (used[i]) continue; // 跳过已经使用过的元素

            used[i] = true;
            path.push(n[i]);
            backTracking(n, k, used);
            used[i] = false;
            path.pop(); // 回溯撤销选择
        }
    }
};
