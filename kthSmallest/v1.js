/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(matrix, k) {
    const n = matrix.length;
    let left = matrix[0][0], right = matrix[n - 1][n - 1];

    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (check(matrix, mid, k, n)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

function check(matrix, mid, k, n) {
    let i = n - 1, j = 0, num = 0;
    while (i >= 0 && j < n) {
        if (matrix[i][j] <= mid) {
            num += (i + 1);
            j++;
        } else {
            i--;
        }
    }

    return num >= k;
}

console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8));