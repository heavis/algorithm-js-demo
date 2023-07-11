/**
 *  给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
    题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
    请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * @return {number[]}
 */
 var productExceptSelf = function(nums) {
    const n = nums.length, pLeft = new Array(nums).fill(1), pRight = new Array(n ).fill(1);
    // pLeft[0] = nums[0];
    // pRight[n -1] = nums[n - 1];

    for (let i = 1; i < n; i++) {
        pLeft[i] = nums[i - 1] * pLeft[i - 1];
    }
    for (let j = n - 2; j >= 0; j--) {
        pRight[j] = nums[j + 1] * pRight[j + 1];
    }
    const result = new Array(n).fill(1);
    
    for (let i = 0; i < n; i++) {
        // if (0 < i && i < n - 1) {
        //     result[i] = pLeft[i - 1] * pRight[i + 1];
        // } else if (i === 0) {
        //     result[i] = pRight[i + 1];
        // } else {
        //     result[i] = pLeft[i - 1];
        // }
        result[i] = pLeft[i] * pRight[i];
    }

    return result;
};

console.log(productExceptSelf([1,2,3,4]));