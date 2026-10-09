export class Graph {
  constructor() {
    this.nodes = new Map(); // id -> { id, label, type, age, cityId }
    this.adjacencyList = new Map(); // id -> Set(neighborIds)
  }

  // Agregar Nodo (Persona o Ciudad)
  addNode(node) {
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, node);
      this.adjacencyList.set(node.id, new Set());
    }
  }

  // Agregar Arista / Conexión no dirigida
  addEdge(node1Id, node2Id) {
    if (this.nodes.has(node1Id) && this.nodes.has(node2Id)) {
      this.adjacencyList.get(node1Id).add(node2Id);
      this.adjacencyList.get(node2Id).add(node1Id);
    }
  }

  // Obtener personas que viven en una ciudad especifica
  getPeopleInCity(cityId) {
    const people = [];
    for (const node of this.nodes.values()) {
      if (node.type === 'person' && node.cityId === cityId) {
        people.push(node);
      }
    }
    return people;
  }

  // Formateador para la librería react-d3-graph
  toD3Graph() {
    const nodes = [];
    const links = [];

    for (const node of this.nodes.values()) {
      nodes.push({
        id: node.id,
        name: node.label,
        type: node.type,
        color: node.type === 'city' ? '#8B263E' : '#2A4D69', // Sepia Burdeos para Ciudad, Azul Antiguo para Persona
        size: node.type === 'city' ? 450 : 300,
        strokeColor: '#D4AF37',
        strokeWidth: 2
      });
    }

    const addedLinks = new Set();
    for (const [source, neighbors] of this.adjacencyList.entries()) {
      for (const target of neighbors) {
        const linkKey = [source, target].sort().join('-');
        if (!addedLinks.has(linkKey)) {
          addedLinks.add(linkKey);
          links.push({ source, target, color: '#C8B28B' });
        }
      }
    }

    return { nodes, links };
  }
}