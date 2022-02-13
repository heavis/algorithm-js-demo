/**
 * 参考“缺失的第一个正整数”算法，可结合哈希表实现
 * 设置一个长度等于数组最大值的哈希表，遍历数组，将值当着索引，把哈希表对应位置的value设置为1
 * 在遍历一次哈希表,其值为1的连续序列长度即为最大长度
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    const hashArr = [], len = nums.length
    let max = -Infinity, continuousLen = 0

    for (let i = 0; i < len; i++) {
        hashArr[nums[i]] = 1
        max = Math.max(max, nums[i])
    }

    let tempMaxLen = 0
    for (let i = 0; i <= max; i++) {
        if (hashArr[i] === 1) { // 如果索引i处的value有值，可能连续，将tempMaxLen加1
            tempMaxLen++
        } else { // 连续被中断，将上一次连续值和结果continuousLen比较，保存最大值
            continuousLen = Math.max(continuousLen, tempMaxLen)
            // 清零tempMaxLen，重新计算连续长度
            tempMaxLen = 0
        }
    }
    continuousLen = Math.max(continuousLen, tempMaxLen)

    return continuousLen
}

//const nums = [100,4,200,1,3,2]
const nums = [0,3,7,2,5,8,4,6,0,1]

console.log(longestConsecutive(nums))
