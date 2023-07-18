/**
 * 声明i,j,j三个变量表示数组的索引位置
 * 1.i=len-2,j = len-1,往前遍历nums，找到第一个nums[i] < nums[j]的位置。
 * 2.设置k=len-1,从len-1位置往前遍历，找到第一个nums[i] < nums[k]的位置。
 * 3.将i 与 k 交换。
 * 4.此时，j到len肯定为降序排列，因此需要将其置逆。
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function(nums) {
    if (nums.length <= 1) {
        return;
    }
    const n = nums.length;
    let i = n - 2, j = n - 1, k = n - 1;

    while (nums[i] >= nums[j]) {
        i--;
        j--;
    }
    if (i >= 0) {
        while (k >= j && nums[k] >= nums[i]) {
            k--;
        }
        [nums[i], nums[k]] = [nums[k], nums[i]];        
    }


    let r = n - 1;
    while (j < r) {
        [nums[j], nums[r]] = [nums[r], nums[j]]
        r--;
        j++;
    }
}