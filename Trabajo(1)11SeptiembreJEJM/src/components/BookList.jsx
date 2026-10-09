export function BookList({ books, onPop }) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0, color: '#fff' }}>📚 Pila de Libros (Stack)</h3>
        <button 
          onClick={onPop} 
          disabled={books.length === 0}
          style={popButtonStyle}
        >
          Sacar Cima (Pop) 📤
        </button>
      </div>

      {books.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>
          La pila está vacía. ¡Agrega algunos libros!
        </p>
      ) : (
        <div style={stackContainerStyle}>
          {books.map((book, index) => {
            const isTop = index === 0;
            return (
              <div 
                key={book.id} 
                style={{
                  ...bookCardStyle,
                  borderColor: isTop ? '#646cff' : '#333',
                  background: isTop ? 'rgba(100, 108, 255, 0.12)' : '#1a1a1a'
                }}
              >
                <div style={badgeStyle(isTop)}>
                  {isTop ? 'TOP (CIMA)' : `Nivel ${books.length - index}`}
                </div>

                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2em', color: '#fff' }}>
                  📖 {book.name}
                </h4>
                
                <div style={{ fontSize: '0.9em', color: '#aaa', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <p style={{ margin: 0 }}><strong>Autor:</strong> {book.author}</p>
                  <p style={{ margin: 0 }}><strong>Editorial:</strong> {book.editorial}</p>
                  <p style={{ margin: 0, gridColumn: 'span 2' }}><strong>ISBN:</strong> <code style={{ color: '#00ccff' }}>{book.isbn}</code></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  background: '#242424',
  padding: '25px',
  borderRadius: '16px',
  border: '1px solid #333'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  borderBottom: '1px solid #333',
  paddingBottom: '15px'
};

const popButtonStyle = {
  background: '#e63946',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

const stackContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const bookCardStyle = {
  padding: '15px 20px',
  borderRadius: '12px',
  border: '1px solid #333',
  position: 'relative',
  transition: 'all 0.3s ease'
};

const badgeStyle = (isTop) => ({
  position: 'absolute',
  top: '12px',
  right: '15px',
  background: isTop ? '#646cff' : '#333',
  color: '#fff',
  fontSize: '0.75em',
  fontWeight: 'bold',
  padding: '3px 8px',
  borderRadius: '6px'
});