/**
 * 参考“缺失的第一个正整数”算法，可结合哈希表实现
 * 设置一个长度等于数组最大值的哈希表，遍历数组，将值当着索引，把哈希表对应位置的value设置为1
 * 在遍历一次哈希表,其值为1的连续序列长度即为最大长度
 * 问题：当连续的值特别多时，例如nums刚好是1到99999999的连续证书，则每次while都会遍历n次
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    if (!nums.length) {
        return 0
    }

    const hashArr = [], len = nums.length
    let max = -Infinity, min = Infinity, continuousLen = 0
    for (let i = 0; i < len; i++) {
        hashArr[nums[i]] = 1
        max = Math.max(max, nums[i])
        min = Math.min(min, nums[i])
    }

    let tempMaxLen = 0
    for (let i = 0; i < len; i++) {
        let min = nums[i]
        while(hashArr[min] === 1) {
            tempMaxLen++
            min++
        }
        continuousLen = Math.max(continuousLen, tempMaxLen)
        tempMaxLen = 0
    }

    return continuousLen
}

//const nums = [100,4,200,1,3,2]
const nums = [0,3,7,2,5,8,4,6,0,1]

console.log(longestConsecutive(nums))
