/**
 * 二分查找法
 * 用cnt[i]记录i位置，小于等于数值的个数, 
 * 例如数组[1,3,4,2,2], cnt[1] = 1, cnt[2] = 3, 
 * 假设重复数为target，那么[1, target - 1]中所有数组满足cnt[i] <= i;
 * 而[target, n]中所有数满足cnt[i] > i
 * 因此可以采用二分查找法，找出重复的数字
 * 间复杂度：O(nlogn)，其中n为nums数组的长度。
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums || nums.length <= 1) {
        throw new Error('nums长度必须大于1.')
    }
    let l = 1, r = nums.length - 1, cnt = 0, result = -1

    while (l <= r) {
       let mid = (r + l) >> 1
       cnt = 0
       // cnt记录nums中小于等于mid的个数
       for (i = 0; i < nums.length; i++) {
           cnt += (nums[i] <= mid)
       }

       // 如果cnt为小于等于mid的个数, 如cnt <= mid，说明重复数在[mid, r]之间
       // 如果cnt > mid，说明mid可能为重复数，但还需要判断是不是在[r, mid)中
       // 例如数组[1,3,4,2,2], 初始l = 0, r = 4, cnt = 0, result = -1
       // 第一次遍历: mid = 2, cnt = 3, cnt > mid, mid可能为重复值，但需要继续判断 result = 2, r = 1
       // 第二次遍历：mid = 1, cnt = 1, cnt <= mid, 说明可能在右半部分, l = 2
       // 遍历终止，result = 2为重复值
       if (cnt <= mid) {
           l = mid + 1
       } else { 
           result = mid
           r = mid - 1
       }
    }

    

    return result
};

console.log(findDuplicate([3,1,3,4,2]))
