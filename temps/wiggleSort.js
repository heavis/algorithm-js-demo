/**
 * https://leetcode.cn/problems/wiggle-sort-ii/solutions/45144/yi-bu-yi-bu-jiang-shi-jian-fu-za-du-cong-onlognjia/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var wiggleSort = function(nums) {
    const n = nums.length, mid = Math.ceil( n / 2);
    nums.sort((a, b) => a - b);

    const nums1 = nums.slice(0, mid).sort((a, b) => b - a);
    const nums2 = nums.slice(mid).sort((a, b) => b - a);

    for (let i = 0, j = 0; i < mid ;i++) {
        nums[j++] = nums1[i];
        if (i < mid) {
            nums[j++] = nums2[i];
        }
    }

    return nums;
};
console.log(wiggleSort([10,1,7,2,10,5,8,4,9,4,10,8,8,1,5,6,8,9,2,1]))