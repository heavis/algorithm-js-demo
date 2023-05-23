// https://leetcode.cn/leetbook/read/top-interview-questions-hard/xd9kfc/


/**
 * 生成图结构，找到所有入度为0的结点，这些节点没有前置依赖，然后每个树采用广度优先遍历生成以来顺序
 * numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * BFS算法
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 var findOrder = function(numCourses, prerequisites) {
    // 例如edges[0] = [1]表示课程1依赖于课程0
    const edges = new Array(numCourses).fill(0).map(() => []);
    const indegs = new Map(), result = [], list = [];

    // 生成有向图，计算入度
    for (const pair of prerequisites) {
        edges[pair[1]].push(pair[0]); // edges[0] = [1, 2], edges[1] = [3], edges[2] = [3]
        if (!indegs.has(pair[0])) { // indegs[1] = 1, indegs[2] = 1, indegs[3] = 2
            indegs.set(pair[0], 1) 
        } else {
            indegs.set(pair[0], indegs.get(pair[0]) + 1)
        }
    }

    // 查找入度为0的顶点并放入队列list中
    for (let i = 0; i < numCourses; i++) {
        if (!indegs.has(i)) {
            list.push(i);
        }
    }
    // 采用BFS遍历方式，继续查找入度为0的顶点并放入队列list中
    while (list.length) {
        const last = list.pop();
        result.push(last);
        const nodes = edges[last] || [];
        for (const ni of nodes) {
            indegs.set(ni, indegs.get(ni) - 1);
            if (indegs.get(ni) === 0) {
                list.push(ni)
            }
        }
    }

    if (result.length !== numCourses) {
        return []
    }

    return result;
};

console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))