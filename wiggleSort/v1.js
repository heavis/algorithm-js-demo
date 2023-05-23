/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var wiggleSort = function(nums) {
    const n = nums.length, mid = Math.ceil(n /2);
    // 先正序排序
    nums.sort((a, b) => a - b);
    console.log(nums);
    // 截取数组为nums1, nums2两部分并分别倒序排列
    const nums1 = nums.slice(0, mid).sort((a, b) => b - a);
    const nums2 = nums.slice(mid).sort((a, b) => b - a);
    console.log(nums1, nums2)
    for (let i = 0, j = 0; i < mid; i++) {
        nums[j++] = nums1[i];
        if (i < nums2.length) {
            nums[j++] = nums2[i];
        } 
    }

    return nums;
    // return [...nums1, ...nums2]
};


console.log(wiggleSort([10,1,7,2,10,5,8,4,9,4,10,8,8,1,5,6,8,9,2,1]));