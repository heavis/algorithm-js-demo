// 直线上最多的点数
/**
 * @param {number[][]} points
 * @return {number}
 */
 var maxPoints = function(points) {
    const n = points.length;
    if (n <= 2) {
        return points.length;
    }

    let ret = 0;
    for (let i = 0; i < n; i++) {
        // 可理解为遍历到i时，只有i和后面点共点的数量可能大于ret
        if (ret >= n - i || ret > n / 2) {
            break;
        }
        const map = {};
        for (let j = i + 1; j < n; j++) {
            const [p1, p2] = [points[i], points[j]];
            let dx = p2[0] - p1[0];
            let dy = p2[1] - p1[1];

            if (dx === 0) {
                dy = 1;
            } else if (dy === 0) {
                dx = 1;
            } else {
                if (dy < 0) {
                    dx = - dx;
                    dy = - dy;
                }
                const maxgcd = gcd(Math.abs(dx), Math.abs(dy));
                dx = dx / maxgcd;
                dy = dy / maxgcd;
            }

            const key = dy + (2 * (10 ** 4) + 1) * dx + '';
            map[key] = (map[key] || 0) + 1;
            console.log('key, i, j, count, dx, dy', key, i, j, map[key], dx, dy);
        }

        for (const key in map) {
            ret = Math.max(ret, map[key] + 1);
            // console.log(key, map[key], ret);
        }   
    }

    return ret;
};

function gcd(a, b) {
    return b !== 0 ? gcd(b, a % b) : a;
}

console.log(maxPoints([[0,0],[4,5],[7,8],[8,9],[5,6],[3,4],[1,1]]))