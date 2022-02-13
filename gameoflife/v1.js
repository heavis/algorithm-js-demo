/**
 * 获取当前索引周围的细胞集合
 * @param {*} rowIndex 
 * @param {*} colIndex 
 * @param {*} board 
 * @returns 
 */
    function getNearCells(curRow, curCol, board) {
    //从左上沿顺时针方向计算8个位置，不存在的设置为空数组[]
    const nears = []
    for (let startRow = curRow - 1; startRow <= curRow + 1; startRow++) {
        for (let startCol = curCol - 1; startCol <= curCol + 1; startCol++) {
            if (curRow === startRow && curCol === startCol) {
                continue
            }
            if (board[startRow] === undefined) {
                nears.push([])
            } else if (board[startRow][startCol] === undefined) {
                nears.push([])
            } else {
                // 存储状态和索引，便于扩展
                nears.push([startRow, startCol, board[startRow][startCol]])
            }
        }
    }

    return nears
}

/**
 * 计算当前细胞的下一个状态
 * @param {*} curCell 
 * @param {周围细胞} nearCells 
 * @returns 
 */
function calcNextStatus(curCell, nearCells) {
    const activeCellCount = nearCells.reduce((preVal, curVal) => {
        if (curVal.length === 3) {
            return preVal + curVal[2]
        }
        return preVal
    }, 0)

    const next = {
        // 当前细胞状态为0，命中死亡细胞判断策略
        0: () => {
            const isEqualThree = activeCellCount === 3

            return isEqualThree ? 1 : 0
        },
        // 当前细胞状态为1， 命中活细胞判断策略
        1: () => {
            if (activeCellCount < 2) {
                return 0
            } else if (activeCellCount === 2 || activeCellCount === 3) {
                return 1
            } else if (3 < activeCellCount) {
                return 0
            }
        }
    }

    return next[curCell[2]]()
}

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var gameOfLife = function(board) {
    if (!board.length || !board[0].length) {
        throw new Error('网格格式错误.')
    }
    // 拷贝
    const preBoard = JSON.parse(JSON.stringify(board))
    const rowLen = board.length, colLen = board[0].length

    for (let rowIndex = 0; rowIndex < rowLen; rowIndex++) {
        preBoard[rowIndex] = preBoard[rowIndex] || []
        for (let colIndex = 0; colIndex < colLen; colIndex++) {
            board[rowIndex][colIndex] = calcNextStatus([rowIndex, colIndex, preBoard[rowIndex][colIndex]], getNearCells(rowIndex, colIndex, preBoard))
        }
    }

    return board
};
