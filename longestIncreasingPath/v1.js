/**
 * @param {number[][]} matrix
 * @return {number}
 */
 var longestIncreasingPath = function(matrix) {
    // 用一个同样大小的矩阵numMatrix存储每个节点的最大递增路径，但不为0时表示已经计算过最大递增路径
    // 通用用maxNum存储最大递增路径

    const n = matrix.length;
    if (n === 0) {
        return 0;
    }
    const m = matrix[0].length;
    const numMatrix = Array.from(new Array(n), (v, k) => new Array(n).fill(0));
    let result = 0;

    function dfs(i, j) {
        if (numMatrix[i][j] > 0) {
            return numMatrix[i][j];
        }
        let childNum = 0;
        
        for (const [nextI, nextJ] of [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]]) {
            if (0 <= nextI && nextI < n && 0 <= j && j < m && matrix[nextI][nextJ] > matrix[i][j]) {
                childNum = Math.max(childNum, dfs(nextI, nextJ));
            }
        }

        numMatrix[i][j] = childNum + 1;
        result = Math.max(numMatrix[i][j], result);

        return numMatrix[i][j];
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (numMatrix[i][j] <= 1) {
                dfs(i, j);
            }
        }
    }

    return result;
};

console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]]))