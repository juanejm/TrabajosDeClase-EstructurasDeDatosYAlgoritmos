// Nodo de un Árbol N-ario (posee un arreglo de hijos)
export class NAryTreeNode {
  constructor({ id, title, path, icon, componentName, children = [] }) {
    this.id = id || String(Date.now() + Math.random());
    this.title = title;             // Título del menú
    this.path = path;               // Link/Ruta
    this.icon = icon || 'Folder';
    this.componentName = componentName || 'DefaultView'; // Componente asociado
    this.children = children.map(child => new NAryTreeNode(child));
  }

  // Método para agregar un submenú (hijo)
  addChild(childData) {
    const childNode = new NAryTreeNode(childData);
    this.children.push(childNode);
    return childNode;
  }
}

export class NAryTree {
  constructor(rootData) {
    this.root = new NAryTreeNode(rootData);
  }

  // Búsqueda en el árbol N-ario por ID (búsqueda en profundidad / DFS)
  findNodeById(id, current = this.root) {
    if (current.id === id) return current;
    for (const child of current.children) {
      const found = this.findNodeById(id, child);
      if (found) return found;
    }
    return null;
  }

  // Insertar un nuevo menú/submenú en un nodo padre específico
  insert(parentId, nodeData) {
    const parent = this.findNodeById(parentId);
    if (parent) {
      return parent.addChild(nodeData);
    }
    return null;
  }

  // Obtener lista plana de todos los nodos (para el buscador)
  getAllNodes(current = this.root, list = []) {
    if (current.id !== 'root') {
      list.push(current);
    }
    for (const child of current.children) {
      this.getAllNodes(child, list);
    }
    return list;
  }
}