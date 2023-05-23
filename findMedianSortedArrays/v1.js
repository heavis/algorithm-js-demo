/**
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