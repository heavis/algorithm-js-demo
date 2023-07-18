/**
 * 找最长回文子串，那么先从两边往中间找，第一次找打即为最长
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    let l = 0, r = s.length - 1, cache = Array.from(new Array(s.length), (v, k) => new Array(s.length).fill(-1));
    // console.log(cache)
    return traverse(s, l, r, cache);
};

function traverse(s, l, r, cache) {
    console.log(s.substring(l, r +1), l, r);
    if (l >= r) {
        return s[l];
    }
    // console.log(l, r, s.substring(l, r - l + 1))
      if (check(s, l, r, cache)) {
        // console.log(s.substring(l, r - l + 1));
        return s.substring(l, r + 1);
      }
      const sub1 = traverse(s, l + 1, r, cache);
      const sub2 = traverse(s, l, r - 1, cache);
    //   console.log(sub1, sub2)

      return sub1.length > sub2.length ? sub1 : sub2;
}

function check(s, l, r, cache) {
    const oldL = l, oldR = r;
    if (cache[l][r] >= 0) {
        // console.log('cached')
        return !!cache[l][r];
    }
    while (l <= r) {
        if (s[l++] !== s[r--]) {
            cache[oldL][oldR] = 0;
            return false;
        }
    }
    cache[oldL][oldR] = 1;

    return true;
}

console.log(longestPalindrome("babaddtattarrattatddetartrateedredividerb"))