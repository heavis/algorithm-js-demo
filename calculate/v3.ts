type HandlerParams = { 
    preSign: any, 
    currentSign: any,
    originalTarget: string | number, 
    cb?: (needCalc?: boolean, endTag?: string) => void  
}

type SignHookParams = { 
    str: string,
    preSign: string, 
    currentSign?: string, 
    originalTarget?: string | number,
    cb?: (newStr: string) => void
}

type CalcOptions = {
    weights?: { [key: string]: number }
    funcs?: { [key: string]: (left: any, right: any) => number },
    // singKeys?: { [key: string]: string | number },
    genSign?: (params: { str: string, preSign: string, error?: (msg?: any) => void }) => { sign: SignType, target: string | number },
    signHandlers?: { [signKey: string | number]: (params: HandlerParams) => void },
    beforeTraverse?: (str: string) => void,
    beforeSignHandle?: (params?: SignHookParams) => void,
    afterSignHandle?: (params?: SignHookParams) => void,
    afterTraverse?: (str: string) => void,
    error?: (msg?: any) => void
}


const baseWeights = {
    '*': 5,
    '/': 5,
    '+': 3,
    '-': 3,
    '(': 1 // 其他运算符优先级都高于'(', 保证左括号之后的计算优先执行
}

const baseFuncs = {
    '*': function multi (left, right) {
        return left * right
    },
    '/': function div (left, right) {
        return left / right
    },
    '+': function add (left, right) {
        console.log('add:' + (left + right))
        return left + right
    },
    '-': function reduce (left, right) {
        return left - right
    }
}

const numStack = []
const calcStack = []

type SignType = 'Num' | 'Operation' | 'LeftBracket' | 'RightBracket'

