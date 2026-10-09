import { MapPin, Users, User } from 'lucide-react';

export function CityFilterPanel({ cities, selectedCityId, onSelectCity, residents }) {
  return (
    <div style={panelContainer}>
      <h3 style={titleStyle}>
        <MapPin size={20} color="#8B263E" /> Directorio de Ciudades
      </h3>

      {/* Selector de Ciudad */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Seleccionar Comarca / Ciudad:</label>
        <select 
          value={selectedCityId || ''} 
          onChange={(e) => onSelectCity(e.target.value)}
          style={selectStyle}
        >
          <option value="">-- Todas las Ciudades --</option>
          {cities.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Lista de Residentes Registrados */}
      <div style={{ flex: 1 }}>
        <h4 style={subTitleStyle}>
          <Users size={16} color="#2A4D69" /> Habitantes Registrados
        </h4>

        {residents.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#7A6A53', fontSize: '0.9em' }}>
            {selectedCityId ? 'No hay habitantes registrados en esta ciudad.' : 'Selecciona una ciudad para consultar sus habitantes.'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
            {residents.map(p => (
              <div key={p.id} style={personCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={18} color="#2A4D69" />
                  <div>
                    <strong style={{ color: '#2C221E', fontSize: '0.95em' }}>{p.label}</strong>
                    <span style={{ display: 'block', fontSize: '0.8em', color: '#7A6A53' }}>Edad: {p.age} años</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const panelContainer = {
  background: '#FBF7EE',
  padding: '24px',
  borderRadius: '8px',
  border: '2px solid #8B263E',
  boxShadow: '4px 4px 12px rgba(0,0,0,0.05)',
  fontFamily: 'Georgia, serif',
  display: 'flex',
  flexDirection: 'column'
};

const titleStyle = {
  margin: '0 0 16px 0',
  color: '#8B263E',
  fontSize: '1.2em',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderBottom: '1px solid #C8B28B',
  paddingBottom: '8px'
};

const subTitleStyle = {
  margin: '0 0 12px 0',
  color: '#2A4D69',
  fontSize: '1em',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85em',
  color: '#5C4A38',
  marginBottom: '6px',
  fontWeight: 'bold'
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #C8B28B',
  background: '#F5EFE0',
  color: '#2C221E',
  fontFamily: 'Georgia, serif',
  fontSize: '0.95em',
  outline: 'none'
};

const personCard = {
  background: '#F5EFE0',
  padding: '10px 14px',
  borderRadius: '6px',
  border: '1px solid #D8CBB5'
};