/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * 使用归并排序加合并，链表查找中间位置使用快慢指针
 * @param {ListNode} head
 * @return {ListNode}
 */
 var sortList = function(head) {
    return sort(head, null)
};

// 执行分割，时间复杂度为N(logn)
function sort(head, end) {
    // 如果head或者head.next为空，则直接返回head
    if (!head || !head.next) {
        return head
    }

    let fast = head, slow = head
    // 使用快慢指针找到中间节点
    while (fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
    }
    // 第二个链表从slow.next到end
    end = sort(slow.next, end)
    slow.next = null
    // 第一个链表从head到slow
    head = sort(head, slow)

    return merge(head, end)
}

// 执行合并,时间复杂度为N(n)
function merge(head, end) {
    // 如果head或者end为null，则返回不为Null的链表
    if (!head || !end) {
        return head !== null ? head : end
    }
    let tempHead = new ListNode(), tempTail = tempHead
    // 每次比较head和end的val，哪个小就放到tempHead的尾部，将较小值的链表指针向后移动
    while (head && end) {
        if (head.val <= end.val) {
            tempTail.next = head
            head = head.next
        } else {
            tempTail.next = end
            end = end.next
        }
        tempTail = tempTail.next
    }
    // head或者end不为空，直接附加到tempTail后
    if (head) {
        tempTail.next = head
    } else {
        tempTail.next = end
    }

    return tempHead.next
}

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
})([4,2,1,3,2, 4])

let result = sortList(head)
while (result) {
    console.log(result.val)
    result = result.next
}
