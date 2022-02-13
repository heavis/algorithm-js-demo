/**
 * 单层双指针循环法，由外向内遍历，找出面积的最大值
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
     const n = height.length
     let maxArea = 0, i = 0, j = n - 1

     while(i < j) {
         maxArea = Math.max(maxArea, (j - i) * Math.min(height[i], height[j]))
         if (height[i] < height[j]) {
             i++
         } else {
             j--
         }
     }

    return maxArea
}

console.log(maxArea([2,3,4,5,18,17,6]))
