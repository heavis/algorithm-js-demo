// 【算法面试】leetcode最常见的150道前端面试题 --- 简单题上（44题）
// https://juejin.cn/post/6987320619394138148

// ----------------存在重复元素---------------------------------------

// 存在重复元素
const containsDuplicate = function(nums) {
    let map = new Map();
    for(let i of nums){
        if(map.has(i)){
            return true;
        }else{
            map.set(i, 1);
        }
    }
    return false;
};

// ----------------哈希表 + 计数类型---------------------------------------

// 字符串中的第一个唯一字符
var firstUniqChar = function(s) {
    const map = {};
    for(let v of s) map[v] = (map[v] || 0) + 1;
    for(let i = 0; i < s.length; i++) if(map[s[i]] === 1) return i;
    return -1;
  };

// 有效的字母异位词
var isAnagram = function(s, t) {

    const sLen = s.length;
    const tLen = t.length;
    if(sLen !== tLen ) {
        return false;
    }
    const obj = {};
    for(let i = 0 ; i < sLen ; i++){
        const currentS = s[i];
        const currentT = t[i];
        obj[currentS] ? obj[currentS]++ : obj[currentS] = 1;
        obj[currentT] ? obj[currentT]-- : obj[currentT] = -1;
    }
    return Object.values(obj).every(v=>v===0);
  };

// 多数元素
var majorityElement = function(nums) {
    const map = {}
    const n = nums.length >> 1 // >>是右移运算符，意思是除以2
    for(let i = 0; i < nums.length; i++){
        map[nums[i]] = map[nums[i]] !== undefined ? map[nums[i]] + 1 : 1
        if(map[nums[i]] > n) return nums[i]
    }
  }

// 只出现一次的数字
var singleNumber = function(nums) {
    let init = nums[0];
    for(let i = 1; i < nums.length; i++){
        init ^=  nums[i];
    }
    return init;
  };
  
// 位1的个数
var hammingWeight = function(n) {
    let ret = 0;
    while(n){
        n &= (n - 1);
        ret++;
    }
    return ret;
};

// ----------------哈希表 + 映射功能---------------------------------------

// 两数之和
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        if(map.get(nums[i]) !== undefined){
            return [map.get(nums[i]), i];
        } else {
            map.set(target - nums[i], i);
        }
    }
    return [];
};

// 两数组交集
var intersection = function(nums1, nums2) {
    const map = {};
    const ret = [];
    for(let i = 0; i < nums1.length; i++){
        map[nums1[i]] = true;
    }
    for(let i = 0; i < nums2.length; i++){
        if(map[nums2[i]]){
            ret.push(nums2[i])
            map[nums2[i]] = false
        }
    }
    return ret;
};

// ----------------找规律题---------------------------------------

// 罗马数字转整数
var romanToInt = function(s) {
    const map = {
        I: 1,
        V: 5,
        IV: 4,
        IX: 9,
        X: 10,
        XL: 40,
        XC: 90,
        L: 50,
        C: 100,
        CD: 400,
        CM: 900,
        D: 500,
        M: 1000,
    }
    let res = 0;
    let index = 0;
    let len = s.length;
    while(index < len){
        if(index + 1 < len && map[s.slice(index, index+2)]){
            res += map[s.slice(index, index+2)];
            index += 2;
        }else{
            res += map[s.slice(index, index+1)];
            index += 1;
        }
    }
    return res;
};

// 最长公共前缀
// 这个是求出两个元素最长公共前缀的方法
var longestCommonPrefix = function (strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0];
    return strs.reduce(getSameStr, strs[0]);
  };
  
  function getSameStr(a, b) {
    let res = ''
    for (let j = 0; j < a.length; j++) {
      if (a[j] === b[j]) {
        res += a[j];
      } else {
        return res;
      }
    }
    return res
  }

  // 合并两个有序链表
  // 链表定义函数
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var mergeTwoLists = function(l1, l2) {
  const dummpy = node = new ListNode();
  while(l1 && l2){
      if(l1.val >= l2.val){
          node.next = l2;
          node = node.next;
          l2 = l2.next;
      } else {
          node.next = l1;
          node = node.next;
          l1 = l1.next;
      }
  }
  node.next = l1 || l2;
  return dummpy.next;
};

