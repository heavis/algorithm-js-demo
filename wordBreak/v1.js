/**
 * https://leetcode.cn/problems/word-break/solutions/302471/dan-ci-chai-fen-by-leetcode-solution/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = function(s, wordDict) {
    const length = s.length;
    const dp = new Array(length + 1).fill(false);
    const hash = new Set(wordDict);
    // 默认空字符串可匹配， dp[0]很重要
    dp[0] = true;
    for (let i = 1; i <= length; i++) {
        for (let j = 0; j < i; j++) {
            // 判断[0, j -1]的s1是否合法，判断[j, i - 1]是否合法，当两个都合法时则dp[i]合法
            if (dp[j] && hash.has(s.substring(j, i))) {
                dp[i] = true;
                // console.log(`i = ${i}, s = ${s.substring(0, i)}, j = ${j}, last=${s.substring(j, i)}, dp[${j}] = ${dp[j]}, dp[${i}] = ${dp[i]}`);

                break;
            }
            // console.log(`i = ${i}, s = ${s.substring(0, i)}, j = ${j}, last=${s.substring(j, i)}, dp[${j}] = ${dp[j]}, dp[${i}] = ${dp[i]}`);
        }
    }

    // console.log('result:', dp[length]);

    return dp[length];
};

wordBreak('leetcode',  ["leet", "code"]);