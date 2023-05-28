// leetcode最常见的150道前端面试题 --- 简单题下（44题）
// https://juejin.cn/post/6989031479753834504#heading-21



// -------------------二叉树（DFS）------------------------------

// 前序遍历
var preorderTraversal = function(root) {
    const res = [], stacks = [];

    while (root || stacks.length) {
        while (root) {
            res.push(root.val);
            stacks.push(root);
            root = root.left;
        }
        root = stacks.pop();
        root = root.right;
    }

    return res;
}

// 中序遍历
var inorderTraversal = function(root) {
    const res = [], stacks = [];

    while (root || stacks.length) {
        while (root) {
            stacks.push(root);
            root = root.left;
        }
        root = stacks.pop();
        res.push(root.val);
        root = root.right;
    }

    return res;
}

// 后序遍历
var postorderTraversal = function(root) {
    const res = [], stacks = [];

    while (root || stacks.length) {
        while (root) {
            stacks.push(root);
            res.unshift(root.val);
            root = root.right;
        }

        root = stacks.pop();
        root = root.left;
    }

    return res;
}


function isSame(left, right) {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;

    return left.val === right.val && isSame(left.left, right.right) && isSame(left.right, right.left);
}
// 对称二叉树
var isSymmetric = function(root) {
    if (!root) {
        return false;
    }

    return isSame(root.left, root.right);
}

// 二叉树的最大深度
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    let res = 1;

    function dfs(node, depth) {
        if (!node.left && !node.right) {
            res = Math.max(res, depth);
        }

        if (node.left) dfs(node.left, depth + 1);
        if (node.right) dfs(node.right, depth + 1);
    }

    dfs(root, 1);

    return res;
}

// --------------------------------------将有序数组转化为二叉搜索树-------------------------

// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
/**
    构建一颗树包括：构建root、构建 root.left 和 root.right
    题目要求"高度平衡" — 构建 root 时候，选择数组的中间元素作为 root 节点值，即可保持平衡。
    递归函数可以传递数组，也可以传递指针，选择传递指针的时候： l r 分别代表参与构建BST的数组的首尾索引。
 */
var sortedArrayToBST = function(nums) {
    return toBST(nums, 0, nums.length - 1);
}

function toBST(nums, l, r) {
    if (l > r) {
        return null;
    }
    const mid = (l + r) >> 1;
    const root = new TreeNode(nums[mid])
    root.left = toBST(nums, l, mid - 1);
    root.right = toBST(nums, mid + 1, r);

    return root;
}

