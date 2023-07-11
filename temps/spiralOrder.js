/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
    // 使用[x, y]记录当前位置, 位置不能超过ranges: [minX, maxX, minY, maxY], directions([[0, 1], [1, 0], [0, -1], [-1, 0]])记录方向
    // 索引index表示当前方向，当前方向达到尽头时调整方向、更新ranges、更新index

    const result = [];
    if (!matrix.length) {
        return result;
    }
    const n = matrix.length, m = matrix[0].length;
    const ranges = [0, n - 1, 0, m - 1], vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let index = 0;

    let [x, y] = [0, 0];

    while (result.length < n * m) {
        result.push(matrix[x][y]);
        const [newX, newY] = [x + vectors[index][0], y + vectors[index][1]];
        if (newX < ranges[0] || newX > ranges[1] || newY < ranges[2] || newY > ranges[3]) { // 达到临界点时调整index
            const curV = vectors[index];
            if (curV[1] > 0) {
                ranges[0]++;
            } else if (curV[1] < 0) {
                ranges[1]--;
            } else if (curV[0] > 0) {
                ranges[3]--;
            } else {
                ranges[2]++;
            }
            index = (index + 1) % 4;
        }

        [x, y] = [x + vectors[index][0], y + vectors[index][1]];
    }

    return result;
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))