const spiralOrder = function(matrix) {
    if (!matrix || !matrix.length || matrix.length > 10) {
        throw new Error('matrix为二位数组，1 <= matrix长度 <= 10')
    }
    const m = matrix.length, n = matrix[0].length, result = []
    // 通过单位向量控制方向，[1, 0]表示→, [0, 1]表示↓, [-1， 0]表示←, [0, -1]表示↑
    const vects = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    // 先从左到右遍历, 起始位置为[0, 0], 用[minRow, maxCol, maxRow, minCol]记录边界位置
    let vectIndex = 0, [x, y] = [0, 0], range = [0, n - 1, m - 1, 0]

    // 边界位置如何调整？
    while (result.length < m * n) {
        result.push(matrix[x][y])

        let [tempX , tempY] = [x + vects[vectIndex][1], y + vects[vectIndex][0]]
        // 如果tempX、tempY超出范围，即时调整方向
        if (tempX < range[0] || tempX > range[2] || tempY < range[3] || tempY > range[1]) {
            if (vectIndex === 0 || vectIndex === 3) {
                range[vectIndex] += 1
            } else {
                range[vectIndex] -= 1
            }
            // 调整至下一个方向
            vectIndex = (vectIndex + 1) % 4
            tempX = x + vects[vectIndex][1]
            tempY = y + vects[vectIndex][0]       
        } 
        // 下一个元素确保在边界范围内，可以继续遍历
        [x,  y] = [tempX, tempY]       
    }

    return  result
};

const imatrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
console.log(spiralOrder(imatrix))
