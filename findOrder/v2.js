// https://leetcode.cn/leetbook/read/top-interview-questions-hard/xd9kfc/


/**
 * 生成图结构，找到所有入度为0的结点，这些节点没有前置依赖，然后每个树采用广度优先遍历生成以来顺序
 * numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * DFS算法
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 var findOrder = function(numCourses, prerequisites) {
    const visited = new Array(numCourses).fill(0), edges = new Map(), list = [];

    for (const pair of prerequisites) {
        const v = edges.has(pair[1]) ? edges.get(pair[1]) : [];
        v.push(pair[0]);
        edges.set(pair[1], v);
    }
    let valid = true;

    function dfs(num) {
        // 设置为搜索中
        visited[num] = 1;
        const deps = edges.get(num) || []
        for (const k of deps) {
            if (!visited[k]) {
                dfs(k)
            } else if (visited[k] === 1) { // k正在遍历过程中，又遍历到k，所有存在环
                valid = false;
                return
            }
        }
        visited[num] = 2;
        list.push(num);
    }

    for (let i = 0; i < numCourses; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    if (!valid) {
        return [];
    }
    list.reverse();


    return list;
};

console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))