/**
 * 参考“缺失的第一个正整数”算法，可结合哈希表实现
 * 设置一个长度等于数组最大值的哈希表，遍历数组，将值当着索引，把哈希表对应位置的value设置为1
 * 遍历nums数组，将nums[i]的值作为索引，左右遍历，找出连续的长度
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

    for (let i = 0; i < len; i++) {
        let rightMaxLen = 0, leftMaxLen = 0
        //如果连续长难度大于剩下的数组长度，则终止遍历
        if (continuousLen > len - i) {
            break;
        }
        let j = nums[i]
        while(hashArr[j] === 1) {
            // 计算索引j右连续长度
            rightMaxLen++
            j++
        }
        j = nums[i]
        while(hashArr[j] === 1) {
            // 计算索引j左连续长度
            leftMaxLen++
            j--
        }
        continuousLen = Math.max(continuousLen, leftMaxLen + rightMaxLen - 1)
    }

    return continuousLen
}

//const nums = [100,4,200,1,3,2]
//const nums = [0,3,7,2,5,8,4,6,0,1]
const nums = [1, 0, -1]

console.log(longestConsecutive(nums))
