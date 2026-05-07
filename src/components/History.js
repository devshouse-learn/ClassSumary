// filepath: src/components/History.js
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './History.css';

const History = () => {
  const { t } = useLanguage();

  const [classesList, setClassesList] = useState([
    { id: 1, title: 'Introducción a React', date: '2024-12-01', duration: '45 min', status: 'completed', keyPoints: 5, questions: 5, color: '#667eea', summary: 'Resumen de React...' },
    { id: 2, title: 'JavaScript Avanzado', date: '2024-11-28', duration: '60 min', status: 'completed', keyPoints: 7, questions: 8, color: '#f093fb', summary: 'Resumen de JS avanzado...' },
    { id: 3, title: 'CSS Grid y Flexbox', date: '2024-11-25', duration: '38 min', status: 'completed', keyPoints: 4, questions: 6, color: '#4facfe', summary: 'Resumen de CSS Grid y Flexbox...' }
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');

  useEffect(() => {
    try {
      const focusId = localStorage.getItem('classsummary_focus_id');
      if (focusId) {
        const found = classesList.find(c => String(c.id) === String(focusId));
        if (found) setSelectedClass(found);
        localStorage.removeItem('classsummary_focus_id');
      }
    } catch (e) {}
  }, []); // eslint-disable-line

  const handleView = (cls) => setSelectedClass(cls);

  const handleDownload = (cls) => {
    const content = `Título: ${cls.title}\nFecha: ${cls.date}\nDuración: ${cls.duration}\nPuntos clave: ${cls.keyPoints}\nPreguntas: ${cls.questions}\n\n${cls.summary}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${cls.title.replace(/\s+/g, '_')}.txt`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleCopy = async (cls) => {
    const content = `${cls.title}\nFecha: ${cls.date} | Duración: ${cls.duration}\n\n${cls.summary}`;
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(cls.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch { alert('No se pudo copiar al portapapeles'); }
  };

  const handleDelete = (cls) => {
    if (!window.confirm(`¿Eliminar "${cls.title}" del historial?`)) return;
    setClassesList(prev => prev.filter(c => c.id !== cls.id));
    if (selectedClass?.id === cls.id) setSelectedClass(null);
  };

  const filtered = classesList
    .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'longest') return parseInt(b.duration) - parseInt(a.duration);
      return 0;
    });

  const totalMinutes = classesList.reduce((acc, c) => acc + (parseInt(c.duration) || 0), 0);

  return (
    <div className="history fade-in">
      <div className="history-header">
        <div className="header-content">
          <h1 className="history-title"><span className="title-icon">📚</span>{t('history')}</h1>
          <p className="history-subtitle">Todas tus clases procesadas en un solo lugar</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge"><span className="badge-value">{classesList.length}</span><span className="badge-label">Clases</span></div>
          <div className="stat-badge"><span className="badge-value">{(totalMinutes / 60).toFixed(1)}h</span><span className="badge-label">Total</span></div>
        </div>
      </div>

      <div className="history-filters">
        <input type="text" className="filter-search" placeholder="🔍 Buscar clases..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">Todas las clases</option>
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="longest">Más largas</option>
        </select>
      </div>

      <div className="history-list">
        {filtered.map((cls) => (
          <div key={cls.id} className="history-item">
            <div className="item-indicator" style={{ background: cls.color }}></div>
            <div className="item-main">
              <div className="item-header"><h3 className="item-title">{cls.title}</h3><span className="item-status success">✓ Completado</span></div>
              <div className="item-meta"><span className="meta-item">📅 {cls.date}</span><span className="meta-item">⏱️ {cls.duration}</span><span className="meta-item">🎯 {cls.keyPoints} puntos clave</span><span className="meta-item">❓ {cls.questions} preguntas</span></div>
              <div className="item-actions">
                <button className="action-btn primary" onClick={() => handleView(cls)}>👁️ Ver Resumen</button>
                <button className="action-btn" onClick={() => handleDownload(cls)}>💾 Descargar</button>
                <button className="action-btn" onClick={() => handleCopy(cls)}>{copiedId === cls.id ? '✅ Copiado!' : '📋 Copiar'}</button>
                <button className="action-btn danger" onClick={() => handleDelete(cls)}>🗑️ Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="history-empty">
          <div className="empty-icon">��</div>
          <h3 className="empty-title">No hay clases procesadas</h3>
          <p className="empty-text">Sube tu primera clase grabada para comenzar</p>
          <button className="btn-primary" onClick={() => { try { localStorage.removeItem('classsummary_focus_id'); } catch(e){}; if (window.location) window.location.href = '#'; }}>📤 Subir Primera Clase</button>
        </div>
      )}

      {selectedClass && (
        <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderLeft: `4px solid ${selectedClass.color}` }}>
              <h2>{selectedClass.title}</h2>
              <button className="modal-close" onClick={() => setSelectedClass(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-meta"><span>📅 {selectedClass.date}</span><span>⏱️ {selectedClass.duration}</span><span>🎯 {selectedClass.keyPoints} puntos clave</span><span>❓ {selectedClass.questions} preguntas</span></div>
              <p className="modal-summary">{selectedClass.summary}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button className="action-btn primary" onClick={() => handleDownload(selectedClass)}>💾 Descargar</button>
                <button className="action-btn" onClick={() => handleCopy(selectedClass)}>{copiedId === selectedClass.id ? '✅ Copiado!' : '📋 Copiar'}</button>
                <button className="action-btn danger" onClick={() => handleDelete(selectedClass)}>🗑️ Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
