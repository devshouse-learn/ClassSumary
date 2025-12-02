import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import './Settings.css';

const Settings = () => {
  const { user, updateUserPreferences } = useAuth();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    updateUserPreferences({ language: langCode });
  };

  const handleExportData = () => {
    const data = {
      user,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `classsummary_data_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings fade-in">
      <div className="settings-header">
        <h1 className="settings-title">
          <span className="title-icon">⚙️</span>
          {t('settings')}
        </h1>
        <p className="settings-subtitle">
          Personaliza tu experiencia en ClassSummary
        </p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">👤</span>
              Información de Usuario
            </h2>
          </div>
          <div className="section-body">
            <div className="info-item">
              <div className="info-label">Nombre</div>
              <div className="info-value">{user?.name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-value">{user?.email}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Tipo de Cuenta</div>
              <div className="info-value">
                {user?.isGuest ? '🚀 Invitado' : '✨ Registrado'}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🌍</span>
              Idioma de la Aplicación
            </h2>
            <p className="section-desc">
              Selecciona tu idioma preferido (30+ disponibles)
            </p>
          </div>
          <div className="section-body">
            <button
              className="language-selector"
              onClick={() => setShowLanguageModal(true)}
            >
              <span className="language-flag">
                {SUPPORTED_LANGUAGES[currentLanguage]?.flag}
              </span>
              <span className="language-name">
                {SUPPORTED_LANGUAGES[currentLanguage]?.nativeName}
              </span>
              <span className="selector-arrow">▼</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🔔</span>
              Preferencias
            </h2>
          </div>
          <div className="section-body">
            <div className="preference-item">
              <div className="preference-info">
                <div className="preference-title">Guardar Automáticamente</div>
                <div className="preference-desc">
                  Guarda los resúmenes automáticamente en tu historial
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <div className="preference-title">Notificaciones</div>
                <div className="preference-desc">
                  Recibe notificaciones sobre el procesamiento
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">💾</span>
              Datos y Privacidad
            </h2>
          </div>
          <div className="section-body">
            <div className="data-actions">
              <button className="data-btn export" onClick={handleExportData}>
                <span className="btn-icon">📥</span>
                <div className="btn-content">
                  <div className="btn-title">Exportar Datos</div>
                  <div className="btn-desc">Descarga todos tus datos en JSON</div>
                </div>
              </button>
              <button className="data-btn danger">
                <span className="btn-icon">🗑️</span>
                <div className="btn-content">
                  <div className="btn-title">Eliminar Cuenta</div>
                  <div className="btn-desc">Esta acción no se puede deshacer</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">ℹ️</span>
              Acerca de
            </h2>
          </div>
          <div className="section-body">
            <div className="about-info">
              <div className="about-item">
                <strong>Versión:</strong> 1.0.0
              </div>
              <div className="about-item">
                <strong>Última actualización:</strong> Diciembre 2024
              </div>
              <div className="about-item">
                <strong>Idiomas soportados:</strong> 30+
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLanguageModal && (
        <div className="modal-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">🌍 Seleccionar Idioma</h2>
              <button
                className="modal-close"
                onClick={() => setShowLanguageModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="languages-grid">
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    className={`language-option ${currentLanguage === code ? 'selected' : ''}`}
                    onClick={() => {
                      handleLanguageChange(code);
                      setShowLanguageModal(false);
                    }}
                  >
                    <span className="option-flag">{lang.flag}</span>
                    <span className="option-name">{lang.nativeName}</span>
                    {currentLanguage === code && (
                      <span className="option-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
