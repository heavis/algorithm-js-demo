// 数据流的中位数
// https://leetcode.cn/leetbook/read/top-interview-questions-hard/xd3xme/

var MedianFinder = function() {
    this.minQueue = [];
    this.maxQueue = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if (!this.minQueue.length || this.minQueue.length <= this.maxQueue.length) {
        this.minQueue.push(num);
        this.minQueue.sort();

        if (this.maxQueue.length + 1 < this.minQueue.length) {
            const val = this.minQueue.pop();
            this.maxQueue.unshift(val);
            this.maxQueue.sort();
        } 
    } else {
        this.maxQueue.push(num);
        this.maxQueue.sort();

        if (this.minQueue.length < this.maxQueue.length) {
            const val = this.maxQueue.shift();
            this.minQueue.push(val);
            this.minQueue.sort();
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.minQueue.length > this.maxQueue.length) {
        return this.minQueue[this.minQueue.length - 1];
    }
    const min = this.minQueue[this.minQueue.length - 1];
    const max = this.maxQueue[0];

    return (min + max) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */