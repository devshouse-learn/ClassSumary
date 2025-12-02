import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const { t } = useLanguage();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const simulateProcessing = async () => {
    setProcessing(true);
    setProgress(0);

    // Simular progreso de procesamiento
    const stages = [
      { progress: 20, delay: 1000, message: 'Cargando archivo...' },
      { progress: 40, delay: 1500, message: 'Transcribiendo audio...' },
      { progress: 60, delay: 2000, message: 'Generando resumen...' },
      { progress: 80, delay: 1500, message: 'Creando puntos clave...' },
      { progress: 100, delay: 1000, message: 'Generando preguntas...' }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      setProgress(stage.progress);
    }

    // Resultado simulado
    const mockResult = {
      title: file.name.replace(/\.[^/.]+$/, ''),
      duration: '45 min',
      date: new Date().toISOString(),
      transcript: `Esta es una transcripción simulada de la clase grabada. 
      
En esta sesión hemos cubierto los conceptos fundamentales de React, incluyendo componentes, props, y estado. React es una biblioteca de JavaScript para construir interfaces de usuario, desarrollada por Facebook.

Comenzamos explicando qué es un componente y cómo se puede dividir una interfaz en piezas reutilizables. Los componentes pueden ser de clase o funcionales, aunque en la actualidad se prefieren los componentes funcionales con Hooks.

Luego exploramos el concepto de props (propiedades), que son la forma en que los componentes padre pasan datos a los componentes hijo. Las props son inmutables y fluyen en una sola dirección.

Finalmente, discutimos el estado (state), que permite a los componentes mantener y actualizar información que puede cambiar con el tiempo. El Hook useState es la forma moderna de manejar estado en componentes funcionales.`,
      summary: `📚 Resumen de la Clase

Esta clase introductoria a React cubre los tres pilares fundamentales del desarrollo con esta biblioteca: componentes, props y estado.

**Componentes:** Son bloques de construcción reutilizables que dividen la UI en piezas manejables. Se prefieren los componentes funcionales modernos sobre los de clase.

**Props:** Mecanismo de comunicación unidireccional de padre a hijo. Son inmutables y permiten personalizar componentes.

**Estado:** Datos dinámicos que pueden cambiar durante el ciclo de vida del componente. Se maneja con el Hook useState en componentes funcionales.

La clase establece las bases necesarias para comenzar a desarrollar aplicaciones React modernas y escalables.`,
      keyPoints: [
        {
          title: 'Componentes en React',
          description: 'Bloques reutilizables que dividen la interfaz. Los componentes funcionales son el estándar actual.',
          icon: '🧩'
        },
        {
          title: 'Props (Propiedades)',
          description: 'Sistema de comunicación unidireccional de padre a hijo. Son inmutables y configuran componentes.',
          icon: '📦'
        },
        {
          title: 'Estado (State)',
          description: 'Datos dinámicos del componente. Se gestiona con useState Hook en componentes funcionales.',
          icon: '🔄'
        },
        {
          title: 'Hooks Modernos',
          description: 'API moderna de React que permite usar estado y otras características en componentes funcionales.',
          icon: '🪝'
        },
        {
          title: 'Flujo Unidireccional',
          description: 'Los datos fluyen de componentes padre a hijo, facilitando el seguimiento del estado de la aplicación.',
          icon: '⬇️'
        }
      ],
      questions: [
        {
          question: '¿Cuál es la diferencia principal entre props y state en React?',
          answer: 'Las props son inmutables y se pasan de padre a hijo, mientras que el state es mutable y pertenece al componente que lo declara.',
          difficulty: 'medium'
        },
        {
          question: '¿Por qué se prefieren los componentes funcionales sobre los de clase?',
          answer: 'Los componentes funcionales son más simples, legibles y permiten usar Hooks, que ofrecen una forma más intuitiva de manejar estado y efectos.',
          difficulty: 'easy'
        },
        {
          question: '¿Qué Hook se utiliza para manejar estado en componentes funcionales?',
          answer: 'useState es el Hook principal para manejar estado en componentes funcionales.',
          difficulty: 'easy'
        },
        {
          question: '¿Qué significa que React tiene un flujo de datos unidireccional?',
          answer: 'Significa que los datos fluyen en una sola dirección, de componentes padre a componentes hijo mediante props, lo que hace más predecible el comportamiento de la aplicación.',
          difficulty: 'medium'
        },
        {
          question: '¿Cómo se dividen las interfaces de usuario en React?',
          answer: 'Se dividen en componentes reutilizables, cada uno encargado de renderizar una parte específica de la UI.',
          difficulty: 'easy'
        }
      ]
    };

    setResult(mockResult);
    setProcessing(false);
  };

  const handleProcess = () => {
    if (file) {
      simulateProcessing();
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (result) {
    return (
      <div className="upload fade-in">
        <div className="result-header">
          <div className="result-title-section">
            <h1 className="result-main-title">✅ Procesamiento Completado</h1>
            <h2 className="result-subtitle">{result.title}</h2>
            <div className="result-meta">
              <span className="meta-badge">⏱️ {result.duration}</span>
              <span className="meta-badge">📅 {new Date(result.date).toLocaleDateString()}</span>
            </div>
          </div>
          <button className="btn-secondary" onClick={handleReset}>
            ← Nueva Clase
          </button>
        </div>

        <div className="result-content">
          <div className="result-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">📝</span>
                {t('summary')}
              </h3>
            </div>
            <div className="card-body">
              <div className="summary-text">{result.summary}</div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">🎯</span>
                {t('keyPoints')}
              </h3>
            </div>
            <div className="card-body">
              <div className="keypoints-grid">
                {result.keyPoints.map((point, index) => (
                  <div key={index} className="keypoint-item">
                    <div className="keypoint-icon">{point.icon}</div>
                    <div className="keypoint-content">
                      <div className="keypoint-title">{point.title}</div>
                      <div className="keypoint-desc">{point.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">❓</span>
                {t('questions')}
              </h3>
            </div>
            <div className="card-body">
              <div className="questions-list">
                {result.questions.map((q, index) => (
                  <details key={index} className="question-item">
                    <summary className="question-summary">
                      <span className="question-number">{index + 1}</span>
                      <span className="question-text">{q.question}</span>
                      <span className={`question-difficulty ${q.difficulty}`}>
                        {q.difficulty === 'easy' ? '⭐' : '⭐⭐'}
                      </span>
                    </summary>
                    <div className="question-answer">
                      <strong>Respuesta:</strong> {q.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="card-icon">📄</span>
                {t('transcript')}
              </h3>
            </div>
            <div className="card-body">
              <div className="transcript-text">{result.transcript}</div>
            </div>
          </div>
        </div>

        <div className="result-actions">
          <button className="btn-download">
            <span className="btn-icon">💾</span>
            Descargar PDF
          </button>
          <button className="btn-download">
            <span className="btn-icon">📋</span>
            Copiar Resumen
          </button>
          <button className="btn-download">
            <span className="btn-icon">📧</span>
            Enviar por Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="upload fade-in">
      <div className="upload-header">
        <h1 className="upload-title">
          <span className="title-icon">📤</span>
          {t('uploadTitle')}
        </h1>
        <p className="upload-description">
          Sube tu grabación de clase y deja que la IA genere resúmenes, puntos clave y preguntas automáticamente
        </p>
      </div>

      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {!file ? (
          <div className="upload-placeholder">
            <div className="placeholder-icon">🎙️</div>
            <h3 className="placeholder-title">{t('dragDrop')}</h3>
            <p className="placeholder-subtitle">
              Formatos soportados: MP3, WAV, M4A, OGG
            </p>
            <p className="placeholder-subtitle">
              Tamaño máximo: 500 MB
            </p>
          </div>
        ) : (
          <div className="file-preview">
            <div className="file-icon">🎵</div>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{formatFileSize(file.size)}</div>
              <div className="file-type">{file.type}</div>
            </div>
            <button
              className="file-remove"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {processing && (
        <div className="processing-section">
          <div className="processing-header">
            <div className="processing-icon">🤖</div>
            <div className="processing-text">
              <h3 className="processing-title">{t('processing')}</h3>
              <p className="processing-subtitle">
                La IA está analizando tu clase...
              </p>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{progress}%</div>
        </div>
      )}

      {file && !processing && (
        <div className="upload-actions">
          <button
            className="btn-primary btn-large"
            onClick={handleProcess}
          >
            <span className="btn-icon">✨</span>
            Procesar con IA
          </button>
          <button className="btn-secondary btn-large" onClick={handleReset}>
            <span className="btn-icon">🔄</span>
            Cambiar Archivo
          </button>
        </div>
      )}

      <div className="upload-features">
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <div className="feature-text">
            <strong>Procesamiento Rápido</strong>
            <p>Resultados en minutos</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <div className="feature-text">
            <strong>100% Privado</strong>
            <p>Tus archivos están seguros</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🌍</div>
          <div className="feature-text">
            <strong>Multiidioma</strong>
            <p>30+ idiomas soportados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
