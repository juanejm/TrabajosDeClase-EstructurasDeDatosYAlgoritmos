import { useState } from 'react';
import { NAryTree } from './structures/NAryTree';
import { Sidebar } from './components/Sidebar';
import { NAryVisualizer } from './components/NAryVisualizer';
import { AddNodeModal } from './components/AddNodeModal';
import { ProfileView, SecurityView, BillingView, DefaultView } from './components/SamplePages';

// Mock Data Inicial para el Árbol N-ario (Menús y Submenús)
const initialMenuTree = {
  id: 'root',
  title: 'Inicio',
  path: '/',
  children: [
    {
      id: 'profile',
      title: 'Perfil',
      path: '/profile',
      componentName: 'ProfileView'
    },
    {
      id: 'messages',
      title: 'Mensajes',
      path: '/messages',
      componentName: 'DefaultView'
    },
    {
      id: 'settings',
      title: 'Configuración',
      path: '/settings',
      children: [
        { id: 'account', title: 'Cuenta', path: '/settings/account', componentName: 'ProfileView' },
        { id: 'security', title: 'Seguridad y Privacidad', path: '/settings/security', componentName: 'SecurityView' },
        { id: 'billing', title: 'Facturación y Planes', path: '/settings/billing', componentName: 'BillingView' }
      ]
    },
    {
      id: 'help',
      title: 'Ayuda y Soporte',
      path: '/help',
      children: [
        { id: 'faqs', title: 'Preguntas Frecuentes', path: '/help/faqs', componentName: 'DefaultView' },
        { id: 'ticket', title: 'Enviar un Ticket', path: '/help/ticket', componentName: 'DefaultView' }
      ]
    }
  ]
};

const treeInstance = new NAryTree(initialMenuTree);

export default function App() {
  const [tree] = useState(treeInstance);
  const [activeNode, setActiveNode] = useState(tree.root.children[0]);
  const [modalParent, setModalParent] = useState(null);
  const [showTreeInspector, setShowTreeInspector] = useState(false);
  const [, forceRender] = useState({});

  const handleAddChild = (parentId, nodeData) => {
    tree.insert(parentId, nodeData);
    forceRender({}); // Re-renderizar la interfaz
  };

  const renderComponent = () => {
    if (!activeNode) return <DefaultView />;
    switch (activeNode.componentName) {
      case 'ProfileView': return <ProfileView />;
      case 'SecurityView': return <SecurityView />;
      case 'BillingView': return <BillingView />;
      default: return <DefaultView node={activeNode} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '20px 40px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* BARRA SUPERIOR ELEGANTE */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span style={{ fontSize: '0.75em', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px' }}>
            CHALLENGE 09 — ÁRBOLES N-ARIOS
          </span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '1.8em', color: '#0F172A', fontWeight: '800' }}>
            Sistema de Navegación N-Ario
          </h1>
        </div>

        <button 
          onClick={() => setShowTreeInspector(!showTreeInspector)}
          style={{ background: showTreeInspector ? '#0F172A' : '#FFFFFF', color: showTreeInspector ? '#FFF' : '#334155', border: '1px solid #CBD5E1', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}
        >
          {showTreeInspector ? '👁️ Ocultar Estructura del Árbol' : '🌳 Ver Árbol N-ario Técnico'}
        </button>
      </header>

      {/* ÁREA PRINCIPAL LAYOUT */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* SIDEBAR N-ARIO */}
        <Sidebar 
          tree={tree} 
          activeNode={activeNode} 
          onSelectNode={node => setActiveNode(node)} 
          onAddChild={node => setModalParent(node)}
        />

        {/* CONTENIDO DE LA PÁGINA O INSPECTOR */}
        <main style={{ flex: 1 }}>
          {showTreeInspector ? (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#0F172A' }}>🌳 Estructura Jerárquica del Árbol N-ario</h3>
              <NAryVisualizer node={tree.root} />
            </div>
          ) : (
            renderComponent()
          )}
        </main>
      </div>

      {/* MODAL PARA AGREGAR SUBMENÚS */}
      {modalParent && (
        <AddNodeModal 
          parentNode={modalParent} 
          onClose={() => setModalParent(null)} 
          onAdd={handleAddChild}
        />
      )}
    </div>
  );
}