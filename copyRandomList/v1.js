/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next, random) {
    this.val = val
    this.next = next
    this.random = random;
}

/**
 * 复制带随机指针的链表
 * 使用HashMap存储newHead和oldHead的映射关系，head.random先临时指向原链表节点，
 * 等链表遍历完后再遍历一次新链表依据更新random
 * @param {Node} head
 * @return {Node}
 */
 var copyRandomList = function(head) {
    if (!head) {
        return null
    }
    let tempHead = new ListNode(), tempTail = tempHead
    // 使用Map存储newHead和oldHead映射关系
    const nodeMap = new Map()

    // 第一次遍历，遍历原head，复制每个节点
    while (head) {
        const newNode = new ListNode(head.val)
        newNode.random = head.random
        nodeMap.set(head, newNode)
        tempTail.next = newNode
        tempTail = tempTail.next
        head = head.next
    }
    
    // 第二次遍历，更新random
    tempTail = tempHead.next
    while (tempTail) {
        if (tempTail.random) {
            tempTail.random = nodeMap.get(tempTail.random)   
        }
        tempTail = tempTail.next
    }

    return tempHead.next
};

const head = ((list) => {
    let result, trail
    for (const item of list) {
        const node = new ListNode(item[0], null, item[1])
        if (result) {
            trail.next = node
        } else {
            result = node
        }

        trail = node
    }

    return result
})([[3,null],[3,0],[3,null]])

let result = copyRandomList(head)
while (result) {
    console.log(result)
    result = result.next
}
