import { useState } from 'react';
import { BrowserDoublyLinkedList } from '../structures/DoublyLinkedList';

const mockPages = [
  { id: 1, title: 'Google Search', url: 'https://google.com' },
  { id: 2, title: 'Mi Perfil de GitHub', url: 'https://github.com/tu-usuario' },
  { id: 3, title: 'Stack Overflow Q&A', url: 'https://stackoverflow.com' },
  { id: 4, title: 'React Documentation', url: 'https://react.dev' },
  { id: 5, title: 'Vite Build Tool', url: 'https://vitejs.dev' }
];

const browserHistory = new BrowserDoublyLinkedList();
mockPages.forEach(page => browserHistory.addPage(page));

export function BrowserPage() {
  const [currentPage, setCurrentPage] = useState(browserHistory.getCurrentPage());

  const handleBack = () => {
    const prev = browserHistory.goBack();
    if (prev) setCurrentPage(prev);
  };

  const handleForward = () => {
    const next = browserHistory.goForward();
    if (next) setCurrentPage(next);
  };

  // ESTILOS EN LÍNEA (MODERNO)
  const browserCardStyle = {
    background: '#242424',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    border: '1px solid #333'
  };

  const urlBarContainerStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    background: '#111',
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid #444',
    marginBottom: '20px'
  };

  const navButtonsStyle = {
    display: 'flex',
    gap: '10px'
  };

  const circularButtonStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4em',
    backgroundColor: '#333'
  };

  return (
    <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        🌐 Historial de Navegador <span style={{fontSize: '0.6em', color: '#888'}}>(Lista Doblemente Enlazada)</span>
      </h2>

      <div style={browserCardStyle}>
        
        {/* BARRA DE NAVEGACIÓN SIMULADA */}
        <div style={urlBarContainerStyle}>
          
          <div style={navButtonsStyle}>
            <button 
              onClick={handleBack} 
              disabled={!browserHistory.hasPrev()}
              style={{...circularButtonStyle}}
              title="Volver"
            >
              ←
            </button>
            <button 
              onClick={handleForward} 
              disabled={!browserHistory.hasNext()}
              style={{...circularButtonStyle}}
              title="Adelante"
            >
              →
            </button>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#555' }}>🔒</span>
            <div style={{
              background: '#000',
              color: '#00ccff', // Color cian para la URL
              padding: '12px 15px 12px 45px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1.1em',
              border: '1px solid #333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentPage?.url}
            </div>
          </div>
        </div>

        {/* CONTENIDO DE LA "PÁGINA" */}
        <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center' }}>
          <div style={{fontSize: '50px', marginBottom: '15px'}}>📄</div>
          <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '1px', margin: '0 0 10px 0' }}>
            Título de la página cargada
          </p>
          <h1 style={{ margin: 0, fontSize: '2.2em', fontWeight: '700', color: '#fff' }}>
            {currentPage?.title}
          </h1>
        </div>

      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', color: '#666', fontSize: '0.9em' }}>
        <strong>Lógica:</strong> El historial funciona usando punteros 'next' y 'prev'. Si añades nuevas páginas (aunque aquí usamos mock data fijo), al ir 'atrás' y añadir una nueva, se sobrescribe el historial 'adelante', igual que un navegador real.
      </div>
    </div>
  );
}