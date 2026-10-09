import { useState, useEffect } from 'react';
import { BinarySearchTree } from './structures/BST';
import { TreeControls } from './components/TreeControls';
import { TraversalPanel } from './components/TraversalPanel';
import { TreeVisualizer } from './components/TreeVisualizer';

// Array de valores demo iniciales
const initialNumbers = [50, 30, 70, 20, 40, 60, 80];

export default function App() {
  const [bst] = useState(() => new BinarySearchTree());
  const [treeData, setTreeData] = useState(null);
  const [traversals, setTraversals] = useState({ inOrder: [], preOrder: [], postOrder: [] });
  const [searchResult, setSearchResult] = useState(null);

  const updateTreeState = () => {
    setTreeData(bst.toD3Tree());
    setTraversals({
      inOrder: bst.inOrder(),
      preOrder: bst.preOrder(),
      postOrder: bst.postOrder()
    });
    bst.printConsoleTraversals(); // Imprimir en consola Requerimiento 1
  };

  const loadDemoData = () => {
    bst.root = null;
    initialNumbers.forEach(num => bst.insert(num));
    setSearchResult(null);
    updateTreeState();
  };

  useEffect(() => {
    loadDemoData();
  }, []);

  const handleInsert = (value) => {
    const inserted = bst.insert(value);
    if (inserted) {
      updateTreeState();
    } else {
      alert(`El valor ${value} ya existe en el árbol.`);
    }
  };

  const handleSearch = (value) => {
    const found = bst.contains(value);
    setSearchResult({ value, found });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#F8FAFC', padding: '40px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* HEADER VISUAL */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #A855F7', color: '#C084FC', fontWeight: '800', padding: '4px 16px', borderRadius: '30px', fontSize: '0.8em', marginBottom: '12px' }}>
          CHALLENGE 08 — BINARY SEARCH TREE (BST)
        </div>
        <h1 style={{ fontSize: '2.8em', margin: '0 0 10px 0', fontWeight: '900', background: 'linear-gradient(to right, #38BDF8, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🌳 Visualizador de Árboles con D3
        </h1>
        <p style={{ color: '#94A3B8', margin: 0, fontSize: '1.1em' }}>
          Inserción interactiva, recorridos Inorder/Preorder/Postorder y renderizado gráfico dinámico.
        </p>
      </header>

      {/* LAYOUT PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
        
        {/* COLUMNA IZQUIERDA: CONTROLES Y RECORRIDOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TreeControls 
            onInsert={handleInsert} 
            onSearch={handleSearch} 
            onReset={loadDemoData}
            searchResult={searchResult}
          />
          <TraversalPanel 
            inOrder={traversals.inOrder} 
            preOrder={traversals.preOrder} 
            postOrder={traversals.postOrder} 
          />
        </div>

        {/* COLUMNA DERECHA: CANVAS D3 TREE */}
        <div>
          <TreeVisualizer treeData={treeData} />
        </div>

      </main>
    </div>
  );
}