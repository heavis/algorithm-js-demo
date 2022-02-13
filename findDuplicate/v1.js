/**
 * @param {number[]} nums
 * @return {number}
 */
 var findDuplicate = function(nums) {
    if (!nums || nums.length <= 1) {
        throw new Error('nums长度必须大于1.')
    }
    for (let i = 0; i < nums.length; i++) {
        for (j = i + 1; j < nums.length; j++) {
           if (nums[i] === nums[j]) {
               return nums[i]
           } 
        }
    }

    return undefined
};

console.log(findDuplicate([1,3,4,2,2]))
