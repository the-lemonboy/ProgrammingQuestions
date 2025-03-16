// 回溯重点：startIndex，used，path


/**
 * 全排列
 * https://leetcode.cn/problems/permutations/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = [];
    backtracking(nums, nums.length, [])
    function backtracking(n, k, used) {
        if (path.length === k) {
            res.push(Array.from(path));
            return
        }
        for (let i = 0; i < k; i++) {
            if (used[i]) continue
            used[i] = true
            path.push(n[i])
            // 递归
            backtracking(n, k, used)
            // 回溯
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
var permuteUnique = function (nums) {
    const sortNums = nums.sort((a, b) => a - b); // 排序以便于去重
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


// https://leetcode.cn/problems/non-decreasing-subsequences/description/
// 491. 非递减子序列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    let res = [], path = [];
    function backTracking(startIndex) {
        if (path.length >= 2) {
            res.push([...path]);
        }
        const used = new Set();  // 记录本层已使用的值
        for (let i = startIndex; i < nums.length; i++) {
            // 条件1：非递减校验（保证子序列合法）
            if (path.length > 0 && nums[i] < path[path.length - 1]) continue;

            // 条件2：本层去重（避免重复子序列）
            if (used.has(nums[i])) continue;
            used.add(nums[i]);   // 标记本层已使用该值
            path.push(nums[i]);
            backTracking(i + 1); // 递归时直接传i+1，无需used数组
            path.pop();
        }
    }
    backTracking(0);
    return res;
};


// https://leetcode.cn/problems/combination-sum/
// 39. 组合总和
var combinationSum = function (candidates, target) {
    let res = [], path = [];

    function backTracking(startIndex, sum) {
        // 如果当前和已经大于 target，剪枝，返回
        if (sum > target) return;
        // 如果当前和等于 target，找到一个组合，保存
        if (sum === target) {
            res.push([...path]);
            return;
        }

        // 遍历候选数组
        for (let i = startIndex; i < candidates.length; i++) {
            // 做选择
            path.push(candidates[i]);
            // 递归调用，允许重复使用同一个元素，因此 startIndex 不变
            backTracking(i, sum + candidates[i]);
            // 回溯，撤销选择
            path.pop();
        }
    }

    // 初始调用，sum 设置为 0，起始位置从 0 开始
    backTracking(0, 0);
    return res;
};


// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/?envType=problem-list-v2&envId=2cktkvj

// 17. 电话号码的字母组合
var letterCombinations = function(digits) {
    if (!digits) return [];  // Edge case for empty input
    
    const map = new Map([
        ['2', ['a', 'b', 'c']],
        ['3', ['d', 'e', 'f']],
        ['4', ['g', 'h', 'i']],
        ['5', ['j', 'k', 'l']],
        ['6', ['m', 'n', 'o']],
        ['7', ['p', 'q', 'r', 's']],
        ['8', ['t', 'u', 'v']],
        ['9', ['w', 'x', 'y', 'z']],
    ]);
    
    const res = [];
    const path = [];
    
    // Backtracking function to explore all letter combinations
    const backTracking = (index) => {
        if (path.length === digits.length) {
            res.push(path.join(''));
            return;
        }
        
        // Get the letters for the current digit
        const letters = map.get(digits[index]);
        for (let i = 0; i < letters.length; i++) {
            path.push(letters[i]);  // Choose the letter
            backTracking(index + 1);  // Explore the next digit
            path.pop();  // Backtrack and remove the last letter
        }
    };
    backTracking(0);
    
    return res;
};


