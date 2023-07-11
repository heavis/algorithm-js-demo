/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    // left、right两个指针往中间移动，
    // 当left < right时，此时最大容量为v = (ri - li) * lh,其中li、ri代表索引，lh代表left位置的高度, 接下来要考虑的是比v更大的情况，那么只有left往右移动才有可能
    // 当left > right时，和上面相反，往左移动right

    let left = 0, right = height.length - 1, max = 0;

    while (left < right) {
        const diff = right - left;
        if (height[left] < height[right]) {
            max = Math.max(max, diff * height[left++]);
        } else {
            max = Math.max(max, diff * height[right--]);
        }
    }

    return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));