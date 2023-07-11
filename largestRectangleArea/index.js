/**
 * 暴力解法
 * @param {number[]} heights
 * @return {number}
 */
 var largestRectangleArea = function(heights) {
    const length = heights.length;
    if (length === 0) {
        return 0;
    }

    let res = 0;
    for (let i = 0; i <length; i++) {
        let left = i, right = i;
        const curHeight = heights[i];

        while (left > 0 && heights[left - 1] >= curHeight) {
            left--;
        }

        while (right < length - 1 && heights[right + 1] >= curHeight) {
            right++;
        }

        res = Math.max(res, (right - left + 1) * curHeight);
    }

    return res;
};

console.log(largestRectangleArea([2,1,5,6,2,3]))