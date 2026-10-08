class PageNode {
  constructor(page) {
    this.value = page; // { id, title, url }
    this.next = null;
    this.prev = null;
  }
}

export class BrowserDoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  addPage(page) {
    const newNode = new PageNode(page);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.current = newNode;
    }
  }

  getCurrentPage() {
    return this.current ? this.current.value : null;
  }

  goBack() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.value;
    }
    return null;
  }

  goForward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  hasPrev() {
    return Boolean(this.current && this.current.prev);
  }

  hasNext() {
    return Boolean(this.current && this.current.next);
  }
}