import { useState } from 'react';

export function TreeControls({ onInsert, onSearch, onReset, searchResult }) {
  const [insertVal, setInsertVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const handleInsertSubmit = (e) => {
    e.preventDefault();
    if (insertVal !== '') {
      onInsert(Number(insertVal));
      setInsertVal('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal !== '') {
      onSearch(Number(searchVal));
    }
  };

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>⚡ Controles del Árbol</h3>

      {/* Agregar Nodo */}
      <form onSubmit={handleInsertSubmit} style={formGroupStyle}>
        <label style={labelStyle}>Insertar Valor:</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="number"
            value={insertVal}
            onChange={(e) => setInsertVal(e.target.value)}
            placeholder="Ej: 42"
            style={inputStyle}
          />
          <button type="submit" style={btnInsertStyle}>➕ Insertar</button>
        </div>
      </form>

      {/* Buscar Nodo */}
      <form onSubmit={handleSearchSubmit} style={formGroupStyle}>
        <label style={labelStyle}>Buscar Valor:</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="number"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Ej: 15"
            style={inputStyle}
          />
          <button type="submit" style={btnSearchStyle}>🔍 Buscar</button>
        </div>
      </form>

      {/* Resultado de Búsqueda */}
      {searchResult !== null && (
        <div style={searchResultStyle(searchResult.found)}>
          {searchResult.found
            ? `✅ El valor ${searchResult.value} SÍ existe en el árbol.`
            : `❌ El valor ${searchResult.value} NO se encuentra.`}
        </div>
      )}

      {/* Acciones Rápidas */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button onClick={onReset} style={btnResetStyle}>🔄 Cargar Datos de Fabrica</button>
      </div>
    </div>
  );
}

const panelStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
};

const titleStyle = { margin: 0, color: '#A855F7', fontSize: '1.2em' };
const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '0.85em', color: '#94A3B8', fontWeight: '600' };

const inputStyle = {
  flex: 1,
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #334155',
  background: '#0F172A',
  color: '#FFF',
  outline: 'none'
};

const btnInsertStyle = {
  background: '#8B5CF6',
  color: '#FFF',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '10px',
  fontWeight: '700',
  cursor: 'pointer'
};

const btnSearchStyle = {
  background: '#06B6D4',
  color: '#000',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '10px',
  fontWeight: '700',
  cursor: 'pointer'
};

const btnResetStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid #475569',
  color: '#CBD5E1',
  padding: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};

const searchResultStyle = (found) => ({
  padding: '10px 14px',
  borderRadius: '10px',
  fontSize: '0.9em',
  fontWeight: '600',
  background: found ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
  border: found ? '1px solid #22C55E' : '1px solid #EF4444',
  color: found ? '#4ADE80' : '#F87171'
});