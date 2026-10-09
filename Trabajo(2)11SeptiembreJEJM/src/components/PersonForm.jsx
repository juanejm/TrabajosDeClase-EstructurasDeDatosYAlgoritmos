import { useState } from 'react';

// Genera una hora de llegada aleatoria dentro de la última hora
const getRandomArrivalDate = () => {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 50);
  return new Date(now.getTime() - randomMinutes * 60000);
};

export function PersonForm({ onEnqueue }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      alert('¡Pilas! Debes ingresar el nombre y el monto a retirar.');
      return;
    }

    const newPerson = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      arrivalDate: getRandomArrivalDate()
    };

    onEnqueue(newPerson);
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={tagStyle}>BANCO COLOMBIA 🇨🇴</div>
      <h3 style={{ margin: '10px 0 15px 0', fontSize: '1.4em', color: '#00F5d4' }}>
        ➕ Solicitar Turno en Cajero
      </h3>

      <div style={fieldStyle}>
        <label style={labelStyle}>Nombre del usuario / cliente:</label>
        <input
          type="text"
          placeholder="Ej: Brayan Stiven, Doña Rosa, Pepito"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Monto a retirar (COP $):</label>
        <input
          type="number"
          step="10000"
          placeholder="Ej: 100000 (Mín: $20.000, Máx: $2.000.000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
      </div>

      <p style={{ fontSize: '0.8em', color: '#888', margin: '0' }}>
        * La hora exacta de llegada es registrada por el sistema del cajero.
      </p>

      <button type="submit" style={buttonStyle}>
        Ponerse en la Fila (Enqueue) 🎟️
      </button>
    </form>
  );
}

// ESTILOS NEO-BRUTALISTAS / FINTECH
const formStyle = {
  background: '#12131C',
  padding: '25px',
  borderRadius: '20px',
  border: '2px solid #00F5D4',
  boxShadow: '6px 6px 0px #00F5D4',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const tagStyle = {
  background: '#FFE600',
  color: '#000',
  fontWeight: '900',
  fontSize: '0.75em',
  padding: '4px 10px',
  borderRadius: '6px',
  width: 'fit-content',
  letterSpacing: '1px'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontSize: '0.9em',
  fontWeight: '600',
  color: '#E2E8F0'
};

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '10px',
  border: '2px solid #2D3748',
  background: '#1A202C',
  color: '#FFF',
  fontSize: '1em',
  outline: 'none',
  fontWeight: '500'
};

const buttonStyle = {
  marginTop: '10px',
  padding: '14px',
  background: '#00F5D4',
  color: '#000',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '800',
  fontSize: '1em',
  cursor: 'pointer',
  transition: 'transform 0.1s ease',
  boxShadow: '3px 3px 0px #FFF'
};