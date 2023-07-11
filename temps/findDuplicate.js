/**
 * 使用二分查找法
 * cnt记录小于等于value的数量统计：
 * 如果cnt <= value说明重复数在[value + 1, n];否则重复数在[1, value]之间
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    const n = nums.length;
    let result = -1, left = 1, right = n - 1;

    while (left < right) {
        const mid = (left + right) >> 1;
        console.log(left, right, mid);

        let cnt = 0;

        for (let i = 0; i < n; i++) {
            if (nums[i] <= mid) {
                cnt++;
            }
        }
        console.log('cnt:', cnt)

        if (cnt <= mid) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return right;
};

console.log(findDuplicate([1,3,4,2,2]))