export function ATMQueueList({ queue, onDequeue }) {
  // Formateador de moneda colombiana (COP)
  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatTime = (dateObj) => {
    return new Date(dateObj).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <span style={{ fontSize: '0.8em', color: '#FFE600', fontWeight: 'bold' }}>SISTEMA FIFO</span>
          <h3 style={{ margin: '2px 0 0 0', color: '#FFF', fontSize: '1.4em' }}>🏧 Estado de la Fila</h3>
        </div>

        <button 
          onClick={onDequeue} 
          disabled={queue.length === 0}
          style={dequeueButtonStyle(queue.length === 0)}
        >
          Atender Siguiente 💵
        </button>
      </div>

      {queue.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', color: '#718096' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🟢</div>
          <p style={{ margin: 0, fontWeight: '600' }}>Cajero disponible. No hay nadie en la fila.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {queue.map((person, index) => {
            const isFirst = index === 0;
            return (
              <div 
                key={person.id} 
                style={{
                  ...cardStyle,
                  border: isFirst ? '2px solid #FFE600' : '2px solid #2D3748',
                  background: isFirst ? '#1E2310' : '#171923',
                  boxShadow: isFirst ? '4px 4px 0px #FFE600' : 'none'
                }}
              >
                <div style={badgeStyle(isFirst)}>
                  {isFirst ? 'EN EL CAJERO 🏧' : `Fila #${index + 1}`}
                </div>

                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2em', color: '#FFF' }}>
                  👤 {person.name}
                </h4>

                <div style={infoGridStyle}>
                  <div>
                    <span style={{ fontSize: '0.75em', color: '#A0AEC0' }}>MONTO RETIRO</span><br/>
                    <strong style={{ color: '#00F5D4', fontSize: '1.1em' }}>{formatCOP(person.amount)}</strong>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75em', color: '#A0AEC0' }}>LLEGADA REGISTRADA</span><br/>
                    <strong style={{ color: '#FFF', fontSize: '0.95em' }}>🕒 {formatTime(person.arrivalDate)}</strong>
                  </div>
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
  background: '#12131C',
  padding: '25px',
  borderRadius: '20px',
  border: '2px solid #2D3748'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  borderBottom: '2px solid #2D3748',
  paddingBottom: '15px'
};

const dequeueButtonStyle = (disabled) => ({
  background: disabled ? '#2D3748' : '#FFE600',
  color: '#000',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '10px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: '800',
  fontSize: '0.95em',
  boxShadow: disabled ? 'none' : '3px 3px 0px #FFF'
});

const cardStyle = {
  padding: '16px 20px',
  borderRadius: '14px',
  position: 'relative',
  transition: 'all 0.2s ease'
};

const badgeStyle = (isFirst) => ({
  position: 'absolute',
  top: '14px',
  right: '16px',
  background: isFirst ? '#FFE600' : '#2D3748',
  color: isFirst ? '#000' : '#FFF',
  fontSize: '0.7em',
  fontWeight: '900',
  padding: '4px 8px',
  borderRadius: '6px',
  letterSpacing: '0.5px'
});

const infoGridStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: '12px',
  paddingTop: '10px',
  borderTop: '1px solid rgba(255,255,255,0.08)'
};