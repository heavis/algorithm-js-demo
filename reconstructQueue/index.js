/**
 * 根据身高重建队列
 * https://leetcode.cn/problems/queue-reconstruction-by-height/solutions/486066/gen-ju-shen-gao-zhong-jian-dui-lie-by-leetcode-sol/
 * @param {number[][]} people
 * @return {number[][]}
 */
 var reconstructQueue = function(people) {
    if (!people) return [];
    if (people.length <= 1) return people;

    const n = people.length;

    people.sort((p1, p2) => {
        if (p1[0] !== p2[0]) {
            return p1[0] - p2[0];
        } else { // 如果身高相同，那么排在前面的人数多的会放到队列的后面
            return p2[1] - p1[1];
        }
    });
    const ans = new Array(n).fill(null);
    for (const p of people) {
        const [h, k] = p;

        let lest = k + 1;
        for (let i = 0; i < n; i++) {
            if (ans[i] === null) {
                lest--;
                if (lest === 0) {
                    ans[i] = p;
                    break;
                }
            }
        }
    }

    return ans;
};
console.log(reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]))