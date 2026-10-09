import React from 'react';
import { User, ShieldCheck, CreditCard, Bell, HelpCircle, FileText, Activity, Key } from 'lucide-react';

export function ProfileView() {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={avatarStyle}>JE</div>
        <div>
          <h2 style={{ margin: 0, color: '#0F172A', fontSize: '1.4em' }}>Juan Esteban Jaramillo Montes</h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '0.9em' }}>Algoritmo y Programacion 2</p>
        </div>
      </div>
      <hr style={hrStyle} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div><strong style={labelStyle}>Email:</strong> <p style={valStyle}>jejmtesla@gmail.com</p></div>
        <div><strong style={labelStyle}>Ubicación:</strong> <p style={valStyle}>Colombia 🇨🇴</p></div>
      </div>
    </div>
  );
}

export function SecurityView() {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 15px 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ShieldCheck color="#2563EB" /> Seguridad & Privacidad
      </h3>
      <p style={{ color: '#64748B', fontSize: '0.95em' }}>Configuración de autenticación de dos factores y permisos de acceso.</p>
      <div style={statusBadge}>Autenticación 2FA Activada</div>
    </div>
  );
}

export function BillingView() {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 15px 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CreditCard color="#2563EB" /> Plan & Facturación
      </h3>
      <p style={{ color: '#64748B', fontSize: '0.95em' }}>Plan completo — $400.000 / mes</p>
    </div>
  );
}

export function DefaultView({ node }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ margin: '0 0 10px 0', color: '#0F172A' }}>📄 {node?.title || 'Vista Genérica'}</h2>
      <p style={{ color: '#64748B' }}>Ruta de acceso: <code style={codeStyle}>{node?.path || '/'}</code></p>
      <p style={{ color: '#64748B', fontSize: '0.9em' }}>
        Este es un componente cargado dinámicamente desde el Árbol N-ario.
      </p>
    </div>
  );
}

const cardStyle = {
  background: '#FFFFFF',
  padding: '30px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: '1px solid #E2E8F0'
};

const avatarStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
  color: '#FFF',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2em'
};

const hrStyle = { border: 'none', borderTop: '1px solid #F1F5F9', margin: '20px 0' };
const labelStyle = { color: '#94A3B8', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '0.5px' };
const valStyle = { margin: '4px 0 0 0', color: '#1E293B', fontWeight: '600' };
const codeStyle = { background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px', color: '#2563EB', fontFamily: 'monospace' };
const statusBadge = { display: 'inline-block', background: '#DCFCE7', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85em' };