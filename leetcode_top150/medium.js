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
var generateParenthesis = function (n) {
    const res = [];

    function dfs(l, r, str) {
        if (str.length === n * 2) {
            res.push(str);
            return;
        }
        if (l > 0) {
            dfs(l - 1, r, str + '(');
        }
        if (l < r) {
            dfs(l, r - 1, str + ')');
        }
    }

    dfs(n, n, '');

    return res;
}

// console.log(generateParenthesis(3));

// 29. 两数相除
var divide = function(dividend, divisor) {
    const flag = dividend < 0 && divisor > 0 || dividend > 0 && divisor < 0;
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    function recur(dividend, divisor) {
        let count = 1;
        let nextDivisor = divisor;

        if (dividend < divisor) return 0;

        while (nextDivisor + nextDivisor < dividend) {
            count += count;
            nextDivisor = nextDivisor + nextDivisor;
        }

        return count + recur(dividend - nextDivisor, divisor);
    }
    let res = flag ? -recur(dividend, divisor) : recur(dividend, divisor);

    return Math.min(Math.max(res, -(2**31)), 2**31 - 1);
}

// console.log(divide(-12,3));

// 盛最多水的容器
var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let result = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            result = Math.max(result, height[left] * (right - left));
            left++;
        } else {
            result = Math.max(result, height[right] * (right - left));
            right--;
        }
    }

    return result;
}
// console.log(maxArea([4,3,2,1,4]));

// 5. 最长回文子串
const longestPalindrome = function (s) {
    const n = s.length, dp = [];
    let res = s[0];

    for (let i = 0; i < s.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= i; j++) {
            if (i === j) {
                dp[j][i] = true;
            } else if (i - j === 1 && s[j] === s[i]) {
                dp[j][i] = true;
            } else if (i - j > 1 && s[j] === s[i]) {
                dp[j][i] = dp[j + 1][i - 1];
            }
            if (dp[j][i]) {
                res = i - j + 1 > res.length ? s.slice(j, i + 1): res;
            }
        }
    }

    return res;
}
// console.log(longestPalindrome('cbbd'));

// 在排序数组中查找元素的第一个和最后一个位置
var searchRange = function (nums, target) {
    const findLeft = (nums, target) => {
        let left = 0, right = nums.length - 1;
    
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
    
            if (nums[mid] >= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    
        return left;
    }

    if (nums[findLeft(nums, target)] !== target) {
        return [-1, -1];
    } else {
        return [findLeft(nums, target), findLeft(nums, target + 1) - 1];
    }
}

// console.log(searchRange([5,7,7,8,8,10], 8))

// 3. 无重复字符的最长子串
var lengthOfLongestSubstring = function(s) {
    if (s.length === 0) return 0;

    let start = 0, res = 0;;
    const map = {};

    for (let i = 0; i < s.length; i++) {
        if (true) {
            if (map[s[i]] !== undefined && map[s[i]] >= start) {
                start = map[s[i]] + 1;
            }
        }
        map[s[i]] = i;

        res = Math.max(res, i - start + 1);
    }

    return res;
}

// console.log(lengthOfLongestSubstring('abcdaaa'))

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
// 2. 两数相加
var addTwoNumbers = function(l1, l2) {
    let carry = 0;

    const pre = point = new ListNode();

    while (l1 || l2) {
        let sum = 0;

        point.next = new ListNode();
        point = point.next;

        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        sum = sum + carry;
        point.val = sum % 10;
        carry = (sum / 10) | 0;
    }

    if (carry) {
        point.next = new ListNode();
        point.next.val = carry;
    }

    return pre.next;
}

// 49. 字母异位词分组
var groupAnagrams = function(strs) {
    const res = [];
    const map = {};

    for (const s of strs) {
        const sorted = s.split('').sort().join();

        if (map[sorted]) {
            map[sorted].push(s);
        } else {
            map[sorted] = [s];
        }
    }

    for (const key in map) {
        res.push(map[key]);
    } 

    return res;
}
// console.log(groupAnagrams(["a"]))

// 旋转图像
var rotate = function(matrix) {
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }

    return matrix.map(m => m.reverse());
}

// console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))

// 46. 全排列
var permute = function(nums) {
    const result = [];

    function dfs(partial) {
        if (partial.length === nums.length) {
            result.push(partial);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (partial.includes(nums[i])) {
                continue;
            }
            dfs(partial.concat(nums[i]));
        }
    }
    dfs([]);

    return result;
}

