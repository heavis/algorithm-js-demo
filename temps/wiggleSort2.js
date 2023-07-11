/**
 * 快速选择算法
 * @param {*} nums 
 * @param {*} begin 
 * @param {*} end 
 * @param {*} mid 分界位置，左边的小于等于nums[n]，右边的大于等于nums[n]
 */
 function quickSelect(nums, begin, end, mid) {
    // i位置存储的值小于等于t
    let i = begin, j = begin, t = nums[end];
    // console.log('b', i, j, end, mid, nums)
    while (j <= end) {
        if (nums[j] <= t) {
            [nums[i++], nums[j++]] = [nums[j], nums[i]]
        } else {
            j++;
        }
    }
    // console.log('a', i, j, end, mid, nums)
    if (i - 1 > mid) {
        // console.log('i - 1 > mid', begin, i - 1);
        quickSelect(nums, begin, i - 1, mid);
    } else if (i - 1 < mid) {
        // console.log('i - 1 < mid', i, end);
        quickSelect(nums, i, end, mid);
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var wiggleSort = function(nums) {
    let i = 0, j = 0, k = nums.length - 1, mid = Math.floor(nums.length / 2);
    quickSelect(nums, i, k, mid);
    const nums1 = nums.slice(0, mid);
    const nums2 = nums.slice(mid);
    console.log(nums1, nums2);
    for (let i = 0; i < nums1.length; i++) {
        nums[i * 2] = nums1[nums1.length - i - 1];
    }
    for (let i = 0; i < nums2.length; i++) {
        console.log(i * 2 + 1, nums2.length - i - 1, nums2[nums2.length - i - 1])
        nums[i * 2 + 1] = nums2[nums2.length - i - 1];
    }

    return nums;
 }

 console.log(wiggleSort([1,3,2,2,3,1]));