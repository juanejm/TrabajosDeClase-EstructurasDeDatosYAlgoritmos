import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { SongsPage } from './pages/SongsPage';
import { BrowserPage } from './pages/BrowserPage';

// Componente auxiliar para estilos de enlaces activos
const NavLink = ({ to, children, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const linkStyle = {
    color: isActive ? '#fff' : '#aaa',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '400',
    fontSize: '1.1em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#333' : 'transparent',
    transition: 'background-color 0.3s'
  };

  return (
    <Link to={to} style={linkStyle}>
      <span style={{ fontSize: '1.3em' }}>{icon}</span>
      {children}
    </Link>
  );
};

export default function App() {
  const headerStyle = {
    padding: '15px 30px',
    background: '#111', // Un poco más oscuro que el fondo principal
    borderBottom: '1px solid #333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  return (
    <BrowserRouter>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '1.5em', color: '#fff' }}>Reproductor</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <NavLink to="/" icon="🎵">Reproductor de Sonidos</NavLink>
          <NavLink to="/browser" icon="🌐">Historial</NavLink>
        </nav>
      </header>

      <main style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<SongsPage />} />
            <Route path="/browser" element={<BrowserPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}