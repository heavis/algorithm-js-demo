

/**
 * 采用动态规划
 * 细节：*号前面肯定是一个元素，并且前面的元素不能也为*号
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function(s, p) {
    // 用dp[i][j]存储动态规划结果
    // 先计算边界值，dp[0][0]=true，dp[i][0]为false，dp[0][j]只有前j个字符连续为*才为true
    const m = s.length, n = p.length;
    const dp = new Array(m + 1).fill(undefined);
    dp.forEach((val, i) => {
        dp[i] = new Array(n + 1).fill(false);
    });
    dp[0][0] = true;

    function matchs(i, j) {
        if (i === 0) {
            return false;
        }
        if (p[j - 1] === '.') {
            return true
        }  else {
            return p[j - 1] === s[i - 1];
        }
    }

    for (let i = 0; i <= m; i++) {
        for (let j = 1; j <=n; j++) {
            if (p[j - 1] === '*') {
                // 假设 *和j-1匹配0次，则i,j的结果为i,j - 2的匹配结果
                dp[i][j] = dp[i][j - 2];
                //假如*和j - 1匹配一次或者多次， 如果 i和j-1匹配，则dp[i][j]的结果为dp[i - 1][j]的结果
                if (matchs(i, j - 1)) {
                    dp[i][j] |= dp[i - 1][j];
                }
            } else if (matchs(i, j)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }


    return !!dp[m][n];
};

console.log(isMatch("aaa", 'a*a'));