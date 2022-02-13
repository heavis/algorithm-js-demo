
/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * 两两合并，采用递归的方式合并
 * 时间复杂度分析：K 条链表的总结点数是 N，平均每条链表有 N/K 个节点，
 * 因此合并两条链表的时间复杂度是 O(N/K)。从 K 条链表开始两两合并成 1 条链表，
 * 因此每条链表都会被合并 logK 次，因此 K 条链表会被合并 K∗logK 次，
 * 因此总共的时间复杂度是 K*logK*N/K 即 O（NlogK）。
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 const mergeKLists = function(lists) {
    if (!lists || !lists.length) {
        return new ListNode(0).next
    }

    // 对lists两两合并, 递归调用mergeKLists
    let len = lists.length, res = []
    for (let i = 0; i < len; i += 2) {
        // 如果len为奇数，则最后只剩下一个
        if (i === len - 1) {
            res.push(lists[i])
        } else {
            res.push(mergeTwoLink(lists[i], lists[i + 1]))    
        }
    }
    // 合并到最终只剩1项时，表明合并完毕，直接返回
    if (res.length === 1) {
        return res[0]
    }

    return mergeKLists(res)
}

 // 按大小有序合并l1、l2链表，需要使用辅助链表记录表头
 function mergeTwoLink(l1, l2) {
    let head = new ListNode(0), trail = head

    while (l1 && l2) {
        if (l1.val < l2.val) {
            trail.next = l1
            l1 = l1.next
        } else {
            trail.next = l2
            l2 = l2.next
        }
        trail = trail.next
    }
    // 最后l1或者l2可能不为空，需要将trail.next执行不为空的链表
    trail.next = l1 ? l1 : l2

    return head.next 
 } 

 let curLink = undefined
const lists = [[1,4,5],[1,3,4],[2,6]].map(arr => arr.length ? arr.reduce((preLink, curVal) => {
    preLink = isNaN(preLink) ? preLink : (curLink = new ListNode(preLink))
    const newLink = new ListNode(curVal)
    curLink.next = newLink
    curLink = newLink

    return preLink
}) : undefined).filter(item => item)
// console.log(lists)
// let result = mergeKLists(lists)
let result = mergeKLists(lists)
// console.log(result)
const arr = []
while (result) {
    arr.push(result.val)
    result = result.next
}
console.log(arr)
