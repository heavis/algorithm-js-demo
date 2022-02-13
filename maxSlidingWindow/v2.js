/**
 * 将已经遍历过的元素用双向队列维护起来，并且双向队列中存储的元素满足倒序排序。
 * 双向队列要求，所有元素从队尾入队，如果队尾元素小于要推入的元素，则移除队尾元素，直到满足要推入的元素小于队尾元素
 * 双向队列存储的元素，必须是在[l, r]区间的，否则从队首移除。
 * @param {}} nums 
 * @param {*} k 
 * @returns 
 */
function maxSlidingWindow(nums, k) {
    const result = []

    if (k > nums.length) {
        throw new Error('k不能大于nums的长度')
    }

    let dequeue = [], left = right = 0
    for (let i = 0; i < nums.length; i++) {
        // 如果当前元素大于队列尾部元素，删除尾部元素
        while (dequeue.length && nums[dequeue[dequeue.length - 1]] < nums[i]) {
            dequeue.pop()
        }
        dequeue.push(i)
        // 移除队列中索引小于left的
        while(dequeue.length && dequeue[0] < left) {
            dequeue.shift()
        }
        // 长度满足滑动窗口
        if (right - left + 1 === k) {
            result.push(nums[dequeue[0]])
            left++
        }
        right++
    }

    return result
};

const res = maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)
console.log(res)
