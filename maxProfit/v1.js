/**
 *  我们目前持有一支股票，对应的「累计最大收益」记为 f[i][0]f[i][0]f[i][0]；
    我们目前不持有任何股票，并且处于冷冻期中，对应的「累计最大收益」记为 f[i][1]f[i][1]f[i][1]；
    我们目前不持有任何股票，并且不处于冷冻期中，对应的「累计最大收益」记为 f[i][2]f[i][2]f[i][2]。
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/solutions/323509/zui-jia-mai-mai-gu-piao-shi-ji-han-leng-dong-qi-4/
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    if (prices.length === 0) {
        return 0;
    }
    const length = prices.length;
    // f[i][0]表示第i天持有股票的最大收益
    // f[i][1]表示第i天不持有股票、处于冷冻期的最大收益
    // f[i][2]表示第i天不持有股票、不处于冷冻期的最大收益
    let f0 = -prices[0];
    let f1 = 0;
    let f2 = 0;

    for (let i = 1; i < length; i++) {
        const cur0 = Math.max(f2 - prices[i], f0);
        const cur1 = Math.max(f0 + prices[i]);
        const cur2 = Math.max(f1, f2);

        f0 = cur0;
        f1 = cur1;
        f2 = cur2;
    }
    
    return Math.max(f0, f1, f2);
};

console.log(maxProfit([1,2,3,0,2]));