class BookNode {
  constructor(book) {
    this.value = book; // { id, name, isbn, author, editorial }
    this.next = null;
  }
}

export class BookStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  // Operación Push: Agregar un libro en la cima de la pila
  push(book) {
    const newNode = new BookNode(book);
    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
  }

  // Operación Pop: Eliminar y retornar el libro en la cima
  pop() {
    if (!this.top) return null;
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.value;
  }

  // Consultar el libro superior sin eliminarlo
  peek() {
    return this.top ? this.top.value : null;
  }

  // Convertir la pila a un arreglo para renderizado
  toArray() {
    const books = [];
    let current = this.top;
    while (current) {
      books.push(current.value);
      current = current.next;
    }
    return books;
  }
}