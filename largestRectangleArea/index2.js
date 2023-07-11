/**
 * 单调栈
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/solutions/266844/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/
 * @param {number[]} heights
 * @return {number}
 */
 var largestRectangleArea = function(heights) {
    if (!heights || !heights.length) return 0;
    if (heights.length === 1) return heights[0];

    let res = 0;
    const stack = [], n = heights.length;;
    for (let i = 0; i < n; i++) {
        let height;
        while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
            height = heights[stack.pop()];

            while (heights[stack[stack.length - 1]] === height) {
                stack.pop();
            }

            let width;
            if (!stack.length) {
                // 一直到最左边都满足条件
                width = i;
            } else {
                width = i - stack[stack.length - 1] - 1;
            }

            res = Math.max(res, height * width);
        }

        stack.push(i);
    }

    while (stack.length) {
        height = heights[stack.pop()];

        while (heights[stack[stack.length - 1]] === height) {
            stack.pop();
        }

        let width;
        if (!stack.length) {
            width = n;
        } else {
            width = n - stack[stack.length - 1] - 1;
        }

        res = Math.max(res, height * width);
    }

    return res;
 }

 console.log(largestRectangleArea([2,4]))