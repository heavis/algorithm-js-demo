/**
 * 接雨水
 * https://leetcode.cn/problems/trapping-rain-water/solutions/9112/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    let sum = 0;

    for (let i = 1; i < height.length - 1; i++) {
        let maxLeft = 0, maxRight = height.length - 1;

        for (let j = 0; j < i; j++) {
            if (height[j] >= height[maxLeft]) {
                maxLeft = j;
            }
        }

        for (let j = i + 1; j < height.length; j++) {
            if (height[j] >= height[maxRight]) {
                maxRight = j
            }
        }

        let maxHeight = Math.min(height[maxLeft], height[maxRight]);
        if (maxHeight > height[i]) {
            sum += (maxHeight - height[i]);
        }

    }

    return sum;
};
console.log(trap([4,2,0,3,2,5]))