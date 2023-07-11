/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);
    const fn = new Array(s.length + 1).fill(false);
    fn[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (fn[j] && wordSet.has(s.substring(j, i))) {
                fn[i] = true;
                break;
            }
        }
    }

    return fn[s.length];
};

console.log(wordBreak("leetcode", ["leet", "code"]));