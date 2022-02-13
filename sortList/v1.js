/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * 直接遍历，有N个数，每次都会遍历，时间复杂度为O(N²)
 * @param {ListNode} head
 * @return {ListNode}
 */
 var sortList = function(head) {
    if (!head) {
        return null
    }

    let result = head
    head = head.next
    // 初始化result只存储链表头
    result.next = null 
    // 遍历head，直到结束
    while (head) {
        // head和result比较，找到正确的位置，直接插入
        let preNode = result
        // 如果head大于preNode则直接讲head插入到当前preNode之后
        while (preNode.val <= head.val && preNode.next && preNode.next.val <= head.val) {
            preNode = preNode.next
        }
        // 如果head小于链表头，则将head插入到头部
        const tempNextNode = head.next
        if (head.val < preNode.val) {
            head.next = preNode
            result = head
        } else { // 其他情况，preNode节点必定小于head节点
            const oldNextNode = preNode.next
            preNode.next = head
            head.next = oldNextNode
        }

        head = tempNextNode
    }

    return result
};

const head = ((list) => {
    let result, trail
    for (const val of list) {
        const node = new ListNode(val)
        if (result) {
            trail.next = node
        } else {
            result = node
        }

        trail = node
    }

    return result
})([4,2,1,3])

let result = sortList(head)
while (result) {
    console.log(result.val)
    result = result.next
}
// console.log(result.next.next)
