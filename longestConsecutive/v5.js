/**
 * 参考“缺失的第一个正整数”算法，可结合哈希表实现
 * 设置一个长度等于数组最大值的哈希表，遍历数组，将值当着索引，把哈希表对应位置的value设置为1
 * 
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    if (!nums.length) {
        return 0
    }

    const hashArr = [], len = nums.length
    let continuousLen = 0
    for (let i = 0; i < len; i++) {
        hashArr[nums[i]] = 1
    }

    for (let i = 0; i < len; i++) {
        let rightMaxLen = 0, j = nums[i]
        // 如果j - 1存在，则跳过，直接用j - 1算连续长度
        if (hashArr[j - 1] === 1) {
            continue
        }
        while(hashArr[j] === 1) {
            // 计算索引j右连续长度
            rightMaxLen++
            j++
        }
        continuousLen = Math.max(continuousLen, rightMaxLen)
    }

    return continuousLen
}

//const nums = [100,4,200,1,3,2]
//const nums = [0,3,7,2,5,8,4,6,0,1]
const nums = [1, 0, -1]

console.log(longestConsecutive(nums))
