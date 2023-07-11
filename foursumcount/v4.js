/**
* @param {number[]} nums1
* @param {number[]} nums2
* @param {number[]} nums3
* @param {number[]} nums4
* @return {number}
*/
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    // 先将nums1、nums2两个数组和组合用map记录，key为和，value为和出现次数
    // 然后遍历nums3、nums4，组合求和sum，判断-sum在map中是否存在，结果+1
    let result = 0;
    const halfMap = new Map();

    nums1.forEach(val1 => nums2.forEach(val2 => {
        const sum = val1 + val2;
        if (!halfMap.has(sum)) {
            halfMap.set(sum, 0);
        }
        halfMap.set(sum, halfMap.get(sum) + 1);
    }));

    for (let i = 0; i < nums3.length; i++) {
        for (let j = 0; j < nums4.length; j++) {
            const sum = nums3[i] + nums4[j];
            if (halfMap.has(-sum)) {
                result += halfMap.get(-sum);
            }
        }
    }

    return result;
};