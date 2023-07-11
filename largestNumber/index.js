// 最大数
// https://leetcode.cn/leetbook/read/top-interview-questions-hard/xd3jrg/

/**
 * @param {number[]} nums
 * @return {string}
 */
 var largestNumber = function(nums) {
    // 按最高位排序，如果贵高位相等，再判断下一位
    const sortedNums = [];

    nums.forEach(n => sortedNums.push(n));

    sortedNums.sort((a, b) => {
        const ab = a + '' + b, ba = b + '' + a;
        if (ab === ba) {
            return 0;
        }

        return ab - ba < 0 ? 1 : -1;
    });

    let k = 0;
    for (let i = 0; i < sortedNums.length - 1; i++) {
        if (sortedNums[i] === 0) {
            k++;
            continue;
        }
        break;
    }

    return sortedNums.slice(k).join('');
};
console.log(largestNumber([0,0]));