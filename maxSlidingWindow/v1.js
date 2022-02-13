/**
 * 暴力解法，双层遍历，外层遍历len - k + 1次，内层遍历k次，每次取出最大值
 * 时间复杂度O(N²)
 * @param {数组} nums 
 * @param {滑窗长度} k 
 * @returns 滑动窗口最大值
 */
function maxSlidingWindow(nums, k) {
    const result = []

    if (k > nums.length) {
        throw new Error('k不能大于nums的长度')
    }
    const slidLen = nums.length - k + 1

    let  maxIndex = -1
    for (let i = 0; i < slidLen; i++) {
        // maxIndex存储了上一次窗口的最大值索引，当前遍历判断maxIndex是否包含在窗口内
        // 如果包含，则将窗口最后一个值与maxIndex对应的元素比较
        if (maxIndex >= i) {
            if (nums[i + k - 1] > nums[maxIndex]) {
                maxIndex = i + k - 1
                result[i] = nums[maxIndex]
                continue
            }
        }
        let max = -Infinity
        for (let j = i; j < i + k; j++) {
            if (max <= nums[j]) {
                maxIndex = j
                max = nums[j]
            }
        }
        result[i] = max
    }

    return result
};

const res = maxSlidingWindow([1,-1], 1)
console.log(res)
