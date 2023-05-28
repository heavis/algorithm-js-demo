// 【算法面试】leetcode最常见的150道前端面试题 --- 中等题2（共80题）
// https://juejin.cn/post/6992775762491211783#heading-16

//--------------------------字符串转换整数 (atoi)--------------------------------

var myAtoi = function(s) { 
    const res = s.trim().match(/^(\+|\-)?\d+/g);

    return res ? Math.max(Math.min(Number(res[0]), 2**31 - 1), -(2**31)) : 0;
}
// console.log(myAtoi('-987'));

//395. 至少有 K 个重复字符的最长子串
var longestSubstring = function(s, k) {
    const n = s.length - 1;
    
    return longDFS(s, 0, n, k);
};

function longDFS(s, l, r, k) {
    const cnt = new Array(26).fill(0);

    for (let i = l; i <= r; i++) {
        cnt[s[i].charCodeAt() - 'a'.charCodeAt()] += 1;
        // console.log(s, i, s[i]);
    }

    let split = '';
        
    for (let j = 0; j < cnt.length; j++) {
        if (cnt[j] > 0 && cnt[j] < k) {
            split = String.fromCharCode('a'.charCodeAt() + j);
            break;
        }
    }

    if (!split) {
        return r - l + 1;
    }

    let i = l, res = 0;
    while (i <= r) {
        while (i <= r && s[i] === split) {
            i++;
        }

        if (i > r) {
            break;
        }

        let j = i;

        while (j <= r && s[j] !== split) {
            j++;
        }

        res = Math.max(longDFS(s, i, j - 1, k), res);
        i = j;
    }
    console.log(res);
    return res;
}

// console.log(longestSubstring('aaabb', 3));

// ---------------------------------三数之和------------------------------


// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。[-1,0,1,2,-1,-4]
const threeSum = (nums) => {
    if (!nums || nums.length < 3) {
        return [];
    }

    nums.sort((a, b) => a - b);
    console.log(nums);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i - 1 >= 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let l = i + 1, r = nums.length - 1;

        while (l < r) {
            const lVal = nums[l], rVal = nums[r];
            
            const sum = nums[i] + lVal + rVal;
            if (sum === 0) {
                res.push([nums[i], lVal, rVal]);
                while (l < r && nums[l] === lVal) l++;
                while (l < r && nums[r] === rVal) r--;
            } else if (sum > 0) {
                r--;
            } else {
                l++;
            }     
        }
    }

    return res;
}

// console.log(threeSum([-1,0,1,2,-1,-4]));

// 17 电话号码的字母组合
var letterCombinations = function(digits) {
    if (!digits) {
        return [];
    }

    const res = [];
    const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };

    function dfs(str, depth) {
        if (str.length === digits.length) {
            res.push(str);
            return;
        }

        const tag = map[digits[depth]];
        for (let i = 0; i < tag.length; i++) {
            dfs(str + tag[i], depth + 1);
        }
    }

    dfs('', 0);

    return res;
}
// console.log(letterCombinations('2'));

// 22. 括号生成
