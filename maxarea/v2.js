/**
 * 使用双向指针，减少第二循环的遍历次数，时间复杂度变为O(N²/2)
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
     const n = height.length
     let maxArea = 0
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1, k = n - 1; j <= k; j++, k--) {
            const area1 = (j - i) * Math.min(height[i], height[j])
            const area2 = (k - i) * Math.min(height[i], height[k])
            maxArea = Math.max(maxArea, area1, area2)
        }
    }

    return maxArea
}

console.log(maxArea([2,3,4,5,18,17,6]))
