/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 计算链表的长度len，然后遍历到第len - n位置，再删除后续节点
 * [1,2,3,4,5], n = 2
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    let tail = head;
    let len = 0;
    while (tail) {
        len++;
        tail = tail.next;
    }
    console.log(len);
    tail = head;

    let lest = len - n;

    while (lest > 0) {
        tail = tail.next;
        lest--;
    }
    tail.next = tail.next?.next;


    return head;
};