// 实现str（）
var strStr = function (haystack, needle) {
    if (needle === "") return 0
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle[0]) {
            if (haystack.substring(i, i + needle.length) === needle) return i;
        }
    }
    return -1
  };

  // 118. 杨辉三角
  var generate = function(numRows) {
    if(numRows === 0){ return [] }
    const result = Array.from(new Array(numRows), ()=>[])
    for(let i = 0; i < numRows; i++){
      result[i][0] = 1; result[i][i] = 1;
        for(let j = 1; j < i; j++){
        result[i][j] = result[i-1][j-1] + result[i-1][j] 
      }
    }
  return result
  };

// 121. 买卖股票的最佳时机
var maxProfit = function (prices) {
    let minPrice = prices[0], res = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            res = Math.max(res, prices[i] - minPrice);
        }
    }

    return res;
}
// console.log(maxProfit([7,1,5,3,6,4]))

// 122. 买卖股票的最佳时机2
var maxProfit2 = function (prices) { 
    let res = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            res += (prices[i] - prices[i - 1]);
        }
    }

    return res;
}
console.log(maxProfit2([1,2,3,4,5]));

// ----------------双指针---------------------------------------

// 26. 删除数组中的重复项
var removeDuplicates = function(nums) {
    let i = 0;
    for(let j = 1; j < nums.length; j++){
        if(nums[j] !== nums[i]){
            nums[i+1] = nums[j];
            i++
        }
    }
    return i + 1
  };

// 88. 合并两个有序数组
var merge = function (nums1, m, nums2, n) {
    let len = m + n - 1;
    m--, n--;
    while (m >= 0 && n >= 0) {
      if (nums1[m] > nums2[n]) {
        nums1[len] = nums1[m--]
      } else {
        nums1[len] = nums2[n--]
      }
      len--;
    }
    if(m === -1){
      return nums1.splice(0, len+1, ...nums2.slice(0, n + 1));
    }
    if(n === -1){
      return nums1;
    }
  };

// 125. 验证回文串
var isPalindrome = function(s) {
    s = s.replace(/[^\w]/g, '').toLowerCase();
    let leftPointer = 0;
    let rightPointer = s.length - 1;
    while(rightPointer > leftPointer){
        if(s[leftPointer++] === s[rightPointer--]){
            continue;
        }else{
            return false;
        }
    }
    return true;
  };

  // 234. 回文链表
  var isPalindrome2 = (head) => { 
    if (head == null || head.next == null) {
        return true;
      }

    let fast = head, slow = head, prev = null;

    // 找到链表中间位置
    while (fast) {
        prev = slow;
        slow = slow.next;
        fast = fast.next?.next;
    }

    // 从中间位置断开链表并反转后半部分
    let head2 = null, node = slow.next;
    prev.next = null;
    while (node) {
        const temp = node.next;
        node.next = head2;
        head2 = node;
        node = temp;
    }

    // 分别遍历两个链表
    while (head && head2) {
        if (head.val === head2.val) {
            head = head.next;
            head2 = head2.next;
        } else {
            return false;
        }
    }

    return true;
  }

//   console.log(isPalindrome2())

// 237. 删除链表中的节点
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
  };

// 283. 移动零, [0,1,0,3,12]
// [0,1,0,3,12]-> [1,0,0,3,12] -> [1,3,12,0,0]
var moveZeroes = function(nums) {
    let i = j = 0;

    while (i < nums.length) {
        if (nums[i] !== 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
        i++;
    }

    return nums;
}
// console.log(moveZeroes([0,1,0,3,12]));

// 344. 反转字符串
var reverseString = function(s) { 
    let l = 0, r = s.length - 1;

    while (l < r) {
        [s[l], s[r]] = [s[r], s[l]];
        l++;
        r--;
    }

    return s;
}
console.log(reverseString(["h","e","l","l","o"]))

// 350. 两个数组的交集II
var intersect = function(nums1, nums2) {
    const res = [];
    let l1 = 0, l2 = 0;
    // 排序两个列表
     nums1.sort((a, b) => a - b);
     nums2.sort((a, b) => a - b);

     // 从小到大比较两个数组
    while (l1 < nums1.length && l2 < nums2.length) {
        if (nums1[l1] === nums2[l2]) {
            res.push(nums1[l1]);
            l1++;
            l2++;
        } else if (nums1[l1] < nums2[l2]) {
            l1++;
        } else {
            l2++;
        }
    }

    return res;
}
console.log(intersect([4,9,5], [9,4,9,8,4]));