// console.log(permute([1, 2, 3]))

// 38. 外观数列
var countAndSay = function(n) {
    if (n === 1) return '1';

    return generateCount(countAndSay(n - 1));
}

function generateCount(n) {
    let initStr = n[0], count = 1;
    let res = '';

    for (let i = 0; i < n.length; i++) {
        if (n[i] === n[i + 1]) {
            initStr += n[i];
        } else {
            res += (initStr.length + '' + n[i]);
            initStr = n[i + 1];
        }
    }
    // console.log(res);

    return res;
}

// console.log(countAndSay(5));

// 36. 有效的数独
var isValidSudoku = function(board) { 
    const n = board.length;
    for (let i = 0; i < n; i++) {
        if (!isValidHV(board[i])) return false;
        if (!isValidHV(getVertical(i))) return false;

        for (let j = 0; j < n; j++) {
            if (i % 3 === 0 && j % 3 === 0) {
                if (!isValidHV(get3x3(i, j))) return false;
            }
        }
    }

    function isValidHV(arr) {
        const map = {};

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== '.') {
                if (map[arr[i]]) {
                    return false;
                } else {
                    map[arr[i]] = true;
                }                
            }
        }

        return true;
    }

    function getVertical(col) {
        const res = [];

        for (let i = 0; i < n; i++) {
            res.push(board[i][col]);
        }

        return res;

    }

    function get3x3(i, j) {
        const arr = [];

        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                arr.push(board[i + k][j + l])
            }
        }

        return arr;
    }

    return true;
}

const matrix = [["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

// console.log(isValidSudoku(matrix));

// 删除链表的倒数第 N 个结点
var removeNthFromEnd = function(head, n) {
    const result = slow = fast = new ListNode();

    fast.next = head;

    while (n--) {
        fast = fast.next;
    }

    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;

    return result.next;
}

// 378. 有序矩阵中第 K 小的元素(中等难度)
function defaultCompareFn(i , j) {
    if (i === j) return 0;
    if (i - j < 0) return -1;
    else return 1;
}

class MinHeap {
    heap = [];

    constructor(compareFn = defaultCompareFn) {
        this.heap = [];
    }

    getLeft(i) {
        return 2 * i + 1;
    }

    getRight(i) {
        return 2 * i + 2;
    }

    getParent(i) {
        if (i === 0) return;
        return (i - 1) >> 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(val) {
        if (val !== null) {
            this.heap.push(val);
            this.siftUp(this.heap.length - 1);

            return true;
        }

        return false;
    }

    siftUp(i) {
        let parentIndex = this.getParent(i);

        while (parentIndex !== undefined && this.heap[i] < this.heap[parentIndex]) {
            this.swap(i, parentIndex);
            i = parentIndex;
            parentIndex = this.getParent(i);
        }
    }
    
    extract() {
        if (this.heap.length === 0) return;
        if (this.heap.length === 1) return this.heap.shift();
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);

        return removedValue;
    }

    siftDown(i) {
        let left = this.getLeft(i), right = this.getRight(i);

        let target = i;
        if (left < this.heap.length && this.heap[target] > this.heap[left]) {
            target = left;
        }
        if (right < this.heap.length && this.heap[target] > this.heap[right]) {
            target = right;
        }
        if (target !== i) {
            this.swap(i, target);
            this.siftDown(target);
        }
    }
}

var kthSmallest = function(matrix, k) {
    let result;
    const minHeap = new MinHeap();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            minHeap.insert(matrix[i][j]);
        }
    }
    // console.log(minHeap.heap);
    while (k--) {
        result = minHeap.extract();
    }

    return result;
}

// console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8));

var kthSmallest2 = function(matrix, k) {
    const n = matrix.length;

    let left = matrix[0][0], right = matrix[n - 1][n - 1];
    // console.log('left, right, mid', left, right, (right - left) >> 1);
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        console.log('left, right, mid', left, right, mid);
        if (check(matrix, mid, k, n)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

function check(matrix, mid, k, n) {
    let i = n - 1, j = 0, sum = 0;

    while (i >= 0 && j < n) {
        if (matrix[i][j] <= mid) {
            sum += i + 1;
            j++;
        } else {
            i--;
        }
    }
    // console.log('mid, sum, k', mid, sum, k);
    return sum >= k;
}
console.log(kthSmallest2([[1,5,9],[10,11,13],[12,13,15]], 8))