import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './History.css';

const History = () => {
  const { t } = useLanguage();

  const classes = [
    {
      id: 1,
      title: 'Introducción a React',
      date: '2024-12-01',
      duration: '45 min',
      status: 'completed',
      keyPoints: 5,
      questions: 5,
      color: '#667eea'
    },
    {
      id: 2,
      title: 'JavaScript Avanzado',
      date: '2024-11-28',
      duration: '60 min',
      status: 'completed',
      keyPoints: 7,
      questions: 8,
      color: '#f093fb'
    },
    {
      id: 3,
      title: 'CSS Grid y Flexbox',
      date: '2024-11-25',
      duration: '38 min',
      status: 'completed',
      keyPoints: 4,
      questions: 6,
      color: '#4facfe'
    }
  ];

  return (
    <div className="history fade-in">
      <div className="history-header">
        <div className="header-content">
          <h1 className="history-title">
            <span className="title-icon">📚</span>
            {t('history')}
          </h1>
          <p className="history-subtitle">
            Todas tus clases procesadas en un solo lugar
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <span className="badge-value">12</span>
            <span className="badge-label">Clases</span>
          </div>
          <div className="stat-badge">
            <span className="badge-value">18.5h</span>
            <span className="badge-label">Total</span>
          </div>
        </div>
      </div>

      <div className="history-filters">
        <input
          type="text"
          className="filter-search"
          placeholder="🔍 Buscar clases..."
        />
        <select className="filter-select">
          <option value="all">Todas las clases</option>
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="longest">Más largas</option>
        </select>
      </div>

      <div className="history-list">
        {classes.map((cls) => (
          <div key={cls.id} className="history-item">
            <div 
              className="item-indicator"
              style={{ background: cls.color }}
            ></div>
            <div className="item-main">
              <div className="item-header">
                <h3 className="item-title">{cls.title}</h3>
                <span className="item-status success">✓ Completado</span>
              </div>
              <div className="item-meta">
                <span className="meta-item">📅 {cls.date}</span>
                <span className="meta-item">⏱️ {cls.duration}</span>
                <span className="meta-item">🎯 {cls.keyPoints} puntos clave</span>
                <span className="meta-item">❓ {cls.questions} preguntas</span>
              </div>
              <div className="item-actions">
                <button className="action-btn primary">
                  👁️ Ver Resumen
                </button>
                <button className="action-btn">
                  💾 Descargar
                </button>
                <button className="action-btn">
                  📋 Copiar
                </button>
                <button className="action-btn danger">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="history-empty">
          <div className="empty-icon">📚</div>
          <h3 className="empty-title">No hay clases procesadas</h3>
          <p className="empty-text">
            Sube tu primera clase grabada para comenzar
          </p>
          <button className="btn-primary">
            📤 Subir Primera Clase
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
