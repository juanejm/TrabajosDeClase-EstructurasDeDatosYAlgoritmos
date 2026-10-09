import { useState } from 'react';
import { ChevronDown, ChevronRight, PlusCircle, Folder, FileText } from 'lucide-react';

function MenuItem({ node, activeNodeId, onSelectNode, onAddChild }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.id === activeNodeId;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: '12px' }}>
      <div 
        onClick={() => onSelectNode(node)}
        style={{
          ...itemRowStyle,
          background: isActive ? '#EFF6FF' : 'transparent',
          color: isActive ? '#2563EB' : '#334155',
          fontWeight: isActive ? '700' : '500',
          borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          {hasChildren ? (
            <span onClick={handleToggle} style={{ cursor: 'pointer', display: 'flex' }}>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          ) : (
            <span style={{ width: 16 }} />
          )}
          {hasChildren ? <Folder size={18} color="#64748B" /> : <FileText size={18} color="#94A3B8" />}
          <span>{node.title}</span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onAddChild(node); }}
          title="Agregar Submenú"
          style={addBtnStyle}
        >
          <PlusCircle size={15} />
        </button>
      </div>

      {hasChildren && isOpen && (
        <div style={{ borderLeft: '1px dashed #CBD5E1', marginLeft: '18px' }}>
          {node.children.map(child => (
            <MenuItem 
              key={child.id} 
              node={child} 
              activeNodeId={activeNodeId}
              onSelectNode={onSelectNode}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ tree, activeNode, onSelectNode, onAddChild }) {
  return (
    <aside style={sidebarContainer}>
      <div style={brandHeader}>
        <div style={logoIcon}>N</div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05em', color: '#0F172A' }}>N-Tree Admin</h3>
          <span style={{ fontSize: '0.75em', color: '#64748B' }}>Menú Jerárquico Dinámico</span>
        </div>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, paddingRight: '6px' }}>
        {tree.root.children.map(node => (
          <MenuItem 
            key={node.id} 
            node={node} 
            activeNodeId={activeNode?.id}
            onSelectNode={onSelectNode}
            onAddChild={onAddChild}
          />
        ))}
      </div>
    </aside>
  );
}

const sidebarContainer = {
  width: '300px',
  height: 'calc(100vh - 80px)',
  background: '#FFFFFF',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '20px 12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: 'column'
};

const brandHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  paddingBottom: '16px',
  marginBottom: '16px',
  borderBottom: '1px solid #F1F5F9',
  paddingLeft: '8px'
};

const logoIcon = {
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  background: '#2563EB',
  color: '#FFF',
  fontWeight: '900',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.1em'
};

const itemRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  marginBottom: '2px',
  fontSize: '0.9em',
  transition: 'all 0.15s ease'
};

const addBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#94A3B8',
  cursor: 'pointer',
  padding: '2px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center'
};