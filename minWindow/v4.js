/**
 * 最小覆盖子串
 * 和v3类似，当通过减法统计
 * https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    let count = new Array(128).fill(0)
    let tLen = t.length
    for (let i = 0; i < tLen; i++) {
        const c = t[i].charCodeAt(0)
        count[c]++
    }

    let l = 0, begin = 0, minLen = Infinity
    for (let r = 0; r < s.length; r++) {
        if (count[s.charCodeAt(r)]-- > 0) {
            tLen--
        }
        while(tLen === 0) {
            if (r - l < minLen) {
                begin = l
                minLen = r - l + 1
            }
            if (count[s.charCodeAt(l++)]++ === 0) {
                tLen++
            }
        }
    }

    return minLen === Infinity ? '' : s.substring(begin, begin + minLen)
};

console.log(minWindow("ADOBECODEBANC", "ABC"))
// console.log(minWindow(s = "a", t = "a"))
// console.log(minWindow(s = "a", t = "aa"))
