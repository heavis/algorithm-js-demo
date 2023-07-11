/**
 * 乘积最大子数组
 * https://leetcode.cn/problems/maximum-product-subarray/solutions/250015/cheng-ji-zui-da-zi-shu-zu-by-leetcode-solution/
 * @param {number[]} nums
 * @return {number}
 */
 var maxProduct = function(nums) {
    const maxF = Array.from(nums), minF = Array.from(nums);

    for (let i = 1; i < nums.length; i++) {
        maxF[i] = Math.max(maxF[i - 1] * nums[i], Math.max(minF[i - 1] * nums[i], nums[i]));
        minF[i] = Math.min(minF[i - 1] * nums[i], Math.min(maxF[i - 1] * nums[i], nums[i]));
    }
    console.log(maxF);

    let res = maxF[0];
    for (let i = 0; i < maxF.length; i++) {
        res = Math.max(res, maxF[i]);
    }

    return res;
};

console.log(maxProduct([2,3,-2,4]))