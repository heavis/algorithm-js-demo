/**
 * https://leetcode.cn/problems/burst-balloons/solutions/337630/zhe-ge-cai-pu-zi-ji-zai-jia-ye-neng-zuo-guan-jian-/
 * 假如nums = [3,1,5,8]
 * @param {number[]} nums
 * @return {number}
 */
 var maxCoins = function(nums) {
    // n = 4;
    const n = nums.length;
    // 将边界扩展，方便动态规划， 每个计算空间都为开区间
    // temp = [1,3,1,5,8,1]
    const temp = [1, ...nums, 1];
    console.log(temp);

    const dp = new Array(n + 2).fill(null).map((i) => new Array(n + 2).fill(0));
    
    // 动态规划，len最小为3，最大为n + 2
    for (let len = 3; len <= n + 2; len++) {
        // 求[i, i + len - 1]的最大数量
        for (let i = 0; i <= n + 2 - len; i++) {
            let res = 0;
            // i到i + len - 1之间有多种组合，取最大值
            // k在[i + 1, i + len - 2]之间，所谓的开区间
            for (let k = i + 1; k < i + len - 1; k++) {
                // console.log(`dp[${i},${i + len - 1}] = `)
                const value = dp[i][k] + temp[i] * temp[k] * temp[i + len - 1] + dp[k][i + len - 1];
                res = Math.max(res, value);
            }
            // 记录[i + 1, i + len - 2]的最大数量
            dp[i][i + len - 1] = res;
            // console.log(`len=${len}, i=${i},s=${i}, e=${i + len - 1}, res=${res}`);
        }
    }

    return dp[0][n + 1];
};

console.log(maxCoins([3,1,5,8]));