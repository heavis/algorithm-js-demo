/**
 * 采用动态规划
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
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = true;
        } else {
            break;
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === p[j - 1] || p[j - 1] === '?') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else {
                dp[i][j] = false;
            }
        }
    }

    return dp[m][n];
};

console.log(isMatch("aa", '*'));