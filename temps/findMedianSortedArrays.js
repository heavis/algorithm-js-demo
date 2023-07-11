var findMedianSortedArrays = function(nums1, nums2) {
    const m = nums1.length, n = nums2.length, mid = Math.ceil((m + n) / 2) | 0, arr = [];
    let i = 0, j = 0;
    while (i + j <= mid) {
        if (i === m) {
            arr.push(nums2[j++]);
            continue;
        }

        if (j === n) {
            arr.push(nums1[i++]);
            continue;
        }

        if (nums1[i] <= nums2[j]) {
            arr.push(nums1[i++]);
        } else {
            arr.push(nums2[j++]);
        }
    }
    console.log(arr, mid);
    if (mid % 2 === 0) {
        return (arr[mid - 1] + arr[mid]) / 2;
    } else {
        return arr[mid - 1];
    }
}

const nums1 = [1,2], nums2 = [3, 4];
console.log(findMedianSortedArrays(nums1, nums2));