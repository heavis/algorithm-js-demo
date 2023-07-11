/**
 * 动态规划
 * https://leetcode.cn/problems/trapping-rain-water/solutions/9112/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    let sum = 0;

    const n = height.length;
    const maxLeft = new Array(height.length).fill(0);
    const maxRight = new Array(height.length).fill(0);

    for (let i = 1; i < n; i++) {
        maxLeft[i] = Math.max(maxLeft[i - 1], height[i - 1]);
    }

    for (let j = n - 2; j >= 0; j--) {
        maxRight[j] = Math.max(maxRight[j + 1], height[j + 1]);
    }

    for (let i = 1; i < n - 1; i++) {
        const maxHeight = Math.min(maxLeft[i], maxRight[i]);
        if (maxHeight > height[i]) {
            sum += (maxHeight - height[i]);
        }
    }

    return sum;
};

console.log(trap([4,2,0,3,2,5]))