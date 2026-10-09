class PersonNode {
  constructor(person) {
    this.value = person; // { id, name, amount, arrivalDate }
    this.next = null;
  }
}

export class ATMQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // Enqueue: Agregar una persona al final de la cola (FIFO)
  enqueue(person) {
    const newNode = new PersonNode(person);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  // Dequeue: Atender/Eliminar a la primera persona al frente
  dequeue() {
    if (!this.front) return null;
    const dequeuedNode = this.front;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.size--;
    return dequeuedNode.value;
  }

  // Ver a la persona al frente sin atenderla
  peek() {
    return this.front ? this.front.value : null;
  }

  // Convertir la cola a un arreglo ordenado por fecha de llegada
  toArray() {
    const people = [];
    let current = this.front;
    while (current) {
      people.push(current.value);
      current = current.next;
    }
    // Garantizamos que se ordene explícitamente por la fecha/hora de llegada
    return people.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
  }
}