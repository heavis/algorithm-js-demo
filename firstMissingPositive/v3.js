/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    // 置换法，将val在[1, len]范围内的数值置换到正确的位置，当所有数据都置换完成后，重新遍历数组
    // 第一个val和索引不对应的位置即为需要找的第一个缺失正整数
    const len = nums.length

    for (let i = 0; i < len; i++) {
        // [3,4,-1,1], 将3存放到nums[3 - 1]，将4存放到[4 - 1]，-1跳过, 1存放到[1 - 1]
        // 需要考虑占用的问题，例如4存放到nums[4 - 1]，但原来索引3位置存放的数1也要考虑存放到正确的位置
        // 当nums[i]不在[1, len]或者nums[i] = i + 1时，将终止当前替换
        while (1 <= nums[i] && nums[i] <= len && nums[nums[i] - 1] !== nums[i]) {
            const tempVal = nums[nums[i] - 1]
            nums[nums[i] - 1] = nums[i]
            nums[i] = tempVal
        }

    }

    for (let i = 0; i < len; i++) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }

    return len + 1
};

console.log(firstMissingPositive([3,4,-1,1]))
console.log(firstMissingPositive([1,2,0]))
console.log(firstMissingPositive([7,8,9,11,12]))
