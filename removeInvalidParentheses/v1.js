    // 计算字符串是否为有效的括号
    function isValid(s) {
        let cnt = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                cnt++;
            } else if (s[i] === ')') {
                cnt--;
                // 如果cnt小于0则出现了多余的有括号，肯定无效
                if (cnt < 0) {
                    return false;
                }
            }
        }

        return cnt === 0;
    }

    // 遍历字符串，获取有效的括号
    function traverse(s, start, lremove, rremove, res) {
        // 如果s为有效的括号，则添加到res中
        if (lremove === 0 && rremove === 0 && isValid(s)) {
            res.push(s);
        }

        for (let i = start; i < s.length; i++) {
            // 如果上一个字符也为左括号，则直接跳到下一个遍历
            if (s[i] === s[i - 1]) {
                continue;
            }
            // 剩余的左、右括号数之和大于字符串长度，则直接返回
            if (lremove + rremove > s.length - i) {
                return;
            }
            if (lremove > 0 && s[i] === '(') {
                traverse(s.substr(0, i) + s.substr(i + 1), i, lremove - 1, rremove, res);
            }
            if (rremove > 0 && s[i] === ')') {
                traverse(s.substr(0, i) + s.substr(i + 1), i, lremove, rremove - 1, res);
            }
        }
    }

/**
 * 使用回溯+剪枝方法获取有效的括号
 * @param {string} s
 * @return {string[]}
 */
 var removeInvalidParentheses = function(s) {
    let lremove = 0, rremove = 0;
    const res = [];
    // 计算多余的左括号或右括号
    for (const char of s) {
        if (char === '(') {
            lremove++;
        } else if (char === ')') {
            if (lremove === 0) {
                rremove++;
            } else {
                lremove--;
            }
        }
    }
    traverse(s, 0, lremove, rremove, res);

    return res;
};

console.log(removeInvalidParentheses("))"))