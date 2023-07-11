/**
 * @param {number[][]} isConnected
 * @return {number}
 */
 var findCircleNum = function(isConnected) {
    const visited = new Set(), n = isConnected.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(isConnected, visited, n, i);
            count++;
        }
    }

    return count;
 }

 function dfs(isConnected, visited, n, city) {
    visited.add(city);
    for (let j = 0; j < n; j++) {
        if (isConnected[city][j] === 1 && !visited.has(j)) {
            dfs(isConnected, visited, n, j);
        }
    }
 }

 const isConnected = [[[1,1,1],[1,1,1],[1,1,1]]]
console.log(findCircleNum(isConnected));