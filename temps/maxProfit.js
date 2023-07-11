/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    const n = prices.length;
    const profitF = [...new Array(n)].map(() => []);
    profitF[0][0] = -prices[0];
    profitF[0][1] = 0;
    profitF[0][2] = 0;

    for (let i = 1; i < n; i++) {
        profitF[i][0] = Math.max(profitF[i - 1][0], profitF[ i -1][2] - prices[i]);
        profitF[i][1] = Math.max(profitF[i - 1][0] + prices[i]);
        profitF[i][2] = Math.max(profitF[i - 1][1], profitF[i - 1][2]);
    }
    const res = Math.max(profitF[n - 1][1], profitF[n - 1][2]);

    return res;
};

console.log(maxProfit([1,2,3,0,2]));