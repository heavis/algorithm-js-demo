
/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * 逐一合并两条链表, 新建一个空链表，head, 逐一合并lists链表到head中
 * 时间复杂度，O(KN), K为lists长度，N为每个链表的长度
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 const mergeKLists = function(lists) {
    let head

    for (let i = 0; i < lists.length; i++) {
        head = mergeTwoLink(head, lists[i])
    }

    return head || new ListNode().next
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
const lists = [[0,2,5]].map(arr => arr.length ? arr.reduce((preLink, curVal) => {
    preLink = isNaN(preLink) ? preLink : (curLink = new ListNode(preLink))
    const newLink = new ListNode(curVal)
    curLink.next = newLink
    curLink = newLink

    return preLink
}) : undefined).filter(item => item)
// console.log(lists)
// let result = mergeKLists(lists)
let result = mergeKLists([])
console.log(result)
const arr = []
while (result) {
    arr.push(result.val)
    result = result.next
}
console.log(arr)
