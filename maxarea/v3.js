/**
 * 两次循环都采用双向指针，时间复杂度降低为O(N²/4)
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
     const n = height.length
     let maxArea = 0
    for (let i = 0, j = n - 2; i <= j; i++, j--) {
        for (let k = i + 1, l = n - 1; k <= l; k++, l--) {
            const area1 = (k - i) * Math.min(height[i], height[k])
            const area2 = (l - i) * Math.min(height[l], height[i])

            maxArea = Math.max(maxArea, area1, area2)
            if (j < l) {
                const area3 = (l - j) * Math.min(height[l], height[j])
                maxArea = Math.max(maxArea, area3)
            }
        }
    }

    return maxArea
}

console.log(maxArea([2,3,4,5,18,17,6]))
