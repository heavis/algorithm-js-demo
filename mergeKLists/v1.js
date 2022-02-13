

/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 const mergeKLists = function(lists) {
    if (!lists.length) {
        return null
    }
    if (lists.length === 1 && !lists[0].length) {
        return null
    }

    let start = 0 
    while (!lists[start]) {
        start++
    }

    let curLink = head = lists[start], preBaseLink = undefined

    const tags = new Array(lists.length)
    tags.fill(0)

    
    let lestLlinkCount = lists.length - (start + 1)
    
    while (lestLlinkCount > 0) {
        const oldLink = curLink
        for (let i = start + 1; i < lists.length; i++) {
            // curLink已经遍历到最后一个
            if (!curLink) {
                preBaseLink.next = lists[i]
                curLink = lists[i]
                lists[i] = null
                lestLlinkCount--
                continue
            }
            // 每项代表一个链表，并且指向链表头部
            const compareLink = lists[i]
            if (compareLink.val <= curLink.val) {
                lists[i] = compareLink.next
                compareLink.next = curLink
                preBaseLink && (preBaseLink.next = compareLink)
                // preBaseLink = urLink
                curLink = compareLink
                // head始终为链表头部
                if (curLink.val <= head.val) {
                    head = curLink
                }
            }

            if (!lists[i]) {
                lestLlinkCount--
            }
        }
        // 如果遍历之后curlink无变化，则向右移动
        if (oldLink === curLink) {
            preBaseLink = curLink
            curLink = curLink.next
        }
    }

    return head
};

let curLink = undefined
const lists = [[1,4,5],[1,3,4],[2,6]].map(arr => arr.length ? arr.reduce((preLink, curVal) => {
    preLink = isNaN(preLink) ? preLink : (curLink = new ListNode(preLink))
    const newLink = new ListNode(curVal)
    curLink.next = newLink
    curLink = newLink

    return preLink
}) : undefined).filter(item => item)
console.log(lists)
// let result = mergeKLists(lists)
let result = mergeKLists(lists)
const arr = []
while (result) {
    arr.push(result.val)
    result = result.next
}
console.log(arr)
