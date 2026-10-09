export function TraversalPanel({ inOrder, preOrder, postOrder }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ margin: '0 0 15px 0', color: '#38BDF8', fontSize: '1.2em' }}>
        📊 Recorridos e Impresión en Consola
      </h3>

      <div style={traversalBoxStyle}>
        <div style={tagStyle('#38BDF8')}>INORDER (Izq - Raíz - Der)</div>
        <div style={valuesStyle}>{inOrder.length ? inOrder.join(' ➔ ') : 'Vacio'}</div>
      </div>

      <div style={traversalBoxStyle}>
        <div style={tagStyle('#A855F7')}>PREORDER (Raíz - Izq - Der)</div>
        <div style={valuesStyle}>{preOrder.length ? preOrder.join(' ➔ ') : 'Vacio'}</div>
      </div>

      <div style={traversalBoxStyle}>
        <div style={tagStyle('#F43F5E')}>POSTORDER (Izq - Der - Raíz)</div>
        <div style={valuesStyle}>{postOrder.length ? postOrder.join(' ➔ ') : 'Vacio'}</div>
      </div>

      <p style={{ fontSize: '0.75em', color: '#64748B', margin: '10px 0 0 0', fontStyle: 'italic' }}>
        * Abre la consola de desarrollador (F12) para ver los logs impresos.
      </p>
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
  gap: '14px'
};

const traversalBoxStyle = {
  background: '#0F172A',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #1E293B'
};

const tagStyle = (color) => ({
  fontSize: '0.7em',
  fontWeight: '800',
  color: color,
  letterSpacing: '1px',
  marginBottom: '4px'
});

const valuesStyle = {
  fontFamily: 'monospace',
  fontSize: '1em',
  color: '#F8FAFC',
  wordBreak: 'break-all'
};