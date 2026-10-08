class SongNode {
  constructor(song) {
    this.value = song; // { id, title, artist }
    this.next = null;
  }
}

export class SongLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  addSong(song) {
    const newNode = new SongNode(song);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  getCurrentSong() {
    return this.current ? this.current.value : null;
  }

  nextSong() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  restart() {
    this.current = this.head;
    return this.current ? this.current.value : null;
  }

  toArray() {
    const songs = [];
    let temp = this.head;
    while (temp) {
      songs.push(temp.value);
      temp = temp.next;
    }
    return songs;
  }
}