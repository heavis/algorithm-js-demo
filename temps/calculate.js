const prorities = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1
}

/**
 * 用两个栈存储数字和符号
 * push符号时，如果优先级大于栈顶符号则直接push即可；否则，先根据栈顶符号计算结果，再将结果存放到数据栈中
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
    const numStack = [], optStack = [];

    function popAndCalc() {
        const right = numStack.pop(), opt = optStack.pop(), left = numStack.pop();

        let result;
        switch (opt) {
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                result = left / right;
        }
        console.log(result, left, opt, right);

        numStack.push(result);
    }

    function cutNumOrOpt(s) {
        const numMatch =  /^(\d+)/g.exec(s);
        if (numMatch && numMatch.length) {
            return [numMatch[1], numMatch[1].length];
        } else {
            return [s[0], 1];
        }
    }

    while (s.length) {
        const [cur, len] = cutNumOrOpt(s);
        if (!isNaN(Number(cur))) {
            numStack.push(Number(cur));
        } else {
            if (!optStack.length || prorities[cur] > prorities[optStack[optStack.length - 1]]) {
                optStack.push(cur);
            } else if (optStack.length) {
                popAndCalc();
                continue;
            }
        }

        s = s.slice(len);
    }
    while (optStack.length) {
        popAndCalc();
    }

    return numStack[0];
};

console.log(calculate("3/2"))