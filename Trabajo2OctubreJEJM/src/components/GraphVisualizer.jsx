import { useState, useEffect, useRef } from 'react';
import { Compass, ZoomIn, ZoomOut, RefreshCw, Move } from 'lucide-react';

export function GraphVisualizer({ graphData, onSelectNode }) {
  const [nodes, setNodes] = useState([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });
  const draggingNodeRef = useRef(null);
  const containerRef = useRef(null);

  // Inicializar y simular física de fuerzas (Force-Directed Graph)
  useEffect(() => {
    if (!graphData || !graphData.nodes.length) return;

    const centerX = 340;
    const centerY = 260;
    const radius = 160;

    // Asignar posiciones iniciales ordenadas
    let initialNodes = graphData.nodes.map((node, index) => {
      const angle = (index / graphData.nodes.length) * 2 * Math.PI;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        vx: 0,
        vy: 0
      };
    });

    // Pequeña simulación de reposicionamiento por fuerzas de repulsión y atracción
    for (let iter = 0; iter < 100; iter++) {
      // Repulsión entre nodos
      for (let i = 0; i < initialNodes.length; i++) {
        for (let j = i + 1; j < initialNodes.length; j++) {
          const dx = initialNodes[j].x - initialNodes[i].x;
          const dy = initialNodes[j].y - initialNodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 180) {
            const force = (180 - dist) / dist * 0.15;
            initialNodes[i].x -= dx * force;
            initialNodes[i].y -= dy * force;
            initialNodes[j].x += dx * force;
            initialNodes[j].y += dy * force;
          }
        }
      }

      // Atracción a través de las aristas (links)
      graphData.links.forEach(link => {
        const source = initialNodes.find(n => n.id === link.source);
        const target = initialNodes.find(n => n.id === link.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const desiredDist = 110;
          const force = (dist - desiredDist) * 0.05;
          source.x += (dx / dist) * force;
          source.y += (dy / dist) * force;
          target.x -= (dx / dist) * force;
          target.y -= (dy / dist) * force;
        }
      });
    }

    setNodes(initialNodes);
  }, [graphData]);

  // Manejo de Pan (Desplazar el lienzo completo)
  const handleMouseDownContainer = (e) => {
    if (draggingNodeRef.current) return;
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e) => {
    // Si se está arrastrando un nodo específico
    if (draggingNodeRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - transform.x) / transform.scale;
      const mouseY = (e.clientY - rect.top - transform.y) / transform.scale;

      setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === draggingNodeRef.current
            ? { ...node, x: mouseX, y: mouseY }
            : node
        )
      );
      return;
    }

    // Si se está desplazando el lienzo completo (Pan)
    if (isPanning) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - startPanRef.current.x,
        y: e.clientY - startPanRef.current.y
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    draggingNodeRef.current = null;
  };

  // Manejo de Zoom con la rueda del ratón
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(0.4, prev.scale * zoomFactor), 3)
    }));
  };

  // Controles de zoom y reseteo de cámara
  const handleZoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale * 1.2) }));
  const handleZoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(0.4, prev.scale * 0.8) }));
  const handleResetView = () => setTransform({ x: 0, y: 0, scale: 1 });

  return (
    <div style={canvasContainer}>
      {/* CABECERA VINTAGE Y CONTROLES */}
      <div style={vintageHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B263E', fontWeight: 'bold' }}>
          <Compass size={18} />
          <span>MAPA DE CONEXIONES CARTOGRÁFICAS</span>
        </div>

        {/* CONTROLES DE CAMARA Y ZOOM */}
        <div style={controlsRow}>
          <button onClick={handleZoomIn} style={ctrlBtn} title="Acercar (Zoom In)"><ZoomIn size={16} /></button>
          <button onClick={handleZoomOut} style={ctrlBtn} title="Alejar (Zoom Out)"><ZoomOut size={16} /></button>
          <button onClick={handleResetView} style={ctrlBtn} title="Centrar Mapa"><RefreshCw size={16} /></button>
        </div>
      </div>

      <div style={{ padding: '6px 12px', background: '#EADFC9', borderBottom: '1px solid #C8B28B', fontSize: '0.78em', color: '#5C4A38', display: 'flex', justifyContent: 'space-between' }}>
        <span>🖱️ Arrastra fondo para mover | Clic sostenido en nodo para reubicar</span>
        <span>Escala: {Math.round(transform.scale * 100)}%</span>
      </div>

      {/* LIENZO SVG */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDownContainer}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          width: '100%',
          height: '460px',
          cursor: isPanning ? 'grabbing' : 'grab',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
            
            {/* ARISTAS DE CONEXIÓN */}
            {graphData.links.map((link, i) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={i}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#C8B28B"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />
              );
            })}

            {/* NODOS (PERSONAS Y CIUDADES) */}
            {nodes.map((node) => {
              const isCity = node.type === 'city';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    draggingNodeRef.current = node.id;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Sombra / Aura */}
                  <circle
                    r={isCity ? 26 : 19}
                    fill="rgba(0,0,0,0.08)"
                    transform="translate(2, 3)"
                  />

                  {/* Círculo Principal del Nodo */}
                  <circle
                    r={isCity ? 24 : 17}
                    fill={isCity ? '#8B263E' : '#2A4D69'}
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                  />

                  {/* Icono diferenciador interno */}
                  <text
                    y="4"
                    textAnchor="middle"
                    fill="#FFF"
                    fontSize={isCity ? '14' : '11'}
                  >
                    {isCity ? '🏙️' : '👤'}
                  </text>

                  {/* Etiqueta del Nombre */}
                  <text
                    y={isCity ? 40 : 32}
                    textAnchor="middle"
                    fill="#2C221E"
                    fontSize="12"
                    fontFamily="Georgia, serif"
                    fontWeight="bold"
                    style={{ userSelect: 'none' }}
                  >
                    {node.label || node.name}
                  </text>
                </g>
              );
            })}

          </g>
        </svg>
      </div>
    </div>
  );
}

const canvasContainer = {
  background: '#F5EFE0',
  borderRadius: '8px',
  border: '3px double #8B263E',
  boxShadow: 'inset 0 0 30px rgba(139, 38, 62, 0.08), 5px 5px 15px rgba(0,0,0,0.08)',
  position: 'relative',
  overflow: 'hidden'
};

const vintageHeader = {
  background: '#EADFC9',
  padding: '10px 16px',
  borderBottom: '1px solid #C8B28B',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Georgia, serif'
};

const controlsRow = {
  display: 'flex',
  gap: '6px'
};

const ctrlBtn = {
  background: '#F5EFE0',
  border: '1px solid #8B263E',
  color: '#8B263E',
  padding: '5px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};