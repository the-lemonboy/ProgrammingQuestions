// https://leetcode.cn/problems/merge-intervals/description/
var merge = function(intervals) {
    intervals.sort((p, q) => p[0] - q[0]);
    const res = []
    for(let value of intervals){
        if(res.length && value[0]<=res[res.length-1][1]){
            res[res.length-1][1] =  Math.max(res[res.length - 1][1], value[1]);
        }else{
            res.push(value)
        }
    }
    return res
};