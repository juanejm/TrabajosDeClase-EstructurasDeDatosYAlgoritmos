import { useState } from 'react';

export function BookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    name: '',
    isbn: '',
    author: '',
    editorial: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.isbn || !formData.author || !formData.editorial) {
      alert('Por favor completa todos los campos');
      return;
    }

    onAddBook({
      id: Date.now(),
      ...formData
    });

    setFormData({ name: '', isbn: '', author: '', editorial: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ marginTop: 0, color: '#646cff' }}>➕ Agregar Libro al sistema</h3>
      
      <div style={fieldGroupStyle}>
        <label>Título del libro:</label>
        <input
          type="text"
          name="name"
          placeholder="Ej: Cien Años de Soledad"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          placeholder="Ej: 978-0307474728"
          value={formData.isbn}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label>Autor:</label>
        <input
          type="text"
          name="author"
          placeholder="Ej: Gabriel García Márquez"
          value={formData.author}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={fieldGroupStyle}>
        <label>Editorial:</label>
        <input
          type="text"
          name="editorial"
          placeholder="Ej: Editorial Sudamericana"
          value={formData.editorial}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Ingresar a sistema 📚
      </button>
    </form>
  );
}

const formStyle = {
  background: '#242424',
  padding: '25px',
  borderRadius: '16px',
  border: '1px solid #333',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  fontSize: '0.9em',
  color: '#ccc'
};

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #444',
  background: '#111',
  color: '#fff',
  fontSize: '1em'
};

const buttonStyle = {
  marginTop: '10px',
  padding: '12px',
  background: '#646cff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer'
};