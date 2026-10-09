import { useState } from 'react';
import { ATMQueue } from './structures/ATMQueue';
import { PersonForm } from './components/PersonForm';
import { ATMQueueList } from './components/ATMQueueList';

// Mock Data con personajes y montos en COP
const now = new Date();
const mockPeople = [
  { id: 1, name: 'Don Chucho (Tienda)', amount: 600000, arrivalDate: new Date(now.getTime() - 35 * 60000) },
  { id: 2, name: 'Valentina Ríos', amount: 150000, arrivalDate: new Date(now.getTime() - 20 * 60000) },
  { id: 3, name: 'Andrés Camilo', amount: 50000, arrivalDate: new Date(now.getTime() - 8 * 60000) }
];

const atmQueueInstance = new ATMQueue();
mockPeople.forEach(p => atmQueueInstance.enqueue(p));

export default function App() {
  const [queue, setQueue] = useState(atmQueueInstance.toArray());

  const handleEnqueue = (person) => {
    atmQueueInstance.enqueue(person);
    setQueue(atmQueueInstance.toArray());
  };

  const handleDequeue = () => {
    atmQueueInstance.dequeue();
    setQueue(atmQueueInstance.toArray());
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#FFF', padding: '40px 20px', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      
      {/* CABECERA PRINCIPAL */}
      <header style={{ maxWidth: '1100px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#00F5D4', color: '#000', fontWeight: '900', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85em', marginBottom: '10px' }}>
          CHALLENGE 05 — COLA (QUEUE)
        </div>
        <h1 style={{ fontSize: '2.8em', margin: '0 0 10px 0', fontWeight: '900', letterSpacing: '-1px' }}>
          🇨🇴 Cajero Automático Servibanca
        </h1>
        <p style={{ color: '#A0AEC0', margin: 0, fontSize: '1.1em' }}>
          Simulación FIFO (First In, First Out) de retiros en pesos colombianos (COP).
        </p>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '30px' }}>
        <PersonForm onEnqueue={handleEnqueue} />
        <ATMQueueList queue={queue} onDequeue={handleDequeue} />
      </main>
    </div>
  );
}