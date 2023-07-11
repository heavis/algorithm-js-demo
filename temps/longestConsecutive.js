/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    // 先对数组排序，然后使用动态规划fn记录每个位置的前序最长连续数
    // [100,4,200,1,3,2] 排序之后为[1,2,3,4,100,200]
    const  n = nums.length;
    if (n <= 1) {
        return nums.length;
    }


    nums.sort((a, b) => a - b > 0 ? 1 : -1);
    const fn = new Array(nums.length).fill(0);
    fn[0] = 1;
    let res = 1;


    for (let i = 1; i < n; i++) {
        if (nums[i] === nums[i - 1]) {
            fn[i] = fn[i - 1];
            continue;
        }
        fn[i] = nums[i] - nums[i - 1] === 1 ? fn[i - 1] + 1 : 1;
        res = Math.max(res, fn[i]);
    }

    return res;
};

console.log(longestConsecutive([0,0]));