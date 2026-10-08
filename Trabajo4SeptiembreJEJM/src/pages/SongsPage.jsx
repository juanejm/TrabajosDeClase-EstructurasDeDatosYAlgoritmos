import { useState } from 'react';
import { SongLinkedList } from '../structures/LinkedList';

const mockSongs = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen' },
  { id: 2, title: 'Hotel California', artist: 'Eagles' },
  { id: 3, title: 'Billie Jean', artist: 'Michael Jackson' },
  { id: 4, title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
  { id: 5, title: 'Stairway to Heaven', artist: 'Led Zeppelin' }
];

const playlist = new SongLinkedList();
mockSongs.forEach(song => playlist.addSong(song));

export function SongsPage() {
  const [currentSong, setCurrentSong] = useState(playlist.getCurrentSong());

  const handleNext = () => {
    const next = playlist.nextSong();
    if (next) setCurrentSong(next);
  };

  const handleRestart = () => {
    const first = playlist.restart();
    setCurrentSong(first);
  };

  // ESTILOS EN LÍNEA (MODERNO)
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
    alignItems: 'start'
  };

  const playerCardStyle = {
    background: '#242424', // Un gris ligeramente más claro
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    textAlign: 'center',
    border: '1px solid #333'
  };

  const listCardStyle = {
    background: '#242424',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #333'
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        🎵 Reproductor de Música <span style={{fontSize: '0.6em', color: '#888'}}>(Lista Enlazada Simple)</span>
      </h2>
      
      <div style={containerStyle}>
        
        {/* PANEL DEL REPRODUCTOR */}
        <div style={playerCardStyle}>
          <div style={{ fontSize: '100px', marginBottom: '10px' }}>💿</div>
          <p style={{ color: '#aaa', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 10px 0' }}>
            Reproduciendo ahora
          </p>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em', fontWeight: '800' }}>
            {currentSong?.title}
          </h1>
          <p style={{ color: '#646cff', fontSize: '1.4em', fontWeight: '500', margin: '0 0 30px 0' }}>
            {currentSong?.artist}
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={handleNext} 
              disabled={!playlist.current?.next}
              style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              Siguiente <span style={{ fontSize: '1.2em' }}>⏭</span>
            </button>
            <button 
              onClick={handleRestart}
              style={{ padding: '15px 25px', backgroundColor: 'transparent', border: '1px solid #444' }}
            >
              Reiniciar Lista <span style={{ fontSize: '1.2em' }}>🔄</span>
            </button>
          </div>
        </div>

        {/* PANEL DE LA LISTA COMPLETAR */}
        <div style={listCardStyle}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.3em', color: '#fff' }}>Siguientes en la lista:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {playlist.toArray().map((song, index) => {
              const isCurrent = song.id === currentSong?.id;
              return (
                <li 
                  key={song.id} 
                  style={{ 
                    padding: '12px 15px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: isCurrent ? 'rgba(100, 108, 255, 0.1)' : 'transparent',
                    border: isCurrent ? '1px solid #646cff' : '1px solid transparent',
                    color: isCurrent ? '#fff' : '#ccc',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <span style={{fontWeight: '600'}}>{index + 1}. {song.title}</span><br/>
                    <span style={{fontSize: '0.85em', color: isCurrent ? '#aaa' : '#888'}}>{song.artist}</span>
                  </div>
                  {isCurrent && <span style={{ fontSize: '1.3em' }}>🎧</span>}
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}