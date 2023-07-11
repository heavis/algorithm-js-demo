/**
 * @param {number} n
 * @return {number}
 */
 var numSquares = function(n) {
    const fn = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        fn[i] = i;

        for (let j = 1; j * j <= i; j++) {
            fn[i] = Math.min(fn[i], fn[i - j * j] + 1);
        }
    }
    console.log(fn);
    return fn[n];
};

console.log(numSquares(12))