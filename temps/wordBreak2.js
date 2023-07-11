/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 * 输入:s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
 * 输出:["cats and dog","cat sand dog"]
 */
 var wordBreak = function(s, wordDict) {
    const map = new Map();
    const set = new Set(wordDict);

    const matched = backTrack(s, s.length, 0, map, set), res = [];
    for (const arr of matched) {
        console.log('compose arr', arr);
        res.push(arr.join(' '));
    }

    return res;
};

function backTrack(s, length, index, map, set) {
    if (map.has(index)) {
        return map.get(index);
    }
    const matched = [];
    if (index === length) {
        matched.push([]);
    }

    for (let i = index + 1; i <= length; i++) {
        const substr = s.substring(index, i);
        if (set.has(substr)) {
            const wordbreakList = backTrack(s, length, i, map, set);
            for (const newBreaks of wordbreakList) {
                matched.push([substr, ...newBreaks]);
            }
        }
    }
    map.set(index, matched);

    return matched;
}
console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"]))