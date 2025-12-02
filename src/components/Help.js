import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Help.css';

const Help = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: '¿Cómo funciona ClassSummary?',
      answer: 'ClassSummary utiliza inteligencia artificial avanzada para analizar tus grabaciones de clase. Sube un archivo de audio, nuestra IA lo transcribe, genera un resumen completo, identifica los puntos clave más importantes y crea preguntas de repaso automáticamente.'
    },
    {
      question: '¿Qué formatos de audio son compatibles?',
      answer: 'Soportamos los formatos más comunes: MP3, WAV, M4A, OGG y más. El tamaño máximo del archivo es de 500 MB.'
    },
    {
      question: '¿Cuánto tiempo tarda el procesamiento?',
      answer: 'Dependiendo de la duración de tu clase, el procesamiento puede tomar entre 2-5 minutos. Verás una barra de progreso en tiempo real.'
    },
    {
      question: '¿Mis datos están seguros?',
      answer: 'Sí, absolutamente. Todos tus archivos y datos se procesan de forma segura. Si eres usuario invitado, tus datos se almacenan localmente. Los usuarios registrados tienen sus datos protegidos y pueden exportarlos en cualquier momento.'
    },
    {
      question: '¿Puedo usar la aplicación sin registrarme?',
      answer: 'Sí, ofrecemos un modo invitado que te permite usar todas las funciones principales. Sin embargo, tus datos se guardarán temporalmente. Te recomendamos crear una cuenta para acceso permanente.'
    },
    {
      question: '¿En qué idiomas puedo obtener los resúmenes?',
      answer: 'ClassSummary soporta más de 30 idiomas. Puedes cambiar el idioma en la sección de Configuración y los resúmenes se generarán en el idioma seleccionado.'
    },
    {
      question: '¿Puedo descargar mis resúmenes?',
      answer: 'Sí, cada resumen puede descargarse en formato PDF, copiarse al portapapeles o enviarse por email directamente desde la aplicación.'
    },
    {
      question: '¿Cuántas clases puedo procesar?',
      answer: 'Los usuarios registrados tienen acceso ilimitado. Los usuarios invitados pueden procesar hasta 3 clases para probar el servicio.'
    }
  ];

  const features = [
    {
      icon: '🎙️',
      title: 'Transcripción Automática',
      description: 'Convierte el audio de tu clase en texto completo con alta precisión'
    },
    {
      icon: '📝',
      title: 'Resúmenes Inteligentes',
      description: 'Obtén resúmenes concisos que capturan la esencia de la clase'
    },
    {
      icon: '🎯',
      title: 'Puntos Clave',
      description: 'Identifica automáticamente los conceptos más importantes'
    },
    {
      icon: '❓',
      title: 'Preguntas de Repaso',
      description: 'Genera preguntas para reforzar el aprendizaje'
    },
    {
      icon: '🌍',
      title: 'Multiidioma',
      description: 'Más de 30 idiomas disponibles para tu comodidad'
    },
    {
      icon: '💾',
      title: 'Exportación Flexible',
      description: 'Descarga en PDF, copia o envía por email'
    }
  ];

  return (
    <div className="help fade-in">
      <div className="help-header">
        <h1 className="help-title">
          <span className="title-icon">❓</span>
          {t('help')}
        </h1>
        <p className="help-subtitle">
          Todo lo que necesitas saber sobre ClassSummary
        </p>
      </div>

      <div className="help-content">
        <div className="help-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🚀</span>
              Guía de Inicio Rápido
            </h2>
          </div>
          <div className="section-body">
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Sube tu Audio</h3>
                  <p className="step-desc">
                    Ve a la sección "Subir Audio" y arrastra tu archivo de clase grabada
                    o haz clic para seleccionarlo desde tu dispositivo.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">Procesa con IA</h3>
                  <p className="step-desc">
                    Haz clic en "Procesar con IA" y espera unos minutos mientras nuestra
                    inteligencia artificial analiza tu clase.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">Revisa los Resultados</h3>
                  <p className="step-desc">
                    Obtén tu transcripción completa, resumen, puntos clave y preguntas
                    de repaso generadas automáticamente.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3 className="step-title">Guarda o Exporta</h3>
                  <p className="step-desc">
                    Descarga el resumen en PDF, cópialo al portapapeles o envíalo por
                    email para estudiarlo más tarde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">✨</span>
              Características Principales
            </h2>
          </div>
          <div className="section-body">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Preguntas Frecuentes
            </h2>
          </div>
          <div className="section-body">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">
                    <span className="question-icon">❓</span>
                    <span className="question-text">{faq.question}</span>
                    <span className="question-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">📧</span>
              ¿Necesitas Más Ayuda?
            </h2>
          </div>
          <div className="section-body">
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <div className="contact-content">
                <h3 className="contact-title">Contáctanos</h3>
                <p className="contact-desc">
                  Si tienes alguna pregunta o problema, no dudes en contactarnos.
                  Estamos aquí para ayudarte.
                </p>
                <div className="contact-methods">
                  <a href="mailto:soporte@classsummary.com" className="contact-link">
                    📧 soporte@classsummary.com
                  </a>
                  <button className="contact-link" onClick={() => alert('Chat en vivo próximamente')}>
                    💬 Chat en vivo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
