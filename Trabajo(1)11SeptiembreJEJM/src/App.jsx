import { useState } from 'react';
import { BookStack } from './structures/BookStack';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

// Mock Data
const initialBooks = [
  { id: 1, name: 'Don Quijote de la Mancha', isbn: '978-8424116033', author: 'Miguel de Cervantes', editorial: 'Editorial Juventud' },
  { id: 2, name: 'El Principito', isbn: '978-0156013987', author: 'Antoine de Saint-Exupéry', editorial: 'Reynal & Hitchcock' },
  { id: 3, name: '1984', isbn: '978-0451524935', author: 'George Orwell', editorial: 'Secker & Warburg' }
];

// Instancia de la pila
const stackInstance = new BookStack();
// Apilamos los datos iniciales
initialBooks.forEach(book => stackInstance.push(book));

export default function App() {
  const [books, setBooks] = useState(stackInstance.toArray());

  const handleAddBook = (newBook) => {
    stackInstance.push(newBook);
    setBooks(stackInstance.toArray());
  };

  const handlePopBook = () => {
    stackInstance.pop();
    setBooks(stackInstance.toArray());
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '1100px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5em', margin: '0 0 10px 0' }}>📚 Gestor de Libros (Pila - Stack)</h1>
        <p style={{ color: '#888', margin: 0 }}>Libros organizados</p>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
        <BookForm onAddBook={handleAddBook} />
        <BookList books={books} onPop={handlePopBook} />
      </main>
    </div>
  );
}