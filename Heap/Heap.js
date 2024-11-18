// Constructor for Heap
function Heap() {
    this.list = [];
}

Heap.prototype = {
    // Add a new object into the heap
    add: function (e) {
        this.list.push(e); // Append to the heap
        var currentIndex = this.list.length - 1; // The index of the last node
        this.heapifyUp(currentIndex); // Maintain heap property by heapifying up
    },

    // Remove the root from the heap
    remove: function () {
        if (this.list.length == 0) return null;

        var removedObject = this.list[0];
        this.list[0] = this.list[this.list.length - 1];
        this.list.pop(); // Remove the last element
        this.heapifyDown(0); // Restore the heap property from the root

        return removedObject;
    },

    // Delete a specific element at a given index
    delete: function (index) {
        if (index < 0 || index >= this.list.length) {
            return null; // Index out of bounds
        }

        // Replace the element at the index with the last element
        var removedObject = this.list[index];
        this.list[index] = this.list[this.list.length - 1];
        this.list.pop(); // Remove the last element

        // Restore the heap property
        var parentIndex = Math.floor((index - 1) / 2);

        // Heapify up if necessary
        if (index > 0 && this.list[index] > this.list[parentIndex]) {
            this.heapifyUp(index);
        } else {
            // Heapify down if necessary
            this.heapifyDown(index);
        }

        return removedObject;
    },

    // Heapify up method to maintain heap property after insertion or deletion
    heapifyUp: function (index) {
        while (index > 0) {
            var parentIndex = Math.floor((index - 1) / 2);
            if (this.list[index] > this.list[parentIndex]) {
                // Swap
                var temp = this.list[index];
                this.list[index] = this.list[parentIndex];
                this.list[parentIndex] = temp;
                index = parentIndex;
            } else {
                break; // Heap property is satisfied
            }
        }
    },

    // Heapify down method to maintain heap property after deletion or root removal
    heapifyDown: function (index) {
        while (index < this.list.length) {
            var leftChildIndex = 2 * index + 1;
            var rightChildIndex = 2 * index + 2;

            // Find the maximum between two children
            if (leftChildIndex >= this.list.length) break; // No children, stop
            var maxIndex = leftChildIndex;
            if (rightChildIndex < this.list.length) {
                if (this.list[maxIndex] < this.list[rightChildIndex]) {
                    maxIndex = rightChildIndex;
                }
            }

            // Swap if the current node is less than the maximum child
            if (this.list[index] < this.list[maxIndex]) {
                var temp = this.list[maxIndex];
                this.list[maxIndex] = this.list[index];
                this.list[index] = temp;
                index = maxIndex;
            } else {
                break; // Heap property is satisfied
            }
        }
    },

    // Utility methods
    getSize: function () {
        return this.list.length;
    },

    isEmpty: function () {
        return this.list.length == 0;
    },
};
