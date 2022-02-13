const spiralOrder = function(matrix) {
    if (!matrix || !matrix.length || matrix.length > 10) {
        throw new Error('matrix为二位数组，1 <= matrix长度 <= 10')
    }
    const m = matrix.length, n = matrix[0].length
    // 0表示从左到右, 1从上到下， 2从右到左，3从下到上 
    let directions = 0 
    const MIN_ROW = 0, MAX_COL = 1, MAX_ROW = 2,MIN_COL = 3
    // [[最小行, ↓]， [最大列, ←]， [最大行, ↑]，[最小列, →]]
    const directionIndexs = [[0, 1], [n - 1, -1], [m - 1, -1], [0, 1]] 
    const result = []

    while (true) {
        if (result.length >= m * n) {
            break
        }

        if (directions === 0) { // →
            for (let index = directionIndexs[MIN_COL][0]; index <= directionIndexs[MAX_COL][0]; index++) {
                result.push(matrix[directionIndexs[MIN_ROW][0]][index])
            }
        } else if (directions === 1) { // ↓
            for (let index = directionIndexs[MIN_ROW][0]; index <= directionIndexs[MAX_ROW][0]; index++) {
                result.push(matrix[index][directionIndexs[MAX_COL][0]])
            }
        } else if (directions === 2) { // ←
            for (let index = directionIndexs[MAX_COL][0]; index >= directionIndexs[MIN_COL][0]; index--) {
                result.push(matrix[directionIndexs[MAX_ROW][0]][index])
            }
        } else if (directions === 3) { // ↑
            for (let index = directionIndexs[MAX_ROW][0]; index >= directionIndexs[MIN_ROW][0]; index--) {
                result.push(matrix[index][directionIndexs[MIN_COL][0]])
            }
        }
        directionIndexs[directions][0] = directionIndexs[directions][0] + directionIndexs[directions][1]
        directions = (directions + 1) % 4
        
    }

    return  result
};

const imatrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// const imatrix = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
// const imatrix = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]
console.log(spiralOrder(imatrix))
