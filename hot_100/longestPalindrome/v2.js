/**
 * 动态规划计算i,j之间是否为回文串
 * 当l、r间距小于等三,dp[i][j] = s[l] === s[r]
 * 当l、r间距大于3, dp[i][j] = dp[i + 1][j - 1]
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    if (!s || s.length < 2) {
        return s || '';
    }
    const n = s.length;
    const dp = Array.from(new Array(n), (v) => new Array(n).fill(false));
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    let begin = 0, maxLen = 1;

    for (let L = 2; L <= n; L++) {
        for (let i = 0; i < n; i++) {
            const r = i + L - 1;

            if (r >= n) {
                break;
            }
            console.log(i, r, s[i], s[r])
            if (r - i < 3) {
                dp[i][r] = s[i] === s[r];
            } else {
                dp[i][r] = dp[i + 1][r - 1] && s[i] === s[r];
            }

            if (dp[i][r] && r - i + 1 > maxLen) {
                begin = i;
                maxLen = r - i + 1;
            }
        }
    }
    console.log(begin, maxLen);

    return s.substring(begin,begin + maxLen);
 }

 console.log(longestPalindrome("ac"));