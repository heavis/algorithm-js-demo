/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    if (digits.length === 0) {
        return [];
    }

    const letterMap = new Map();
    letterMap.set(2, 'abc');
    letterMap.set(3, 'def');
    letterMap.set(4, 'ghi');
    letterMap.set(5, 'jkl');
    letterMap.set(6, 'mno');
    letterMap.set(7, 'pqrs');
    letterMap.set(8, 'tuv');
    letterMap.set(9, 'wxyz');
    const res = [];

    function dfs(digits, index, combs) {
        console.log('com', combs);
        if (combs.length === digits.length) {
            res.push(combs);
            return;
        }
        const cur = digits[index];
        const charArr = letterMap.get(Number(cur)).split('');
        for (const c of charArr) {
            dfs(digits, index + 1, combs + c);
        }
    }

    dfs(digits, 0,  '');

    return res;
};

console.log(letterCombinations('23'))