const baseSignConfig = {
    // singKeys: ['Num', 'Operation', 'LeftBracket', 'RightBracket'],
    genSign:  (params: { str: string, preSign: string, error?: (msg?: any) => void }): { sign: SignType, target: string | number } => {
        let { str, preSign, error } = params

        let match = str.match(/^-?\d+/g)
        if (preSign !== 'Num' && match && match.length) {
            return { sign: 'Num', target: Number(match[0]) }
        } else if ((match = str.match(/^\(/g)) && match.length) {
            return { sign: 'LeftBracket', target: match[0] }
        } else if ((match = str.match(/^\)/g))) {
            return { sign: 'RightBracket', target: match[0] }
        } else if (preSign !== 'Operation' && (match = str.match(/^[\/*+-]/g)) && match.length) {
            return { sign: 'Operation', target: match[0] }
        }

        error && error(`传入的计算表达式${str}有误.`)
    },
    signHandlers: {
        // 将数值存入到numStack堆栈中
        NumHandler: (params: HandlerParams) => {
            const { originalTarget, cb } = params
            numStack.push(originalTarget)
            cb && cb(false)
        },
        // 对比当calcStack最新符号和前符号(originalTarget)的优先级
        // 如果大于等于当前符号优先级，先把堆栈中最新符号计算了
        // cb的定义为(needCalc?: boolean, endTag?: string) => void 
        OperationHandler: (params: HandlerParams)  => {
            const { originalTarget, cb } = params
            if (calcStack.length && baseWeights[calcStack[calcStack.length - 1]] >= baseWeights[originalTarget]) {
                cb && cb(true)
            }
            calcStack.push(originalTarget)   
        },
        // 如果是左括号，直接先放入calcStack中
        LeftBracketHandler: (params: HandlerParams) => {
            const { originalTarget, cb } = params
            calcStack.push(originalTarget)
            cb && cb(false)
         },
         // 如何是右括号，调用cb(true, '(')，表示执行堆栈中的计算，知道遇到左括号为止
         RightBracketHandler: (params: HandlerParams) => { 
            const { originalTarget, cb } = params
            cb && cb(true, '(')
            calcStack.pop()
        }
    }
}

function executeCalc(params?: { error?: (msg?: any) => void }) {
    const { error } = params || {}
    const numLen = numStack.length, calcLen = calcStack.length,
            right = numStack.pop(), 
            tag = calcStack.pop(), 
            left = numStack.pop()

    if (!calcLen || numLen < 2) {
        return
    }

    if (isNaN(left) || isNaN(right) || !baseFuncs[tag]) {
        error && error(`传入的计算表达式有误.`)
    }
    const result = Math.floor(baseFuncs[tag](left, right))
    console.log('hook executeCalc:' + `${left}${tag}${right}=${result}`)
    numStack.push(result)
}

const baseEvents = {
    beforeSignHandle: (params?: SignHookParams) => {
        console.log('hook beforeSignHandle:' + JSON.stringify(params))
        const { cb, preSign, str } = params
        if (preSign !== 'Num' && str.indexOf('-') === 0) {
            cb && cb(('0' + str).trim())
        }
    },
    afterSignHandle: (params?: SignHookParams) => {
        console.log('hook afterSignHandle:' + JSON.stringify(params))
        const { originalTarget, cb, str } = params
        if (originalTarget !== undefined) { // 不能直接判断originalTarget，可能为0
            cb && cb(str.replace(originalTarget + '', '').trim())
        }
    },
    afterTraverse: (str: string) => {
        while (calcStack.length) {
            executeCalc()
        }
        console.log('hook afterTraverse:' + str)
    },
}


function createCalculator(s: string, options?: CalcOptions) {  
    const { 
        beforeTraverse, 
        beforeSignHandle, 
        afterSignHandle, 
        afterTraverse,
        genSign, 
        error } = options
    let subStr = s.trim(), preSign = ''
    beforeTraverse && beforeTraverse(subStr)
    while (subStr) {
        beforeSignHandle({ 
            str: subStr,
            preSign: preSign,
            cb: (newStr: string) => {
                subStr = newStr
            } 
         })
         const { sign, target } = genSign({ str: subStr, preSign: preSign, error })
         console.log('hook genSign:' + JSON.stringify({ sign, target }))
         const signHandlers = options.signHandlers
         const currrentHandler = signHandlers[sign + 'Handler']
         currrentHandler && currrentHandler({
            preSign: preSign, 
            currentSign: sign,
            originalTarget: target, 
            cb: (needCalc?: boolean, endTag?: string) => {
                if (needCalc) {
                    if (!endTag) {
                        executeCalc({ error: error })
                    } else {
                        while (calcStack.length && calcStack[calcStack.length - 1] !== endTag) {
                            executeCalc()
                        }
                    }
                }
            } 
         })
         afterSignHandle && afterSignHandle({ 
             str: subStr,
             currentSign: sign,
             originalTarget: target,
             preSign: preSign,
             cb: (newStr: string) => {
                subStr = newStr
            } 
          })
        preSign = sign
    }
    afterTraverse && afterTraverse(subStr)

    return numStack[0]
}

function calculate(s: string, options?: CalcOptions) { 
    options = options || {}
    const finalOptions: CalcOptions = {
        weights: baseWeights,
        funcs: baseFuncs,
        ...baseSignConfig,
        ...baseEvents
    }

    if (options.weights) {
        finalOptions.weights = Object.assign(finalOptions.weights, options.weights)
    }
    if (options.funcs) {
        finalOptions.funcs = Object.assign(finalOptions.funcs, options.funcs)
    }
    if (options.signHandlers) {
        finalOptions.signHandlers = Object.assign(finalOptions.signHandlers, options.signHandlers)
    }

    for (const key in options) {
        if (key !== 'weights' && key !== 'funcs' && key !== 'signHandlers') {
            finalOptions[key] = options[key]
        }
    }

    return createCalculator(s, finalOptions)
}

// const result = calculate1('1 * 2 + 3 * (5)')
const result = calculate('1 * 2 + 3 * (5 % 2)', {
    funcs: Object.assign(baseFuncs, { '%': (left, right) => {
        return left % right
    } }),
    genSign: params => {
        const { str, preSign, error } = params
        params.error && (delete params.error)
        const baseResult = baseSignConfig.genSign(params)
        if (baseResult) {
            return baseResult
        }
        console.log('hook % genSign:' + JSON.stringify(baseResult))
        let match = str.match(/^[%]/g)
        if (preSign !== 'Operation' && match && match.length) {
            return { sign: 'Operation', target: match[0] }
        }

        error && error(`传入的计算表达式${str}有误.`)
    },
    error: (msg?: any) => {
        throw new Error(msg)
    }
})
console.log(result)
