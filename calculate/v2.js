/**
 * 基本计算器, 支持括号表达式 '('、')'
 * 使用数据结构中的堆栈，分别存储数值和计算符号, 需要考虑计算符号的优先级
 * @param {*} s s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
 */
function calculate(s) {
    const calcStack = [], numStack = []

    const config = {
        weights: {
            '*': 5,
            '/': 5,
            '+': 3,
            '-': 3,
            '(': 1 // 其他运算符优先级都高于'(', 保证左括号之后的计算优先执行
        },
        func: {
            '*': function multi (left, right) {
                return left * right
            },
            '/': function div (left, right) {
                return left / right
            },
            '+': function add (left, right) {
                return left + right
            },
            '-': function reduce (left, right) {
                return left - right
            }
        }
    }

    function error() {
        throw new Error(`传入的计算表达式${s}有误.`)
    }

    function executeCalc() {
        // numStack存在最上面的是右运算数
        const numLen = numStack.length, calcLen = calcStack.length,
              right = numStack.pop(), 
              tag = calcStack.pop(), 
              left = numStack.pop()

        if (!calcLen || numLen < 2) {
            return
        }

        if (isNaN(left) || isNaN(right) || !config.func[tag]) {
            error()
        }

        const result = Math.floor(config.func[tag](left, right))
        numStack.push(result)
    }

    function executeCalcWithEndTag(endTag) {
        while (calcStack.length && calcStack[calcStack.length - 1] !== endTag) {
            executeCalc()
        }
    }

    let subStr = s.trim(), numOrTag = 0 // 0表示进行数值判断，1表示进行符号判断

    while (subStr) {
        if (!numOrTag && subStr.indexOf('-') === 0) {
            subStr = '0' + subStr
        }
        let match = subStr.match(/^-?\d+/g)
        if (!numOrTag && match && match.length) {
            numStack.push(Number(match[0]))
            numOrTag = 1
        } else if ((match = subStr.match(/^\(/g)) && match.length) {
            calcStack.push(match[0])
        } else if ((match = subStr.match(/^\)/g))) {
            // 当遇到右括号，从堆栈拿值计算，直到遇到左括号，并且将左括号从堆栈中移除
            executeCalcWithEndTag('(')
            calcStack.pop()
        } else if (numOrTag && (match = subStr.match(/^[\/*+-]/g)) && match.length) {
            const tag = match[0]
            if (calcStack.length && config.weights[calcStack[calcStack.length - 1]] >= config.weights[tag]) {
                executeCalc()
            }
            calcStack.push(tag) 
            numOrTag = 0
        }
        if (match && match.length) {
            subStr = subStr.replace(match[0], '').trim()
        }
    }

    while (calcStack.length) {
        executeCalc()
    }

    if (numStack.length !== 1) {
        error()
    }

    return numStack[0]
};

// console.log(calculate('1 * 2 + 3 * (4 + 5)'))
// console.log(calculate('1 * 2 + 3 * (5)'))
// console.log(calculate('1 + 1'))
// console.log(calculate(" 2-1 + 2 "))
// console.log(calculate('1*2-3/4+5*6-7*8+9/10'))
// console.log(calculate("- (3 + (4 + 5))"))
console.log(calculate("- (3 - (- (4 + 5) ) )"))
