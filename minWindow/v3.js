/**
 * 最小覆盖子串
 * 采用滑动窗口，用l,r记录滑动窗口的左右位置。
 * 首先r向右滑动，找到覆盖子串的位置，标记为满足条件的窗口；然后l向右滑动，移动到到不满足子串条件为止；
 * 子串中可能包含重复的字符，可用repeats记录窗口中满足子串字符的个数
 * https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    const oriMap = new Map(), matchMap = new Map()
    for (let i = 0; i < t.length; i++) {
        let val = oriMap.get(t[i])
        oriMap.set(t[i], (val || 0) + 1)
    }
    //"ADOBECODEBANC", "ABC"
    let l = 0, r = 0, count = 0, begin = 0, minLen = Infinity
    while (r < s.length) {
        // 如果当前字符不包含在t中，直接r++，并继续下一次遍历
        if (!oriMap.get(s[r])) {
            r++
            continue
        }
        // oriMap中肯定存在s[r]，如果当前字符已经匹配的次数matchVal小于oriMap中的次数，count++
        let matchVal = matchMap.get(s[r]) || 0, oriVal = oriMap.get(s[r]) || 0
        if (matchVal < oriVal) {
            count++
        }
        // 匹配的结果存储在matchMap中
        matchMap.set(s[r], ++matchVal)
        r++

        // 如果匹配数刚好等于t的长度,说明匹配成功了
        while(count === t.length) {
            // 如果当前长度小于上一次匹配长度，则更新长度
            if (r - l < minLen) {
                begin = l
                minLen = r - l
            }

            let matchVal = matchMap.get(s[l]), oriVal =  oriMap.get(s[l])
            // 如果当前字符s[l]不在oriMap中，l++，继续轮询
            if (!oriVal) {
                l++
                continue
            }
            //如果和OriMap总的字符匹配次数相等，则count--
            if (matchVal === oriVal) {
                count--
            }
            // 更新MatchMap总的s[l]统计次数
            matchMap.set(s[l], --matchVal)

            l++
        }

    }

    // minLen等于原始值，则无匹配成功
    if (minLen === Infinity) {
        return ''
    }
    
    return s.substring(begin, begin + minLen)
};

console.log(minWindow("ADOBECODEBANC", "ABC"))
// console.log(minWindow(s = "a", t = "a"))
// console.log(minWindow(s = "a", t = "aa"))
