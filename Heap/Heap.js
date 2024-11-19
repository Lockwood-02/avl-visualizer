// Constructor for Heap
function Heap() {
    this.list = [];
}

Heap.prototype = {
    // Add a new object into the heap
    add: function (e, callback) {
        this.list.push(e); // Append to the heap
        var currentIndex = this.list.length - 1; // The index of the last node

        // Check if the new element is greater than the root
        if (currentIndex > 0 && this.list[currentIndex] > this.list[0]) {
            // Highlight the root and the new element
            if (callback) {
                callback({ [0]: "root", [currentIndex]: "new" });
            }

            // Delay before starting heapify
            setTimeout(() => {
                this.heapifyUp(currentIndex, callback);
            }, 500);
        } else {
            // If the new element is not greater than the root, just draw without heapify
            draw(); // Re-draw without any heapify or highlighting
        }
    },

    // Remove the root from the heap
    remove: function (callback) {
        if (this.list.length === 0) return null;

        var removedObject = this.list[0];

        // Highlight the root node before deletion
        if (callback) {
            callback({ [0]: "root" }); // Highlight the root in red before removal
        }

        setTimeout(() => {
            // Replace the root with the last element and remove the last element
            this.list[0] = this.list[this.list.length - 1];
            this.list.pop();

            // Highlight the new root before heapify down starts
            if (callback && this.list.length > 0) {
                callback({ [0]: "new" }); // Highlight the new root in green
            }

            setTimeout(() => {
                this.heapifyDown(0, callback);
            }, 500); // Delay before starting heapify down
        }, 500); // Delay before swapping the root with the last element

        return removedObject;
    },

    // Delete a specific element at a given index
    delete: function (index, callback) {
        if (index < 0 || index >= this.list.length) {
            return null; // Index out of bounds
        }

        // Replace the element at the index with the last element
        var removedObject = this.list[index];
        this.list[index] = this.list[this.list.length - 1];
        this.list.pop(); // Remove the last element

        if (callback) {
            callback({ [index]: "deleted" }); // Highlight the deleted element
        }

        setTimeout(() => {
            var parentIndex = Math.floor((index - 1) / 2);

            // Heapify up if necessary
            if (index > 0 && this.list[index] > this.list[parentIndex]) {
                this.heapifyUp(index, callback);
            } else {
                // Heapify down if necessary
                this.heapifyDown(index, callback);
            }
        }, 500);

        return removedObject;
    },

    // Heapify up method to maintain heap property after insertion or deletion
    heapifyUp: function (index, callback) {
        let heapifyInterval = setInterval(() => {
            if (index <= 0) {
                clearInterval(heapifyInterval);
                draw(); // Draw the final heap after heapify up
                return;
            }

            var parentIndex = Math.floor((index - 1) / 2);
            if (this.list[index] > this.list[parentIndex]) {
                // Swap
                var temp = this.list[index];
                this.list[index] = this.list[parentIndex];
                this.list[parentIndex] = temp;

                // Highlight current nodes
                if (callback) {
                    callback({ [index]: "new", [parentIndex]: "root" });
                }

                index = parentIndex;
            } else {
                clearInterval(heapifyInterval);
                draw(); // Heap property is satisfied, draw the final heap
            }
        }, 500); // Delay between each heapify step to visualize the process
    },

    // Heapify down method to maintain heap property after deletion or root removal
    heapifyDown: function (index, callback) {
        let heapifyInterval = setInterval(() => {
            var leftChildIndex = 2 * index + 1;
            var rightChildIndex = 2 * index + 2;

            // Find the maximum between two children
            if (leftChildIndex >= this.list.length) {
                clearInterval(heapifyInterval);
                draw(); // No children left, draw the final heap
                return;
            }

            var maxIndex = leftChildIndex;
            if (
                rightChildIndex < this.list.length &&
                this.list[rightChildIndex] > this.list[maxIndex]
            ) {
                maxIndex = rightChildIndex;
            }

            // Swap if the current node is less than the maximum child
            if (this.list[index] < this.list[maxIndex]) {
                var temp = this.list[maxIndex];
                this.list[maxIndex] = this.list[index];
                this.list[index] = temp;

                // Highlight current nodes
                if (callback) {
                    callback({ [index]: "root", [maxIndex]: "new" });
                }

                index = maxIndex;
            } else {
                clearInterval(heapifyInterval);
                draw(); // Heap property is satisfied, draw the final heap
            }
        }, 500); // Delay between each heapify step to visualize the process
    },

    // Utility methods
    getSize: function () {
        return this.list.length;
    },

    isEmpty: function () {
        return this.list.length === 0;
    },
};
