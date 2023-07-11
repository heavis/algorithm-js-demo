/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    // 题目要求使用常数级空间，考虑使用索引占位，例如数字3应该放到索引2位置。遍历一次数组，将数字放到对应索引处
    // 然后再次遍历数组，找到第一个索引和数组不匹配
    // 如果未找到，则结果为最后一个值+1
    const n = nums.length + 1;

    for (let i = 0 ; i < n; i++) {
        let curVal = nums[i];
        while (0 < curVal && curVal <= n) {
            if (nums[curVal - 1] === curVal) {
                break;
            }
            const temp = nums[curVal- 1];
            nums[curVal - 1] = curVal;
            curVal = temp;
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    return nums[n - 1] + 1;
};

console.log(firstMissingPositive([3,4,-1,1]));