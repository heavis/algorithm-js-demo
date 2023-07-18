/**
 * 排序 + 双指针
 * 双指针由两边向中间遍历
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
        if (nums.length < 3) {
            return [];
        }
        nums.sort((a, b) => a - b > 0 ? 1 : -1);
        console.log(nums);
        const res = [];
        for (let i = 0; i < nums.length; i++) {
            let l = i + 1, r = nums.length - 1;
            if (nums[i] > 0) {
                break;
            }
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }
            while (l < r) {
                if (nums[i] + nums[l] + nums[r] === 0) {
                    res.push([nums[i], nums[l], nums[r]]);
                    while (l < r && nums[l] === nums[l + 1]) {
                        l++;
                    }
                    while (l < r &&nums[r] === nums[r - 1]) {
                        r--;
                    }

                    l++;
                    r--;
                } else if (nums[i] + nums[l] + nums[r] > 0) {
                    r--;
                } else {    
                    l++;
                }


            }
        }

        return res;
};

console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]))