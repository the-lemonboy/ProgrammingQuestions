// https://leetcode.cn/problems/jump-game/?envType=study-plan-v2&envId=top-100-liked
// 跳跃游戏
var canJump = function(nums) {
    let curMax = 0;  // 当前最大能跳到的下标
    for (let i = 0; i < nums.length; i++) {
        if (i > curMax) return false;  // 如果当前位置超过了当前能跳到的最大位置，说明无法到达
        curMax = Math.max(curMax, i + nums[i]);  // 更新最大跳跃位置
        if (curMax >= nums.length - 1) return true;  // 如果能跳到或超过最后一个位置，直接返回 true
    }
    return false;
}