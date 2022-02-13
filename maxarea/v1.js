/**
 * 将数组项i，j两两组合，求其面积，并逐步遍历，最大面积值即为容器最大盛水量
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
     let maxArea = 0
    for (let i = 0; i < height.length - 1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            // height[i], height[j]取交小的值，盛水量按最小挡板算
            const x = j - i, y = Math.min(height[i], height[j])
            const tempArea = x * y
            maxArea = Math.max(maxArea, tempArea)
        }
    }

    return maxArea
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
