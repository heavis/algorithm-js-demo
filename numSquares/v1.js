/**
 * 完全平方数
 * https://leetcode.cn/problems/perfect-squares/solutions/17639/hua-jie-suan-fa-279-wan-quan-ping-fang-shu-by-guan/
 * @param {number} n
 * @return {number}
 */
 var numSquares = function(n) {
    const fn = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // 最坏情况i为一个1的和
        fn[i] = i;
        // 计算i所有的组合可能，假如i为4，j从1到2遍历
        // j = 1时，fn[4] = Math.min(fn[4], fn[3] + 1) = 4, 其中fn[3] = 3
        // j = 2时，fn[4] = Math.min(fn[4], fn[0] + 1) = 1
        // j= 3时，3 * 3 > 4终止
        // 因此 fn[4] = 1
        // 当i为其他数时，同上计算原理
        for (let j = 1; j * j <= i; j++) {
            fn[i] = Math.min(fn[i], fn[i - j * j] + 1);
        }
    }

    return fn[n];
};

console.log(numSquares(5));