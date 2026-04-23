class Stack {
    constructor(limit = 5) {
        this.items = [];
        this.limit = limit;
    }
    push(item) {
        if (this.items.length >= this.limit) {
            this.items.shift();  // remove oldest from bottom
        }
        this.items.push(item);
    }
    popAll() {
        return [...this.items].reverse();  // most recent first
    }
    clear() {
        this.items = [];
    }
}

// One stack per logged-in buyer, keyed by userId
const viewedStacks = new Map();

const getStack = (userId) => {
    if (!viewedStacks.has(userId)) {
        viewedStacks.set(userId, new Stack());
    }
    return viewedStacks.get(userId);
};

const clearStack = (userId) => viewedStacks.delete(userId);

module.exports = { getStack, clearStack };