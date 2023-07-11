class DLinkedNode {
    prev = null;
    next = null;
    key;
    val;

    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}



/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
    this.hash = new Map();
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.hash.has(key)) {
        return -1;
    }
    const node = this.hash.get(key);
    this.removeNode(node);
    this.moveToHead(node);

    return node.val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.hash.has(key)) {
        const node = this.hash.get(key);
        node.val = value;
        this.removeNode(node);
        this.moveToHead(node);
    } else {
        const node = new DLinkedNode(key, value);
        this.moveToHead(node);

        this.hash.set(key, node);
        if (this.hash.size > this.capacity) {
            const removedNode = this.removeTail();
            this.hash.delete(removedNode.key);

        }
    }
};

LRUCache.prototype.moveToHead = function(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next = node;
    node.next.prev = node;
}

LRUCache.prototype.removeNode = function(node) {
    const prev = node.prev, next = node.next;
    prev.next = next;
    next.prev = prev;
}

LRUCache.prototype.removeTail = function() {
    const removedNode = this.tail.prev;
    const prevNode = removedNode.prev;
    prevNode.next = this.tail;
    this.tail.prev = prevNode;

    return removedNode;
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
 var lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
 getLink();

function getLink() {
    const values = [];
    let node = lRUCache.head.next;
    while (node) {
        values.push([node.key, node.val]);
        node = node.next;
        console.log(node);
        if (node === lRUCache.tail) {
            // console.log(node);
        }

        // console.log(node);
    }

    console.log(values);
}

// ["LRUCache","put","put","get","put","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]