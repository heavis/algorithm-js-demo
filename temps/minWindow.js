
/**
 * s = "ADOBECODEBANC", t = "ABC"
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    // 使用count数组记录t中字符出现的次数，cLen记录字符个数
    // 使用begin记录滑动窗口左边界。当cLen为0时，minLen记录满足条件的最小长度
    // begin向后移动时，cLen加1

    const count = new Array(128).fill(0);
    let cLen = t.length, l = 0, begin = 0, minLen = s.length + 1;

    for (let i = 0; i < cLen; i++) {
        count[t.charCodeAt(i)]++;
    }
    for (let r = 0; r < s.length; r++) {
        if (count[s.charCodeAt(r)]-- > 0) {
            cLen--;
        }
        while (cLen === 0) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                begin = l;
            }
            if (count[s.charCodeAt(l++)]++ === 0) {
                cLen++;
            }
        }
    }

    return minLen < s.length + 1 ? s.substring(begin, begin + minLen) : '';
};

console.log(minWindow(s = "ADOBECODEBANC", t = "ABC"))