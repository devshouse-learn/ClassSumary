import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, isGuest } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: t('dashboard'), color: '#667eea' },
    { id: 'upload', icon: '📤', label: t('upload'), color: '#f093fb' },
    { id: 'history', icon: '📚', label: t('history'), color: '#4facfe' },
    { id: 'settings', icon: '⚙️', label: t('settings'), color: '#f5576c' },
    { id: 'help', icon: '❓', label: t('help'), color: '#43e97b' }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🎓</span>
          {!isCollapsed && <span className="logo-text">ClassSummary</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Contraer'}
        >
          {isCollapsed ? '▶️' : '◀️'}
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {isGuest ? '👤' : user?.name?.charAt(0).toUpperCase()}
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-status">
              {isGuest ? '🚀 Modo Invitado' : '✨ Cuenta Activa'}
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
            style={{
              '--item-color': item.color
            }}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {activeView === item.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={logout}
          title={t('logout')}
        >
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span className="logout-text">{t('logout')}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
