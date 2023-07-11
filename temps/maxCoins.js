/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxCoins = function(nums) {
    const n = nums.length, temp = [1, ...nums, 1];
    const dp = new Array(n + 2).fill(null).map(() => new Array(n + 2).fill(0));

    for (let len = 3; len <= n + 2; len++) {
        for (let i = 0; i <= n + 2 - len; i++) {
            let res = 0;
            for (let k = i + 1; k < i + len - 1; k++) {
                res = Math.max(res, dp[i][k] + temp[i] * temp[k] * temp[i + len - 1] + dp[k][i + len - 1]);
            }
            console.log(i, i + len - 1, res);
            dp[i][i + len - 1] = res;
        }
    }

    console.log(dp);
    return dp[0][n + 1];
};
console.log(maxCoins([3,1,5,8]));