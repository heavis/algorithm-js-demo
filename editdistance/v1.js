/**
 * 最小编辑距离
 * d[i][j]表示长度为i的word1到长度为j的Word2之间的距离，求法考虑三种情况
 * 1. 先求出d[i][j - 1]距离，然后在新增一个字符，总长度为d[i][j - 1] + 1
 * 2. 先求出d[i - 1][j]距离， 然后再删除一个字符串，总长度为d[i - 1][j] + 1
 * 3.先求出d[i - 1][j - 1]距离，然后判断最后一个字符串i、j是否相等，相等则加0，否则加1
 * 最终d[m][n]即为长度为m的字符串word1转换为长度为j的字符串word2所需要的步骤
 * @param {*} word1 
 * @param {*} word2 
 */
function minDistance(word1, word2) {
    if (!word1 && !word2) {
        return 0
    }
    if (!word1) {
        return word2.length
    }
    if (!word2) {
        return word1.length
    }
    // 初始化数据
    const dp = new Array(word1.length + 1)
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(word2.length).fill(0)
    }
    
    // wor1不为空，word2为空，delete操作
    for (let i = 0; i <= word1.length; i++) {
        dp[i][0] = i 
    }
    // word1为空，word2不为空，insert操作
    for (let j = 0; j <= word2.length; j++) {
        dp[0][j] = j
    }

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            let insert = dp[i][j - 1] + 1
            let deletion = dp[i - 1][j] + 1
            let replaces = dp[i - 1][j - 1] + (word1[i] === word2[j] ? 0 : 1)

            dp[i][j] = Math.min(insert, deletion, replaces)
        }
    }
    
    return dp[word1.length][word2.length]
}

console.log(minDistance('w1', 'w22'))
