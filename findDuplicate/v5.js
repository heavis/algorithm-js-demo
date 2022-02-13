/**
 *  「Floyd 判圈算法」（又称龟兔赛跑算法）
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums || nums.length <= 1) {
        throw new Error('nums长度必须大于1.')
    }
    let slow = 0, fast = 0
    // 找出slow、fast相遇时p点的位置
    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while(slow != fast)
    
    
    slow = 0
    // 求出入口位置，也即重复数
    while (slow != fast) {
        slow = nums[slow]
        fast = nums[fast]
    }
    
    return nums[fast]
};

console.log(findDuplicate([1,3,4,2,2]))
