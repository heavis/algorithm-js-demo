/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
    const res = [];
    let highLevel = 0;

    while (l1 || l2) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + highLevel;
        let high = (sum / 10) | 0;
        const low = sum % 10;

        res.push(low);
        highLevel = high;

        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }

        console.log(sum, high, low, res);
    }

    if (highLevel > 0) {
        res.push(highLevel);
    }

    let head = new ListNode(0), tail = head;

    for (const val of res) {
        const node = new ListNode(val);
        tail.next = node;
        tail = tail.next;
    }

    return head.next;
};
console.log(addTwoNumbers(l1 = [2,4,3], l2 = [5,6,4]))