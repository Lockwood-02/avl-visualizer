/*
    A lot of credit to Yong Daniel Liang who provided the code for the algorithms for
    the basic insert and delete functions. All other implementations were creaeted 
    by me in a collaborative effort with ChatGPT
*/

// Constructor for AVLTree
function AVLTree() {
    //  alert("AVLTree called");
    BST.call(this);
}

AVLTree.prototype = new BST(); // Inheritance
AVLTree.prototype.constructor = AVLTree;

AVLTreeNode.prototype = new TreeNode(); // Inheritance
AVLTreeNode.prototype.constructor = AVLTreeNode;

// Constructor for Node
function AVLTreeNode(e) {
    this.height = 0;
    TreeNode.call(this, e);
}

// Override the createNewNode method
AVLTree.prototype.createNewNode = function (e) {
    //  alert("AVLTree createNewNode");
    return new AVLTreeNode(e);
};

// Insert a new element e
AVLTree.prototype.insert = function (e) {
    var successful = BST.prototype.insert.call(this, e);
    //  alert("After insert, AVLTree size is " + this.size);
    if (!successful) return false; // e is already in the tree
    else {
        this.balancePath(e); // Balance from e to the root if necessary
    }

    return true; // e is inserted
};

// Update the height of a specified node
AVLTree.prototype.updateHeight = function (node) {
    if (node.left == null && node.right == null)
        // node is a leaf
        node.height = 0;
    else if (node.left == null)
        // node has no left subtree
        node.height = 1 + node.right.height;
    else if (node.right == null)
        // node has no right subtree
        node.height = 1 + node.left.height;
    else node.height = 1 + Math.max(node.right.height, node.left.height);
};

// Balance the nodes in the path from the specified
// node to the root if necessary
// Helper function to delay execution
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Update the balancePath function to highlight with a delay
AVLTree.prototype.balancePath = async function (e) {
    var path = this.path(e);

    for (let i = path.length - 1; i >= 0; i--) {
        let A = path[i];
        this.updateHeight(A);

        if (Math.abs(this.balanceFactor(A)) > 1) {
            let parentOfA = A === this.root ? null : path[i - 1];

            // Highlight the imbalanced node
            highlightNode(A, "red");
            draw(); // Redraw to apply highlight
            await sleep(500); // Delay for 1 second to show red highlight

            // Perform rotation after delay
            if (this.balanceFactor(A) === -2) {
                if (this.balanceFactor(A.left) <= 0) {
                    this.balanceLL(A, parentOfA); // LL rotation
                } else {
                    this.balanceLR(A, parentOfA); // LR rotation
                }
            } else if (this.balanceFactor(A) === +2) {
                if (this.balanceFactor(A.right) >= 0) {
                    this.balanceRR(A, parentOfA); // RR rotation
                } else {
                    this.balanceRL(A, parentOfA); // RL rotation
                }
            }

            // Reset the node color back to default after rotation
            highlightNode(A, "default");
            draw(); // Redraw to remove highlight
            await sleep(500); // Delay for 0.5 second to observe the new balanced state
        }
    }
};

// Balance the nodes in the path from the specified
// node to the root if necessary
AVLTree.prototype.balanceFactor = function (node) {
    if (node.right == null)
        // node has no right subtree
        return -node.height;
    else if (node.left == null)
        // node has no left subtree
        return +node.height;
    else return node.right.height - node.left.height;
};

// Balance LL (see Figure 27.1)
AVLTree.prototype.balanceLL = function (A, parentOfA) {
    var B = A.left; // A is left-heavy and B is left-heavy

    if (A == this.root) {
        this.root = B;
    } else {
        if (parentOfA.left == A) {
            parentOfA.left = B;
        } else {
            parentOfA.right = B;
        }
    }

    A.left = B.right; // Make T2 the left subtree of A
    B.right = A; // Make A the left child of B
    this.updateHeight(A);
    this.updateHeight(B);
};

// Balance LR (see Figure 27.1c)
AVLTree.prototype.balanceLR = function (A, parentOfA) {
    var B = A.left; // A is left-heavy
    var C = B.right; // B is right-heavy

    if (A == this.root) {
        this.root = C;
    } else {
        if (parentOfA.left == A) {
            parentOfA.left = C;
        } else {
            parentOfA.right = C;
        }
    }

    A.left = C.right; // Make T3 the left subtree of A
    B.right = C.left; // Make T2 the right subtree of B
    C.left = B;
    C.right = A;

    // Adjust heights
    this.updateHeight(A);
    this.updateHeight(B);
    this.updateHeight(C);
};

/** Balance RR (see Figure 27.1b) */
AVLTree.prototype.balanceRR = function (A, parentOfA) {
    var B = A.right; // A is right-heavy and B is right-heavy

    if (A == this.root) {
        this.root = B;
    } else {
        if (parentOfA.left == A) {
            parentOfA.left = B;
        } else {
            parentOfA.right = B;
        }
    }

    A.right = B.left; // Make T2 the right subtree of A
    B.left = A;
    this.updateHeight(A);
    this.updateHeight(B);
};

// Balance RL (see Figure 27.1d)
AVLTree.prototype.balanceRL = function (A, parentOfA) {
    var B = A.right; // A is right-heavy
    var C = B.left; // B is left-heavy

    if (A == this.root) {
        this.root = C;
    } else {
        if (parentOfA.left == A) {
            parentOfA.left = C;
        } else {
            parentOfA.right = C;
        }
    }

    A.right = C.left; // Make T2 the right subtree of A
    B.left = C.right; // Make T3 the left subtree of B
    C.left = A;
    C.right = B;

    // Adjust heights
    this.updateHeight(A);
    this.updateHeight(B);
    this.updateHeight(C);
};

// Override the remove method in the BST class
AVLTree.prototype.remove = function (e) {
    if (this.root == null) return false; // Element is not in the tree

    // Locate the node to be deleted and also locate its parent node
    var parent = null;
    var current = this.root;
    while (current != null) {
        if (e < current.element) {
            parent = current;
            current = current.left;
        } else if (e > current.element) {
            parent = current;
            current = current.right;
        } else break; // Element is in the tree pointed by current
    }

    if (current == null) return false; // Element is not in the tree

    // Case 1: current has no left children (See Figure 23.6)
    if (current.left == null) {
        // Connect the parent with the right child of the current node
        if (parent == null) {
            this.root = current.right;
        } else {
            if (e < parent.element) parent.left = current.right;
            else parent.right = current.right;

            // Balance the tree if necessary
            this.balancePath(parent.element);
        }
    } else {
        // Case 2: The current node has a left child
        // Locate the rightmost node in the left subtree of
        // the current node and also its parent
        var parentOfRightMost = current;
        var rightMost = current.left;

        while (rightMost.right != null) {
            parentOfRightMost = rightMost;
            rightMost = rightMost.right; // Keep going to the right
        }

        // Replace the element in current by the element in rightMost
        current.element = rightMost.element;

        // Eliminate rightmost node
        if (parentOfRightMost.right == rightMost)
            parentOfRightMost.right = rightMost.left;
        // Special case: parentOfRightMost is current
        else parentOfRightMost.left = rightMost.left;

        // Balance the tree if necessary
        this.balancePath(parentOfRightMost.element);
    }

    this.size--;
    return true; // Element inserted
};
