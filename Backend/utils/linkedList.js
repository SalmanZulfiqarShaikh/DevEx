class ListNode {
    constructor(listing) {
        this.listingId = listing._id.toString();
        this.title = listing.title;
        this.price = listing.price;
        this.sellerId = listing.sellerId.toString();
        this.next = null;
    }

}

class LinkedList{
    constructor(){
        this.head = null;
    }

    //  O(1) — insert at head (newest first)
    prepend(listing){
        const newNode = new ListNode(listing);
        newNode.next = this.head;
        this.head = newNode;
    }

    deleteById(id){
        if(!this.head) return;
        if(this.head.listingId === id){
            this.head = this.head.next;
            return;
        }

        let current = this.head
        while (current.next) {
            if (current.next.listingId === id) {
                current.next = current.next.next;
                return;
            }
            current = current.next
        }
    }

     // O(n) — collect all nodes into array for filtering
    traverse() {
        const results = [];
        let curr = this.head;
        while (curr) {
            results.push({ ...curr, next: undefined });
            curr = curr.next;
        }
        return results;
    }

    // Update a node's data in-place
    updateById(id, updates) {
    let curr = this.head;
    while (curr) {
      if (curr.listingId === id) {
        Object.assign(curr, updates);
        return;
      }
      curr = curr.next;
    }
  }
}

// Single shared instance for the whole server
module.exports = new LinkedList();