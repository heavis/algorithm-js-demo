/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    if (!s || !s.length) {
        return 0;
    }
    const map = new Map();
    let res = 0, l = 0;

    for (let r = 0; r < s.length; r++) {
        if (!map.has(s[r])) {
            map.set(s[r], r);
        }  else {
            const prev = map.get(s[r]);
            l = Math.max(prev + 1, l);
            map.set(s[r], r);
        }
        console.log(l, r, map)
        res = Math.max(res, r - l + 1);
    }

    return res;
};

// "abcabcbb"

console.log(lengthOfLongestSubstring("abba"))

