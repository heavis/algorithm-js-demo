/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    const map = new Map();
    const res = [];

    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i], match = target - cur;
        if (map.has(match)) {
            res.push(map.get(match), i);
            break;
        } else {
            map.set(cur, i);
        }
    }

    return res;
};
console.log(twoSum(nums = [3,2,4], target = 6))