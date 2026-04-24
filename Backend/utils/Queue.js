class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(job) {
        this.items.push(job);  // add to tail
    }

    dequeue() {
        return this.items.shift();  // remove from head (FIFO)
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = new Queue();