import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, loginAsGuest } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name) {
          throw new Error('Por favor ingresa tu nombre');
        }
        await register(formData.email, formData.password, formData.name);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo">🎓</div>
          <h1 className="auth-title">ClassSummary</h1>
          <p className="auth-subtitle">
            Resúmenes inteligentes de tus clases con IA
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            {t('login')}
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            {t('register')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👤</span>
                {t('name')}
              </label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: María García"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📧</span>
              {t('email')}
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔒</span>
              {t('password')}
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {error && (
            <div className="auth-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                {t('loading')}
              </span>
            ) : (
              <>
                <span className="btn-icon">✨</span>
                {isLogin ? t('login') : t('register')}
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>o</span>
        </div>

        <button
          className="btn-guest"
          onClick={handleGuestLogin}
        >
          <span className="btn-icon">🚀</span>
          {t('guest')}
        </button>

        <div className="auth-footer">
          <p className="footer-text">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              className="footer-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ email: '', password: '', name: '' });
              }}
            >
              {isLogin ? t('register') : t('login')}
            </button>
          </p>
        </div>
      </div>

      <div className="auth-features">
        <div className="feature-card fade-in">
          <div className="feature-icon">🎙️</div>
          <h3>Sube tu Audio</h3>
          <p>Carga grabaciones de clases en cualquier formato</p>
        </div>
        <div className="feature-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="feature-icon">🤖</div>
          <h3>IA Inteligente</h3>
          <p>Resúmenes automáticos con puntos clave</p>
        </div>
        <div className="feature-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="feature-icon">🌍</div>
          <h3>30+ Idiomas</h3>
          <p>Soporte multiidioma completo</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
