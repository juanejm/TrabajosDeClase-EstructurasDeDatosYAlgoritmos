export function NAryVisualizer({ node, level = 0 }) {
  if (!node) return null;

  return (
    <div style={{ marginLeft: level * 20 + 'px', marginTop: '6px' }}>
      <div style={nodeBoxStyle(level)}>
        <span style={badgeStyle}>Nodo N-ario</span>
        <strong style={{ color: '#0F172A' }}>{node.title}</strong>
        <span style={{ fontSize: '0.8em', color: '#64748B' }}>({node.path})</span>
        <span style={{ fontSize: '0.75em', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '12px' }}>
          Hijos: {node.children.length}
        </span>
      </div>

      {node.children.map(child => (
        <NAryVisualizer key={child.id} node={child} level={level + 1} />
      ))}
    </div>
  );
}

const nodeBoxStyle = (level) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 14px',
  borderRadius: '10px',
  background: level === 0 ? '#F8FAFC' : '#FFFFFF',
  border: '1px solid #E2E8F0',
  fontSize: '0.85em'
});

const badgeStyle = {
  background: '#E2E8F0',
  color: '#475569',
  fontSize: '0.7em',
  fontWeight: '800',
  padding: '2px 6px',
  borderRadius: '4px'
};