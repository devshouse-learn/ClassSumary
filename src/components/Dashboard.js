import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isGuest } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { icon: '🎙️', label: 'Clases Procesadas', value: isGuest ? '3' : '12', color: '#667eea' },
    { icon: '⏱️', label: 'Horas de Audio', value: isGuest ? '2.5' : '18.5', color: '#f093fb' },
    { icon: '📝', label: 'Resúmenes Guardados', value: isGuest ? '3' : '12', color: '#4facfe' },
    { icon: '❓', label: 'Preguntas Generadas', value: isGuest ? '15' : '156', color: '#43e97b' }
  ];

  const recentClasses = [
    {
      id: 1,
      title: 'Introducción a React',
      date: '2024-12-01',
      duration: '45 min',
      status: 'completed',
      color: '#667eea'
    },
    {
      id: 2,
      title: 'JavaScript Avanzado',
      date: '2024-11-28',
      duration: '60 min',
      status: 'completed',
      color: '#f093fb'
    },
    {
      id: 3,
      title: 'CSS Grid y Flexbox',
      date: '2024-11-25',
      duration: '38 min',
      status: 'completed',
      color: '#4facfe'
    }
  ];

  const quickActions = [
    { icon: '📤', label: 'Subir Nueva Clase', action: 'upload', color: '#667eea' },
    { icon: '📚', label: 'Ver Historial', action: 'history', color: '#f093fb' },
    { icon: '⚙️', label: 'Configuración', action: 'settings', color: '#4facfe' }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            {t('welcomeBack')}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="dashboard-subtitle">
            {isGuest 
              ? 'Estás en modo invitado. Registra tu cuenta para guardar tu progreso.'
              : 'Aquí está tu resumen de actividad reciente'}
          </p>
        </div>
        <div className="header-date">
          📅 {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {isGuest && (
        <div className="guest-banner">
          <span className="banner-icon">ℹ️</span>
          <div className="banner-content">
            <strong>Modo Invitado:</strong> Tus datos se guardan temporalmente. 
            Crea una cuenta para acceder a todas las funciones.
          </div>
        </div>
      )}

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ '--stat-color': stat.color }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="recent-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">📚</span>
              {t('recentClasses')}
            </h2>
          </div>
          <div className="recent-list">
            {recentClasses.map((cls) => (
              <div key={cls.id} className="recent-item">
                <div 
                  className="item-indicator"
                  style={{ background: cls.color }}
                ></div>
                <div className="item-content">
                  <div className="item-title">{cls.title}</div>
                  <div className="item-meta">
                    <span className="meta-item">📅 {cls.date}</span>
                    <span className="meta-item">⏱️ {cls.duration}</span>
                    <span className="meta-badge success">✓ Completado</span>
                  </div>
                </div>
                <button className="item-action">Ver Resumen →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="actions-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⚡</span>
              {t('quickActions')}
            </h2>
          </div>
          <div className="actions-list">
            {quickActions.map((action, index) => (
              <button 
                key={index} 
                className="action-button"
                style={{ '--action-color': action.color }}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>

          <div className="tips-card">
            <div className="tips-header">
              <span className="tips-icon">💡</span>
              <span className="tips-title">Consejo del día</span>
            </div>
            <p className="tips-text">
              Puedes cambiar el idioma de los resúmenes en la sección de Configuración. 
              ¡Soportamos más de 30 idiomas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
