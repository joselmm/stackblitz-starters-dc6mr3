class Queue {
  constructor() {
    this.items = [];
  }

  // Añadir un elemento al final de la lista
  enqueue(element) {
    this.items.push(element);
  }

  // Eliminar el primer elemento de la lista
  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }

  // Devuelve el primer elemento de la lista sin eliminarlo
  peek() {
    if (this.isEmpty()) {
      return 'No elements in Queue';
    }
    return this.items[0];
  }

  // Devuelve true si la lista está vacía, false en caso contrario
  isEmpty() {
    return this.items.length == 0;
  }

  // Devuelve el tamaño de la lista
  size() {
    return this.items.length;
  }

  // Devuelve una representación en cadena de la lista
  toString() {
    var str = '';
    for (var i = 0; i < this.items.length; i++) {
      str += this.items[i] + ' ';
    }
    return str;
  }
}

export default Queue;
