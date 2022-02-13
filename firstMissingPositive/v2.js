/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    // 第一个缺失的正整数肯定在[1, n+1]内，当nums中数据都包含在[1, n]，那第一个缺失的正整数就为n + 1
    // 可以考虑用哈希表表示
    const len = nums.length

    // 将所有小于等于0的数统一赋值为 len + 1，后续统一用-1来表示hash表对应索引被占用
    for (let i = 0; i < len; i++) {
        if (nums[i] <= 0) {
            nums[i] = len + 1
        }
    }
    // 如果值在[1, len]范围内，在对应的[val - 1]索引标示为-1,标示 val值已经存在.
    for (let i = 0; i < len; i++) {
        if (0 < Math.abs(nums[i]) && Math.abs(nums[i]) <= len) {
            const tagIndex = Math.abs(nums[i]) - 1    
            nums[tagIndex] = -Math.abs(nums[tagIndex])      
        }
    }
    // 遍历找到第一个不为-1的值，该值对应的索引即为我们要求得的缺失的第一个整数
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) {
            return i + 1
        }
    }

    return len + 1
};

console.log(firstMissingPositive([3,4,-1,1]))
console.log(firstMissingPositive([1,2,0]))
console.log(firstMissingPositive([7,8,9,11,12]))
