import { useState } from 'react';

export function AddNodeModal({ parentNode, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !path) return;

    onAdd(parentNode.id, {
      title,
      path: path.startsWith('/') ? path : `/${path}`,
      componentName: 'DefaultView'
    });
    onClose();
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0F172A' }}>
          ➕ Agregar Submenú a: <span style={{ color: '#2563EB' }}>{parentNode.title}</span>
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.85em', marginBottom: '20px' }}>
          Insertará un nuevo nodo en el árbol N-ario como hijo de este menú.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Título del Menú:</label>
            <input 
              type="text" 
              placeholder="Ej: Facturación Electrónica"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Ruta / Link:</label>
            <input 
              type="text" 
              placeholder="Ej: /billing/electronic"
              value={path}
              onChange={e => setPath(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={btnCancel}>Cancelar</button>
            <button type="submit" style={btnSubmit}>Guardar Nodo</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(15, 23, 42, 0.4)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  background: '#FFFFFF',
  padding: '28px',
  borderRadius: '16px',
  width: '420px',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
};

const labelStyle = { fontSize: '0.85em', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95em', outline: 'none', boxSizing: 'border-box' };
const btnCancel = { background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontWeight: '600' };
const btnSubmit = { background: '#2563EB', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', color: '#FFF', fontWeight: '600' };