// -------------------------------------栈-----------------------------------------
// 20. 有效的括号
var isValid = function(s) {
    const map = { '{': '}', '[': ']', '(': ')' };
    const stack = [];

    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            stack.push(s[i]);
        } else {
            const left = stack.pop();
            if (map[left] !== s[i]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// 155、 最小栈
var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

MinStack.prototype.push = function(x) {
    this.stack.push(x);

    if (!this.minStack.length || x < this.minStack.at(-1)) {
        this.minStack.push(x);
    } else {
        this.minStack.push(this.minStack.at(-1));
    }
};

MinStack.prototype.pop = function() {
    this.stack.pop();
    this.minStack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.minStack.at(-1);
}

// -------------------------------动态规划----------------------------------------
// 53. 最大子序和
// nums = [-2,1,-3,4,-1,2,1,-5,4]
var maxSubArray = function(nums) {
    let res = nums[0];
    const dp = [nums[0]];

    for (let i = 1; i < nums.length; i++) {
        if (dp[i - 1] < 0) {
            dp[i] = nums[i];
        } else {
            dp[i] = dp[i - 1] + nums[i];
        }

        res = Math.max(res, dp[i]);
    }

    return dp[nums.length - 1];
}

// 70. 爬楼梯
var climbStairs = function(n) {
    const dp = [1, 2];

    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n - 1];
}

// ----------------------------------数学问题---------------------------------
// 66. 加一
var plusOne = function(digits) {
    const carry = 1;
    for (let i = digits.length - 1; i >= 0; i--){
        const sum = digits[i] + carry;
        digits[i] = sum % 10;
        carry = Math.floor(sum / 10);
    }

    if (digits[0] === 0) {
        digits.unshift(carry);
    }

    return digits;
}

// 69 x的平方根
var mySqrt = function(x) {
    let low = 0, high = x, res;

    while (low < high) {
        const mid = ((low + high) >> 1) | 0;
        if (mid * mid > x) {
            high = mid - 1;
        } else if (mid * mid < x) {
            res = mid;
            low = mid + 1;
        } else {
            return mid;
        }
    }

    return res;
}

// console.log(mySqrt(5));

// 171. Excel表序列号
var titleToNumber = function(columnTitle) {
    let res = 0;
    const len = columnTitle.length;

    for (let i = 0; i < len; i++) {
        res += (26 ** i) * (columnTitle[len - (i + 1)].charCodeAt() - 'A'.charCodeAt() + 1);
    }


    return res;
}

var titleToNumber2 = function(columnTitle) {
    let ans = 0;
    let columnTitleLen = columnTitle.length - 1;
    for(let i = columnTitleLen; i >= 0; i--){
        ans += (26 ** (columnTitleLen - i)) * (columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1);
        console.log('ans', ans);

    }
    return ans;
};

// console.log(titleToNumber('FXSHRXW'));

// 172. 阶乘中的零
var trailingZeroes = function (n) {
    let count = 0;

    while (n >= 5) {
        n = (n / 5) | 0;
        count += n;
    }

    return count;
}
// console.log(trailingZeroes(5));

// 190.颠倒二进制位
var reverseBits = function (n) {
    let res = 0;

    for (let i = 0; i < 32; i++) {
        res = (res << 1) + (n & 1);
        n = n >> 1;
    }
    // 为什么要 >>> 0 呢，一位javascript没有无符号整数，全是有符号的
  // 不>>>0的话，得出来的值是负数，但是无符号整数是没有符号的
  // javascript 有符号转化为无符号的方法就是>>>0
    return res;
}

// console.log(reverseBits(10));

// 268. 丢失的数字
var missingNumber = function(nums) {
    const n = nums.length;
    let sum = n * (n + 1) / 2;

    for (let i = 0; i < n; i++) {
        sum -= nums[i];
    }
    
    return sum;
}

var isPowerOfThree = function(n) {
    while (n >= 3) {
        n /= 3;
    }

    return n === 1;
}

// 412. Fizz Buzz
var fizzBuzz = function (n) {
    const res = [];

    for (let i = 1; i <= n; i++) {
        const is3Times = i % 3 === 0;
        const is5Times = i % 5 === 0;
        const is3And5Times = is3Times && is5Times;

        if (is3And5Times) {
            res.push('FizzBuzz');
            continue;
        } else if (is3Times) {
            res.push('Fizz');
            continue;
        } else if (is5Times) {
            res.push('Buzz');
            continue;
        } else {
            res.push(i + '');
        }
    }

    return res;
}

// 7. 整数反转
var reverse = function(x) { 
    let res = 0;

    while (x > 0) {
        res += (res * 10) + x % 10;
        if (res < - (2 ** 31) || res > (2 ** 31) - 1) return 0;
        x /= 10 | 0;
    }

    return res;
}

// -----------------------------------环问题-----------------------------------
// 141. 环形链表
var hasCycle = function(head) {
    while (head) {
        if (head.hasVisited) return true;
        head.hasVisited = true;

        head = head.next;
    }

    return false;
}

// 160. 相交链表
var getIntersectionNode = function(headA, headB) {
    let tempA = headA, tempB = headB;

    while (tempA !== tempB) {
        tempA = tempA?.next || tempB;
        tempB = tempB?.next || tempA;
    }

    return tempA;
}


// 202. 快乐数
var isHappy = function(n) {
    const map = {};

    while (n !== 1) {
        map[n] = true;
        n = nextVal(n);
        if (map[n]) return false;
    }

    return true;
}
var nextVal = function(n) {
    const s = n + '';
    let res = 0;

    for (let i = 0; i < s.length; i++) {
        res += Math.pow(+s[i], 2);
    }

    return res;
}