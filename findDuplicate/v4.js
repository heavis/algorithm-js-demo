/**
 * 二进制法
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums || nums.length <= 1) {
        throw new Error('nums长度必须大于1.')
    }
    let bitMax = 31, n = nums.length, resultBit = 0
    
    // 求长度n对应的最高二进制位, 因为必定有重复，所以数值范围为[1, n - 1]
    while(!((n - 1) >> bitMax)) {
        bitMax--
    }
    for (let i = 0; i <= bitMax; i++) {
        let x = 0, y =0
        for (let j = 0; j < n; j++) {
            if (nums[j] & 1 << i) {
                x += 1
            }
            // 这里j表示[1, n - 1]，所以要排除0
            if (j > 0 && (j & (1 << i))) {
                y += 1
            }
        }
        console.log('x, y:' + x + ',' + y)
        if (x > y) {
            // 按位取或， 如101与011按位取或结果为111
            resultBit |= 1 << i
        }
    }

    return resultBit 
};

console.log(findDuplicate([1,3,4,2,2]))
