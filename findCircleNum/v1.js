/**
 * @param {number[][]} isConnected
 * @return {number}
 */
 var findCircleNum = function(isConnected) {
    // 遍历矩阵生成图结构
    const cityMap = new Map(), n = isConnected.length, passed = new Set();
    for (let i = 0; i < n; i++) {
        if (!cityMap.has(i)) {
            cityMap.set(i, new Set())
        }
        for (let j = i + 1; j < n; j++) {
            if (!cityMap.has(j)) {
                cityMap.set(j, new Set())
            }
            if (isConnected[i][j]) {
                let hash = cityMap.get(i);
                hash.add(j);
                hash = cityMap.get(j);
                hash.add(i);
            }
        }
    }
    // console.log(cityMap);

    let provinceCount = 0;
    function dfs(city) {
        if (passed.has(city)) {
            return;
        }
        const list = cityMap.get(city);
        passed.add(city);
        // console.log(city, list, list.size);
        if (!list.size) {
            provinceCount++;
        } else {
            for (const linked of list) {
                list.delete(linked);
                cityMap.get(linked).delete(city);
                dfs(linked);
            }            
        }
    }

    // 根据bfs遍历联通的节点
    for (let i = 0; i < n; i++) {
        if (!passed.has(i)) {
            dfs(i);
        }
    }

    return provinceCount;
};

const isConnected = [[[1,1,1],[1,1,1],[1,1,1]]]
console.log(findCircleNum(isConnected));