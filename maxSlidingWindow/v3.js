function swap(data, i, j) {
    const temp = data[i]
    data[i] = data[j]
    data[j] = temp
}

function left(i) {
    return 2 * i + 1
}

function right(i) {
    return 2 * i + 2
}


/**
 * 最大堆
 * 数据存储在数组中，index为数组下标
 * 二叉树左侧节点用index * 2 + 1表示，右侧节点用idnex * 2 + 2表示
 * 二叉树叶子节点表达式 序号 >= floor(N / 2), N为数组长度
 * https://www.zoo.team/article/binary-heap-with-js
 */
class MaxHeap {
    data = []
    size = 0

    constructor(data) {
        this.data = data || []
        this.size = this.data.length
    }

    /**
     * 调整节点，使当前节点满足最大堆
     * @param {*} i 
     */
    adjust(i) {
        let maxIndex = i, l = left(i), r = right(i)
        if (l < this.size && this.data[l] > this.data[maxIndex]) {
            maxIndex = l
        } 
        if (r < this.size && this.data[r] > this.data[maxIndex]) {
            maxIndex = r
        }
        // 如果max为元素，则满足最大堆，不需要重新处理
        if (maxIndex === i) {
            return
        }
        swap(this.data, i, maxIndex)
        this.adjust(maxIndex)
    }

    /**
     * 插入新元素
     * @param {新元素} value 
     */
    insert(value) {
        this.data[this.size] = value
        this.size++
        if (this.isHeap()) {
            return
        }
        this.build()
    }

    /**
     * 删除元素
     * @param {索引}} index 
     */
    delete(index) {
        // 从data中删除元素，重新构建
        this.data.splice(index, 1)
        this.size--
        this.build()
    }

    deleteV(value) {
        const index = this.data.indexOf(value)
        if (index > -1) {
            this.delete(index)
        }
    }

    /**
     * 构建最大堆
     * 从 N/2 - 1开始遍历，调整每个节点，使其满足最大堆
     */
    build() {
        for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
            this.adjust(i)
        }
    }

    /**
     * 判断是否为堆
     */
    isHeap() {
        for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
            const left = i * 2 + 1, right = i * 2 + 2
            if (this.data[i] < this.data[left] || this.data[i] < this.data[right]) {
                return false
            }
        }

        return true
    }

    /**
     * 生成升序排序数组
     * 最大堆第一个元素为最大值，将其和最后一个元素交换，然后设置堆的size减1
     */
    sort() {
        while (this.size) {
            swap(this.data, 0, this.size - 1)
            this.size--
            this.adjust(0)
        }
    }
}


/**
 * 使用最大堆实现，将最大窗口内的元素使用最大堆管理，每次取出的元素为堆中的最大元素
 * https://www.cnblogs.com/vipstone/p/13947873.html
 * @param {}} nums 
 * @param {*} k 
 * @returns 
 */
function maxSlidingWindow(nums, k) {
    const result = []

    if (k > nums.length) {
        throw new Error('k不能大于nums的长度')
    }
    //MaxHeap为最大堆对象，默认为空
    let left = 0, right = 0, maxHeap = new MaxHeap([])

    for (let i = 0; i < nums.length; i++) {
        maxHeap.insert(nums[i])

        if (right - left + 1 === k) {
            // 当达到滑动窗口长度，将最大堆的根节点data[0]保存到result
            result.push(maxHeap.data[0])
            // 将滑动窗口最左端的元素从最大堆中移除
            maxHeap.deleteV(nums[left])

            left++
        }

        right++
    }

    return result
};

// const maxHeap = new MaxHeap([1,3,-1,-3,5,3,6,7])
// maxHeap.build()
// console.log(maxHeap.data.toString())
// maxHeap.sort()
// console.log(maxHeap.data.toString())

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
