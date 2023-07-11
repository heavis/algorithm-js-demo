// 实现 Trie (前缀树)
// https://leetcode.cn/leetbook/read/top-interview-questions-hard/xdtp2c/

var Trie = function() {
    this.children = {};
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.children;

    for (const s of word) {
        if (!node[s]) {
            node[s] = {}
        }
        node = node[s];
    }

    node.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);

    return !!node && !!node.isEnd;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return !!this.searchPrefix(prefix);
};

Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children;

    for (const s of prefix) {
        if (!node[s]) {
            return false;
        }
        node = node[s];
    }

    return node;
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */