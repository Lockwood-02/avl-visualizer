# AVL and Heap Visualizer

First and foremost I want to say thank you to Y. Daniel Liang who supplied the base algorithms for this little project.

Welcome to the **AVL and Heap Visualizer**! This project allows users to explore and interact with visualizations of two fundamental data structures: **AVL Trees** and **Heaps**. You can easily set up the environment to visualize these data structures in action by following the instructions below.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Setup Instructions](#setup-instructions)
-   [How to Use](#how-to-use)
-   [Project Structure](#project-structure)

## Project Overview

The **AVL and Heap Visualizer** consists of two interactive visualizers:

1. **AVL Tree Visualizer** - Visualize how an AVL Tree maintains balance through rotations during insertions and deletions.
2. **Heap Visualizer** - Visualize the operations in a Max Heap, including insertion, root removal, and heapify processes.

These visualizations provide an interactive way to understand the behavior of these data structures, making learning more engaging and intuitive.

## Features

-   Visual representation of **AVL Tree** rotations, insertions, and deletions.
-   **Heap** operations like adding elements, removing the root, and maintaining heap order.
-   Simple and clean interface to easily navigate between visualizers.

## Setup Instructions

There are no special dependencies required for this project. You can simply open the HTML files in a browser. However, for a more dynamic development experience, we recommend using the **Live Server** extension in **VSCode**.

### Step-by-Step Setup

1. **Clone or Download the Project**

    - Clone the repository or download the project files to your local machine.

2. **Open the Project in VSCode**

    - Launch **VSCode** and open the project folder (`AVL-VISUALIZER`).

3. **Install Live Server Extension**

    - If you haven't already, install the **Live Server** extension in **VSCode**.
    - [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

4. **Open `index.html` with Live Server**

    - Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
    - This will start a local server and open the project in your default browser.

5. **Navigate Between Visualizers**
    - From the **index page**, select either the **AVL Tree Visualizer** or the **Heap Visualizer** to begin exploring.

## How to Use

-   **Select a Data Structure**: Start from the **index page**, where you can choose between the **AVL Tree** or **Heap** visualizer.
-   **Interact with the Visualizers**: Each visualizer allows you to input values and observe how the data structure changes:
    -   **AVL Tree**: Add and remove nodes to see automatic balancing (rotations).
    -   **Heap**: Insert elements and remove the root to observe heapify operations.

## Project Structure

The project is organized into two main folders: `AVLTree` and `Heap`.

```
AVL-VISUALIZER
|   index.html
|
|   AVLTree
|   |   AVLTree.html
|   |   AVLTree.js
|   |   BST.html
|   |   BST.js
|
|   Heap
|   |   Heap.html
|   |   Heap.js
```

### File Descriptions

-   **index.html**: The main landing page where you can choose which visualizer to open.
-   **AVLTree Folder**: Contains the HTML and JavaScript files for the AVL Tree and Binary Search Tree visualizers.
    -   `AVLTree.html` and `AVLTree.js` handle the AVL Tree visualization.
    -   `BST.html` and `BST.js` are used for visualizing a basic Binary Search Tree.
-   **Heap Folder**: Contains the HTML and JavaScript files for the Heap visualizer.
    -   `Heap.html` and `Heap.js` provide the interactive heap visualizer.

## Additional Notes

-   **No Dependencies Required**: The visualizations run purely in the browser with JavaScript, HTML, and CSS. No other libraries are needed.
-   **Live Server Usage**: Using Live Server allows for automatic reloading, which can be helpful when making changes to the code.

Enjoy exploring and understanding the AVL Tree and Heap data structures in a more interactive way!

---

If you have any questions or encounter any issues, feel free to reach out. Happy learning!
