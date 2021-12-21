/**
 * 基本计算器
 * 使用数据结构中的堆栈，分别存储数值和计算符号, 需要考虑计算符号的优先级
 * @param {*} s s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
 */
function calculate(s) {
    const calcStack = [], numStack = []
    // 运算符优先级配置
    const weights = {
        '*': 5,
        '/': 5,
        '+': 3,
        '-': 3 
    }

    // 错误处理函数
    function error() {
        throw new Error(`传入的计算表达式${s}有误.`)
    }

    // 执行计算，从calcStack取出运算符tag，从numStack取出两个数值right、left
    function executeCalc() {
        // numStack存在最上面的是右运算数
        const right =numStack.pop(), 
              tag = calcStack.pop(), 
              left = numStack.pop()
        if (isNaN(left) || isNaN(right)) {
            error()
        }
        const result = Math.floor(eval(`(${left})${tag}(${right})`))

        return result
    }

    let subStr = s.trim()
    while (subStr) {
        let match = subStr.match(/^\d+/g)
        if (match && match.length) { // 如果为数值，将其存储到numStack
            const num = Number(match[0])
            numStack.push(num)
            subStr = subStr.replace(num + '', '').trim()
        } else if ((match = subStr.match(/^[\/*+-]/g)) && match.length) { // 如果为运算符
            const tag = match[0]
            // 如果堆栈中的最新符号优先级大于等于当前运算符tag，立即执行计算
            while (calcStack.length && weights[calcStack[calcStack.length - 1]] >= weights[tag]) {
                numStack.push(executeCalc())
            }
            // 将当前运算符存储到calcStack
            calcStack.push(tag) 
            subStr = subStr.replace(tag, '').trim()
        }
    }
    // 遍历运算符堆栈，并执行计算，对应步骤6-9
    while (calcStack.length) {
        numStack.push(executeCalc())
    }
    // 容错判断，最后的numStack只能有几个结果
    if (numStack.length !== 1) {
        error()
    }

    return numStack[0]
};

console.log(calculate('1*2-3/4+5*6-7*8+9/10'))
