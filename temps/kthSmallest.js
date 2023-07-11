/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(matrix, k) {
    const n = matrix.length
    let left = matrix[0][0], right = matrix[n - 1][n - 1];

    while (left < right) {
        const mid = ((left + right) >> 1);

        if (check(matrix, mid, k, n)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
 }

 function check(matrix, mid, k, n) {
    let j = n - 1, i = 0, nums = 0;

    while (j >= 0 && i < n) {
        if (matrix[j][i] <= mid) {
            nums += (j + 1);
            i++;
        } else {
            j--;
        }
    }

    return nums >= k;
 }



 console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8));