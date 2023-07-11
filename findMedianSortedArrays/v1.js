/**
 * 简单粗暴，先将两个数组合并，两个有序数组的合并也是归并排序中的一部分。然后根据奇数，还是偶数，返回中位数。
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/solutions/8999/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-2/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    const m = nums1.length, n = nums2.length, mid = Math.ceil((m + n) / 2);
    
    let i = 0, j = 0, arr = [];
    while (i + j <= mid) {
        if (i < m && j < n) {
            if (nums1[i] <= nums2[j]) {
                arr.push(nums1[i++]);
            } else {
                arr.push(nums2[j++]);
            }
        } else if (i < m) {
            arr.push(nums1[i++]);
        } else {
            arr.push(nums2[j++]);
        }
    }

    if ((m + n) % 2) {
        return arr[mid - 1];
    } else {
        return (arr[mid] + arr[mid - 1]) / 2;
    }
};

console.log(findMedianSortedArrays([1, 2], [3, 4]))