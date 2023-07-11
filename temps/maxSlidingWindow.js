/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    const slidNums = [], result = [];
    let left = 0, right = 0;

    function insert(i) {
        while (slidNums.length && slidNums[0] < left) {
            slidNums.shift();
        }
        while (slidNums.length && nums[slidNums[slidNums.length - 1]] <= nums[i]) {
            slidNums.pop(); 
        }
        slidNums.push(i);
    }

    for (let i = 0; i < nums.length; i++) {
        insert(i);

        if (right - left + 1 === k) {
            insert(i);
            result.push(nums[slidNums[0]]);

            left++;
        }

        right++;
    }

    return result;
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));