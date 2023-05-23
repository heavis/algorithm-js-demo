/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
 var wordBreak = function(s, wordDict) {
    const map = new Map();
    const set = new Set(wordDict);

    const wordBreaks = [];
    const matched = backWorkBreack(s, s.length, 0, map, set);
    for (const items of matched) {
        wordBreaks.push(items.join(' '));
    }

    return wordBreaks;
};

function backWorkBreack(s, length, index, map, set) {
    if (map.has(index)) {
        return map.get(index);
    }
    const wordBreaks = [];

    if (index === length) {
        // 遍历到结束为止，赋值一个空的数组
        wordBreaks.push([]);
    }

    // 从index位置开始遍历，找到满足字典的
    for (let i = index + 1; i <= length; i++) {
        const subStr = s.substring(index, i);
        if (set.has(subStr)) {
            const newBreaks = backWorkBreack(s, length, i, map, set);
            for (const list of newBreaks) {
                wordBreaks.push([subStr, ...list]);
            }
        }
    }

     map.set(index, wordBreaks);
    return wordBreaks;
}

console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"]));