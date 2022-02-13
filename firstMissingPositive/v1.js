/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    // 定义有效范围区间，初始区间为所有正整数
    let ranges = [[1, Infinity]]
    for (let vi = 0; vi < nums.length; vi++) {
        const value = nums[vi]
        // 遍历有效范围，和value进行匹配
        for (let rgej = 0; rgej < ranges.length; rgej++) {
            const min = ranges[rgej][0], max = ranges[rgej][1]
            // 如果value位于当前区间内，需要将当前区间拆分为[min, value - 1]和[value + 1, max]
            if (min < value && value < max) {
                ranges.splice(rgej, 1, [min, value - 1], [value + 1, max])
               // 一分为二，那么索引要跳过，减少无效判断
                rgej++
            } else {
                if (min === value) {
                    ranges[rgej] = [min + 1, max]
                } else if (max === value) {
                    ranges[rgej] = [min, max - 1]
                }
                // 如果调整后有无效的区间，例如[4,3]，则从ranges移除并调整索引
                if (ranges[rgej][0] > ranges[rgej][1]) {
                    ranges.splice(rgej, 1)
                    rgej--
                }
            }
        }
    }

    return ranges[0][0]
};

console.log(firstMissingPositive([3,4,-1,1]))
console.log(firstMissingPositive([1,2,0]))
console.log(firstMissingPositive([7,8,9,11,12]))
