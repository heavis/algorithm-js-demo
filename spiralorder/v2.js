const spiralOrder = function(matrix) {
    if (!matrix || !matrix.length || matrix.length > 10) {
        throw new Error('matrix为二位数组，1 <= matrix长度 <= 10')
    }
    const m = matrix.length, n = matrix[0].length, result = []
    // 通过单位向量控制方向，[1, 0]表示→, [0, 1]表示↓, [-1， 0]表示←, [0, -1]表示↑
    const vects = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    // 先从左到右遍历, 起始位置为[0, 0]
    let vectIndex = 0, [x, y] = [0, 0]
    while (result.length < m * n) {
        // 题目限定了元素值从-100到100, 已经取过的元素其值设置为-infinity
        if (0 <= x && x <= m - 1 && 0 <= y && y <= n - 1 && matrix[x][y] !== -Infinity) {
            result.push(matrix[x][y])
            matrix[x][y] = -Infinity
            x += vects[vectIndex][1]
            y += vects[vectIndex][0]
        } else {
            // 不撞南墙不回头， 遇到尽头多走了一步需回退回来并调整到下一步起始位置
            x -= vects[vectIndex][1]
            y -= vects[vectIndex][0]
            vectIndex = (vectIndex + 1) % vects.length
            x += vects[vectIndex][1]
            y += vects[vectIndex][0]
        }
    }

    return  result
};

const imatrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
console.log(spiralOrder(imatrix))
