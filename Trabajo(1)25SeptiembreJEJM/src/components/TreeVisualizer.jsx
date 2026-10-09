import Tree from 'react-d3-tree';

export function TreeVisualizer({ treeData }) {
  if (!treeData) {
    return (
      <div style={emptyStyle}>
        <p style={{ color: '#64748B' }}>El árbol está vacío. Inserta nodos para visualizar.</p>
      </div>
    );
  }

  // Estilo personalizado para los nodos de D3
  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle r="22" fill="#8B5CF6" stroke="#C084FC" strokeWidth="3" />
      <text
        fill="#FFFFFF"
        strokeWidth="0.5"
        x="0"
        y="6"
        textAnchor="middle"
        style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'sans-serif' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: '15px', left: '20px', zIndex: 10, fontSize: '0.8em', color: '#94A3B8' }}>
        🖱️ Arrastra o usa el scroll para zoom/pan
      </div>
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 350, y: 70 }}
        renderCustomNodeElement={renderCustomNode}
        pathProps={{
          stroke: '#38BDF8',
          strokeWidth: 2
        }}
      />
    </div>
  );
}

const containerStyle = {
  width: '100%',
  height: '500px',
  background: '#090D16',
  borderRadius: '20px',
  border: '1px solid #1E293B',
  position: 'relative',
  overflow: 'hidden'
};

const emptyStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#090D16',
  borderRadius: '20px',
  border: '1px solid #1E293B'
};