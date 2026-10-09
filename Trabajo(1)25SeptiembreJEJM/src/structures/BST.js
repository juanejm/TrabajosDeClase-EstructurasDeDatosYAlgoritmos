class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 1. Inserción de un número
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return true;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return false; // Evitar duplicados
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return true;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return true;
        }
        current = current.right;
      }
    }
  }

  // 2. Función para verificar si un valor está en el árbol
  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  // Recorridos
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Imprimir recorridos por consola (Requerimiento 1)
  printConsoleTraversals() {
    console.log("=== RECORRIDOS DEL ÁRBOL (BST) ===");
    console.log("Inorder:", this.inOrder().join(" -> "));
    console.log("Preorder:", this.preOrder().join(" -> "));
    console.log("Postorder:", this.postOrder().join(" -> "));
  }

  // 3. Conversor para el formato de 'react-d3-tree' { name: 'val', children: [] }
  toD3Tree(node = this.root) {
    if (!node) return null;

    const children = [];
    if (node.left) children.push(this.toD3Tree(node.left));
    if (node.right) children.push(this.toD3Tree(node.right));

    return {
      name: String(node.value),
      children: children.length > 0 ? children : undefined
    };
  }
}