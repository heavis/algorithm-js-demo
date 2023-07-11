/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(numCourses, prerequisites) {
    // 将prerequisites生成图结构, 再使用dfs遍历+回溯
    const map = new Map(), visited = new Array(numCourses).fill(0);
    for (const pair of prerequisites) {
        if (!map.has(pair[0])) {
            map.set(pair[0], new Set());
        }
        const set = map.get(pair[0]);
        set.add(pair[1]);
    }
    for (let i = 0; i < numCourses; i++) {
        const deps = new Set();
        const result = dfs(map, i, deps, visited);
        if (!result) {
            return false;
        }
        visited[i] = true;
    }

    return true;
};

function dfs(map, course, deps, visited) {
    if (visited[course]) {
        return true;
    }
    // console.log(deps);
    if (map.has(course)) {
        deps.add(course);
        const pres = map.get(course);
        for (const pre of pres) {
            if (deps.has(pre)) {
                return false;
            }
            if (!dfs(map, pre, deps, visited)) {
                return false;
            }
            deps.delete(pre);
        }
    }

    return true
}

console.log(canFinish(8, [[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]))