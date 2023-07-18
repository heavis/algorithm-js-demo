/**
 * ((): 设置i=0，从前往后遍历，判断后续子串是否为有效括号，如果是则结束；如果不是：
 * 当前位置为j,如果j位置为“）”并且堆栈中没有“("括号，则j位置之前的字符串不符合有效括号, 将i设置为j+1
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (s.length <= 1) {
        return 0;
    }
    let i = 0, len = 0;
    while (i < s.length - 1) {
        if (s[i] === ')') {
            i++;
            continue;
        }
        const lStack = ['('];
        let j = i + 1;
        for (j = i + 1; j < s.length; j++) {
            if (s[j] === ')' && !lStack.length) {
                break;
            } else if (s[j] === ')') {
                lStack.pop();
            } else {
                lStack.push('(');
            }
            console.log(i, j, lStack)
            if (!lStack.length) {
                len = Math.max(j - i + 1, len)
            }
            // console.log('j', j);
        }
        // console.log('i, j', i, j );
        // j = j >= s.length ? s.length - 1 : j;
        i = j + 1;
        console.log(i);
    }

    return len;
};

console.log(longestValidParentheses("(()"))