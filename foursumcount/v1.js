/**
 * 试试直接用组合的方式，测试性能
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
 var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const result = [], len = nums1.length

    const startTIme = Date.now()
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            for (let k = 0; k < len; k++) {
                for (let l = 0; l < len; l++) {
                    if (nums1[i] + nums2[j] + nums3[k] + nums4[l] === 0) {
                        result.push([i, j, k, l])
                    }
                }
            }
        }
    }

    const endTime = Date.now()
    console.log(`execut time: ${endTime - startTIme}ms`)

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
