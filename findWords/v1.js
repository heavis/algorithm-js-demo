/**
 * 使用单词回溯法，将所有单词words存放到前缀树中，然后遍历board网格和前缀树匹配
 * 同一个单元格内的字母再同一个单词中 不允许重复使用
 * 再遍历board中同一个单词可能存在多次，因此需要用hashSet去重
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
 var findWords = function(board, words) {
    const hashSet = new Set();
    const root = { children: new Map(), word: '' }
    
    for (const word of words) {
        inertNode(word, root);  
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            dfs(board, root, i, j, hashSet);
        }
    }
    const result = [];
    hashSet.forEach(val => result.push(val));

    return result;
};

function inertNode(word, tree) {
    for (let i = 0; i < word.length; i++) {
        if (!tree.children.has(word[i])) {
            tree.children.set(word[i], { children: new Map(), word: '' })
        }
        tree = tree.children.get(word[i]);
    }
    tree.word = word;
}

function dfs(board, tree, i, j, set) {
    if (!tree.children.has(board[i][j])) {
        return;
    }
    // 方向：左、上、右、下
    const dirs = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    // 遍历每个单元格，如果存在单词中的字母则继续往相邻方向延伸
    const word = board[i][j], next = tree.children.get(word);

    if (next) {
        board[i][j] = '#';
        for (const dir of dirs) {
            const i2 = i + dir[0], j2 = j + dir[1];
            if (0 <= i2 && i2 < board.length && 0 <= j2 && j2 < board[0].length) {
                dfs(board, next, i2, j2, set);    
            }
        }
        board[i][j] = word;
    }
    if (next.word) {
        set.add(next.word);
        next.word = '';
    }
}

// const result = findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]);
const result = findWords([["a"]], ['a']);
console.log(result);