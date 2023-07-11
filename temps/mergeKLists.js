/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    // 采用两两合并遍历lists，直到lists长度为1
    const n = list.length;
    let res = [];
    for (let i = 0; i < n; i += 2) {
        if (i === n - 1) {
            res.push(list[i]);
        } else {
            res.push(mergeTwoLinks(lists[i], lists[i + 1]));
        }
    }

    if (res.length === 1) {
        return res[0];
    }

    return mergeKLists(res);
};

function mergeTwoLinks(left, right) {
    // 返回按大小合并后的链表
}