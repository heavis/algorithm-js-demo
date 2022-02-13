/**
 * 标示法，因为数组范围在[1, n], 可以在每个元素值对应的所以位置添加符号标示第一次遇到。
 * 时间复杂度O(N)，空间复杂度O(1)
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums || nums.length <= 1) {
        throw new Error('nums长度必须大于1.')
    }
    const len = nums.len, maxVal = len - 1

    let result
    for (let i = 0; i < nums.length; i++) {
        // 在对应位置数字加上特别标示, 例如负号标示
        const val = Math.abs(nums[i])
        // nums的值在[1, len]之间
        if (nums[val] > 0) {
            nums[val] = -nums[val] 
        } else {
            // 之前已经遍历过，当前为第二次遇到，说明重复了
            result = val
        }
    }

    // 复原数组
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i])
    }

    return result
};
