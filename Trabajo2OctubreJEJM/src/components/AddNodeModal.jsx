import { useState } from 'react';

export function AddNodeModal({ cities, onClose, onAddPerson, onAddCity }) {
  const [tab, setTab] = useState('person'); // 'person' | 'city'
  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    if (!personName || !personAge || !cityId) return;

    onAddPerson({
      id: `p_${Date.now()}`,
      label: personName,
      type: 'person',
      age: parseInt(personAge, 10),
      cityId
    });
    onClose();
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (!cityName) return;

    onAddCity({
      id: `c_${Date.now()}`,
      label: cityName,
      type: 'city'
    });
    onClose();
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #C8B28B', paddingBottom: '10px' }}>
          <button 
            onClick={() => setTab('person')} 
            style={tabBtn(tab === 'person')}
          >
            👤 Nueva Persona
          </button>
          <button 
            onClick={() => setTab('city')} 
            style={tabBtn(tab === 'city')}
          >
            🏙️ Nueva Ciudad
          </button>
        </div>

        {tab === 'person' ? (
          <form onSubmit={handlePersonSubmit} style={formStyle}>
            <h3 style={formTitle}>Registrar Ciudadano</h3>
            <div>
              <label style={labelStyle}>Nombre Completo:</label>
              <input 
                type="text" 
                value={personName} 
                onChange={e => setPersonName(e.target.value)} 
                placeholder="Ej: Gabriel García" 
                style={inputStyle} 
                required 
              />
            </div>
            <div>
              <label style={labelStyle}>Edad:</label>
              <input 
                type="number" 
                value={personAge} 
                onChange={e => setPersonAge(e.target.value)} 
                placeholder="Ej: 34" 
                style={inputStyle} 
                required 
              />
            </div>
            <div>
              <label style={labelStyle}>Ciudad de Residencia:</label>
              <select value={cityId} onChange={e => setCityId(e.target.value)} style={inputStyle} required>
                <option value="">-- Seleccionar --</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div style={btnRow}>
              <button type="button" onClick={onClose} style={btnCancel}>Cancelar</button>
              <button type="submit" style={btnSubmit}>Añadir al Grafo</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCitySubmit} style={formStyle}>
            <h3 style={formTitle}>Registrar Ciudad / Villa</h3>
            <div>
              <label style={labelStyle}>Nombre de la Ciudad:</label>
              <input 
                type="text" 
                value={cityName} 
                onChange={e => setCityName(e.target.value)} 
                placeholder="Ej: Cartagena de Indias" 
                style={inputStyle} 
                required 
              />
            </div>
            <div style={btnRow}>
              <button type="button" onClick={onClose} style={btnCancel}>Cancelar</button>
              <button type="submit" style={btnSubmit}>Añadir al Grafo</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(44, 34, 30, 0.6)',
  backdropFilter: 'blur(3px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  background: '#FBF7EE',
  padding: '28px',
  borderRadius: '8px',
  border: '2px solid #8B263E',
  width: '400px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  fontFamily: 'Georgia, serif'
};

const tabBtn = (active) => ({
  flex: 1,
  padding: '8px',
  border: 'none',
  background: active ? '#8B263E' : 'transparent',
  color: active ? '#FFF' : '#8B263E',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Georgia, serif'
});

const formStyle = { display: 'flex', flexDirection: 'column', gap: '14px' };
const formTitle = { margin: 0, color: '#8B263E', fontSize: '1.1em' };
const labelStyle = { fontSize: '0.85em', color: '#5C4A38', fontWeight: 'bold', display: 'block', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #C8B28B', background: '#F5EFE0', outline: 'none', boxSizing: 'border-box' };
const btnRow = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' };
const btnCancel = { background: '#EADFC9', border: '1px solid #C8B28B', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', color: '#5C4A38' };
const btnSubmit = { background: '#8B263E', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', color: '#FFF', fontWeight: 'bold' };