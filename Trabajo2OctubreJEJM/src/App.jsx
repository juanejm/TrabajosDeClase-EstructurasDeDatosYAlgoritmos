import { useState } from 'react';
import { Graph } from './structures/Graph';
import { GraphVisualizer } from './components/GraphVisualizer';
import { CityFilterPanel } from './components/CityFilterPanel';
import { AddNodeModal } from './components/AddNodeModal';
import { Compass, Plus } from 'lucide-react';

// Mock Data Inicial (Ciudades y Personas con Amistades)[cite: 9]
const graphInstance = new Graph();

// Ciudades Nodos[cite: 9]
const initialCities = [
  { id: 'c1', label: 'Popayán', type: 'city' },
  { id: 'c2', label: 'Cali', type: 'city' },
  { id: 'c3', label: 'Bogotá', type: 'city' }
];

// Personas Nodos[cite: 9]
const initialPeople = [
  { id: 'p1', label: 'Juan Esteban', age: 24, type: 'person', cityId: 'c1' },
  { id: 'p2', label: 'Cattleya', age: 22, type: 'person', cityId: 'c1' },
  { id: 'p3', label: 'Carlos', age: 28, type: 'person', cityId: 'c2' },
  { id: 'p4', label: 'María', age: 26, type: 'person', cityId: 'c3' }
];

initialCities.forEach(c => graphInstance.addNode(c));
initialPeople.forEach(p => {
  graphInstance.addNode(p);
  graphInstance.addEdge(p.id, p.cityId); // Conexión Persona ➔ Ciudad[cite: 9]
});

// Amistades Persona ➔ Persona
graphInstance.addEdge('p1', 'p2');
graphInstance.addEdge('p1', 'p3');

export default function App() {
  const [graph] = useState(graphInstance);
  const [graphData, setGraphData] = useState(() => graph.toD3Graph());
  const [selectedCityId, setSelectedCityId] = useState('c1');
  const [showModal, setShowModal] = useState(false);

  const getCitiesList = () => {
    return Array.from(graph.nodes.values()).filter(n => n.type === 'city');
  };

  const handleAddPerson = (person) => {
    graph.addNode(person);
    graph.addEdge(person.id, person.cityId);
    setGraphData(graph.toD3Graph());
  };

  const handleAddCity = (city) => {
    graph.addNode(city);
    setGraphData(graph.toD3Graph());
  };

  const handleSelectNode = (nodeId) => {
    const node = graph.nodes.get(nodeId);
    if (node && node.type === 'city') {
      setSelectedCityId(nodeId);
    }
  };

  const currentResidents = selectedCityId ? graph.getPeopleInCity(selectedCityId) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE0', color: '#2C221E', padding: '30px 40px', fontFamily: "Georgia, serif" }}>
      
      {/* HEADER VINTAGE */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 30px auto', borderBottom: '3px double #8B263E', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B263E', fontSize: '0.85em', fontWeight: 'bold', letterSpacing: '2px' }}>
            <Compass size={18} /> CHALLENGE 10 — GRAFO DE AMIGOS & CIUDADES
          </div>
          <h1 style={{ margin: '6px 0 0 0', fontSize: '2.5em', color: '#2C221E', fontStyle: 'italic' }}>
            Atlas Cartográfico de Redes Sociales
          </h1>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#8B263E', color: '#FFF', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Georgia, serif', boxShadow: '3px 3px 0px #2C221E' }}
        >
          <Plus size={18} /> Registrar Registro
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '30px' }}>
        
        {/* GRAFO D3 */}
        <GraphVisualizer 
          graphData={graphData} 
          onSelectNode={handleSelectNode} 
        />

        {/* FILTRO DE CIUDADES Y HABITANTES */}
        <CityFilterPanel 
          cities={getCitiesList()} 
          selectedCityId={selectedCityId}
          onSelectCity={setSelectedCityId}
          residents={currentResidents}
        />

      </main>

      {/* MODAL */}
      {showModal && (
        <AddNodeModal 
          cities={getCitiesList()} 
          onClose={() => setShowModal(false)}
          onAddPerson={handleAddPerson}
          onAddCity={handleAddCity}
        />
      )}
    </div>
  );
}