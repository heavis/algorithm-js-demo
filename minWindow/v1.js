/**
 * 最小覆盖子串
 * 用hash表记录子串中每个字符在匹配字符串中的索引，依次遍历，遇到包含的字符则更新其索引值，再重新计算长度
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    if (!s || !t) {
        throw new Error('s长度必须大于等于t')
    }

    const matchMap = new Map()
    for (let i = 0; i < t.length; i++) {
        // value结构为[-1, num],索引0存储在
        let value
        if ((value = matchMap.get(t[i])) === undefined) {
            matchMap.set(t[i], [[], 1])
        } else {
            matchMap.set(t[i], [[],  ++value[1]])
        }
    }
    let matched = '', count = 0
    for (let j = 0; j < s.length; j++) {
        if (matchMap.get(s[j]) !== undefined) {
            // count记录匹配的字符数量，当其长度等于t的长度，说明有匹配成功的
            // 如果matchMap[s[j]]已经出现过了则不统计
            let mapVal = matchMap.get(s[j])
            // 如果mapVal[0]为空数组，则第一次匹配；
            // 如果mapVal[0]长度小于mapVal[1], 则表示还未完全匹配，例如t='aa'，则mapVal[1] = 2
            if (!mapVal[0].length || mapVal[0].length < mapVal[1]) {
                count = Math.min(count + 1, t.length)
            }
            if (mapVal[0].length >= mapVal[1]) {
                mapVal[0].shift()
            }
            mapVal[0].push(j)
            
            if (count === t.length) {
                let min = Infinity, max = -Infinity
                matchMap.forEach((val ,key) => {
                    val[0].forEach(idx => {
                        min = Math.min(idx, min)
                        max = Math.max(idx, max)                        
                    })
                })

                if (matched.length && max - min < matched.length) {
                    matched = s.slice(min, max + 1)  
                } else if (!matched.length) {
                    matched = s.slice(min, max + 1)  
                }
            }
        }
        // 已经是最优匹配了，直接返回
        if (matched.length === t.length) {
            return matched
        }
    } 
    // console.log(matchMap)

    return matched
};

console.log(minWindow("ADOBECODEBANC", "ABC"))
console.log(minWindow(s = "a", t = "a"))
console.log(minWindow(s = "a", t = "aa"))
