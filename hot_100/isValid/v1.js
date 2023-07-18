/**
 * "()[]{}"
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    const stack = [], lSet = new Set(['(', '[', '{']), rMap = new Map([[')','('], ['}', '{'], [']', '[']]);

    for (let i = 0; i < s.length; i++) {
        if (rMap.has(s[i])) {
            const value = rMap.get(s[i]);
            if (!stack.length || stack[stack.length - 1] !== value) {
                return false;
            }
            stack.pop();
            // if (s[i] === ')') {
            //     if (!stack.length || stack[stack.length - 1] !== '(') {
            //         return false;
            //     }
            //     stack.pop();
            // } else if (s[i] === ']') {
            //     if (!stack.length || stack[stack.length - 1] !== '[') {
            //         return false;
            //     }
            //     stack.pop();
            // } else if (s[i] === '}') {
            //     if (!stack.length || stack[stack.length - 1] !== '{') {
            //         return false;
            //     }
            //     stack.pop();
            // }
        } else if (lSet.has(s[i])) {
            stack.push(s[i]);
        }
    }

    return stack.length === 0;
};

console.log(isValid("()[]{}"))