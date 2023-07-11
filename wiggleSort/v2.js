function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

/**
 * 快速选择算法
 * @param {*} nums 
 * @param {*} begin 
 * @param {*} end 
 * @param {*} mid 分界位置，左边的小于等于nums[n]，右边的大于等于nums[n]
 */
function quickSelect(nums, begin, end, mid) {
    // i位置存储的值小于等于t
    let i = begin, j = begin, t = nums[end - 1];
    while (j < end) {
        if (nums[j] <= t) {
            swap(nums, i++, j++);
        } else {
            j++;
        }
    }
    // i - 1为t值所在位置，i - 1左边的保证小于等于t，右边大于等于t
    if (i - 1 > mid) { // 当i - 1大于mid时：从i - 1右侧元素肯定大于等于mid；但左侧不能保证，因此需要对左侧继续遍历
        quickSelect(nums, begin, i - 1, mid);
    } else if (i - 1 < mid) { // 右侧需要继续遍历
        quickSelect(nums, i, end, mid);
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var wiggleSort = function(nums) {
    let i = 0, j = 0, k = nums.length - 1, mid = Math.floor(nums.length / 2);
    quickSelect(nums, i, nums.length, mid);

    while (j < k) {
        if (nums[j] > nums[mid]) {
            swap(nums, j, k);
            k--;
        } else if (nums[j] < nums[mid]) {
            swap(nums, i, j);
            i++;
            j++;
        } else {
            j++
        }
    }
    mid = Math.ceil(nums.length / 2);
    const temp1 = nums.slice(0, mid);
    const temp2 = nums.slice(mid);
    for (let l = 0; l < temp1.length; l++) {
        nums[2 * l] = temp1[temp1.length - l - 1];
    }
    for (let l = 0; l < temp2.length; l++) {
        nums[2 * l + 1] = temp2[temp2.length - l - 1];
    }

    return nums;
};


console.log(wiggleSort([1,1,2,1,2,2,1]));