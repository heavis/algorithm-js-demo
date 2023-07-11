/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var findOrder = function(numCourses, prerequisites) {
    // 按课程的先后顺序生成图，然后再遍历是否存在环
    const visited = new Array(numCourses).fill(0);
    let edges = new Array(numCourses).fill(null);
    edges = Array.from(edges, (v, k) => []);
    const result = [];

    function dfs(edges, visited, u) {
        visited[u] = 1;
        for (const v of edges[u]) {
            if (visited[v] === 0) {
                dfs(edges, visited, v);
            } else if (visited[v] === 1) {
                valid = false;
                return;
            }
            if (!valid) {
                return;
            }
        }
        visited[u] = 2;
        result.push(u);
    
        return true;
     }

    for (const pair of prerequisites) {
        edges[pair[1]].push(pair[0]);
    }

    let valid = true;
    for (let i = 0; i < numCourses; i++) {
        if (!valid) {
            break;
        }
        if (visited[i] === 0) {
            dfs(edges, visited, i);
        }
    }

    if (!valid) {
        return [];
    }

    return result.reverse();
 }

 console.log(findOrder(8, [[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]))