/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * root = [-10,9,20,null,null,15,7]
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxPathSum = function(root) {
    // 采用dfs遍历，分别获取左、右子节点的最大和
    let maxSum = -Infinity;

    function dfs(root) {
        // if (!root.left && !root.right) {
        //     return root.val;
        // }

        let leftSum = 0, rightSum = 0;
        if (root.left) {
            leftSum = dfs(root.left);
        }
        if (root.right) {
            rightSum = dfs(root.right);
        }
        const sum = Math.max(root.val + leftSum, root.val + rightSum, root.val);
        // 除了作为路径分支，也能为最大路径
        maxSum = Math.max(maxSum, sum, root.val + leftSum + rightSum);

        // 左节点路径、有节点路径、当前节点，最大值作为最大路径
        return sum;
    }
    maxSum = Math.max(dfs(root), maxSum);

    return maxSum;

};

