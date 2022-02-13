/**
 * 降低时间复杂度，A + B = -(C + D), 这种方式时间复杂度降为O(n²), 空间复杂度由O(1)变为O(n²), 临时结果用hash表存储。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
 var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const result = [], len = nums1.length
    const startTime = Date.now()

    const map = new Map()
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            // map存储格式: key: string, value: [[i1, j1], [i2, j2]], 不同组合之和可能相同
            const sum = nums1[i] + nums2[j]
            const value = map.get(sum) || []
            value.push([i, j])
            map.set(sum, value)
        }
    }   

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            const sum = -(nums3[i] + nums4[j])
            if (map.has(sum)) {
                const value = map.get(sum)
                for (const arr of value) {
                    result.push(arr.concat([i, j]))
                }
            }

        }
    } 

    const endTime = Date.now()
    console.log(`execut time: ${endTime - startTime}ms`)

    return result
};

function generateArr(start, diff, len) {
    const arr = []
    for (let index = 0; index < len; index++) {
        arr.push(start + diff * (index + 1))
        arr.push(start - diff * (index + 1))
    }

    return arr
}

const A = generateArr(1, 2, 150)
const B = generateArr(2, 2, 150)
const C = generateArr(0, 1, 150)
const D = generateArr(-1, 3, 150)

console.log(fourSumCount(A, B, C, D))
