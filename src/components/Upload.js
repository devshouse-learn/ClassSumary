// filepath: src/components/Upload.js
import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Upload.css';

const Upload = ({ setActiveView }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const { t } = useLanguage();

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); const droppedFile = e.dataTransfer.files[0]; if (droppedFile && droppedFile.type.startsWith('audio/')) setFile(droppedFile); };
  const handleFileSelect = (e) => { const selectedFile = e.target.files[0]; if (selectedFile) setFile(selectedFile); };

  const simulateProcessing = async () => {
    setProcessing(true);
    setProgress(0);
    const stages = [ { progress: 20, delay: 800 }, { progress: 40, delay: 1000 }, { progress: 60, delay: 1200 }, { progress: 80, delay: 800 }, { progress: 100, delay: 600 } ];
    for (const stage of stages) { await new Promise(resolve => setTimeout(resolve, stage.delay)); setProgress(stage.progress); }
    const mockResult = {
      id: Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      duration: '45 min',
      date: new Date().toISOString(),
      transcript: `Transcripción simulada...`,
      summary: `Resumen simulado de ${file.name}`,
      keyPoints: [
        { title: 'Punto 1', description: 'Descripción breve', icon: '🧩' },
        { title: 'Punto 2', description: 'Descripción breve', icon: '📦' }
      ],
      questions: [ { question: 'Pregunta 1', answer: 'Respuesta 1', difficulty: 'easy' } ]
    };
    setResult(mockResult);
    setProcessing(false);
  };

  const handleProcess = () => { if (file) simulateProcessing(); else alert('Selecciona un archivo de audio primero'); };
  const handleReset = () => { setFile(null); setResult(null); setProgress(0); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownloadText = (res) => {
    const content = `Título: ${res.title}\nDuración: ${res.duration}\n\n${res.summary}\n\nTranscripción:\n${res.transcript}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${res.title.replace(/\s+/g, '_')}.txt`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleCopySummary = async (res) => { try { await navigator.clipboard.writeText(res.summary); alert('Resumen copiado al portapapeles'); } catch { alert('No se pudo copiar al portapapeles'); } };
  const handleEmail = (res) => { const subject = encodeURIComponent(`Resumen de clase: ${res.title}`); const body = encodeURIComponent(`${res.summary}\n\nTranscripción:\n${res.transcript}`); window.location.href = `mailto:?subject=${subject}&body=${body}`; };

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
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={() => { handleReset(); if (setActiveView) setActiveView('upload'); }}>← Nueva Clase</button>
            <button className="btn-secondary" onClick={() => { if (setActiveView) setActiveView('history'); try { localStorage.setItem('classsummary_focus_id', String(result.id)); } catch(e){} }}>Ver en Historial</button>
          </div>
        </div>

        <div className="result-content">
          <div className="result-card">
            <div className="card-header"><h3 className="card-title"><span className="card-icon">📝</span>{t('summary')}</h3></div>
            <div className="card-body"><div className="summary-text">{result.summary}</div></div>
          </div>

          <div className="result-card">
            <div className="card-header"><h3 className="card-title"><span className="card-icon">🎯</span>{t('keyPoints')}</h3></div>
            <div className="card-body">
              <div className="keypoints-grid">{result.keyPoints.map((point, index) => (
                <div key={index} className="keypoint-item">
                  <div className="keypoint-icon">{point.icon}</div>
                  <div className="keypoint-content"><div className="keypoint-title">{point.title}</div><div className="keypoint-desc">{point.description}</div></div>
                </div>
              ))}</div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header"><h3 className="card-title"><span className="card-icon">❓</span>{t('questions')}</h3></div>
            <div className="card-body">
              <div className="questions-list">{result.questions.map((q, index) => (
                <details key={index} className="question-item">
                  <summary className="question-summary"><span className="question-number">{index + 1}</span><span className="question-text">{q.question}</span><span className={`question-difficulty ${q.difficulty}`}>{q.difficulty === 'easy' ? '⭐' : '⭐⭐'}</span></summary>
                  <div className="question-answer"><strong>Respuesta:</strong> {q.answer}</div>
                </details>
              ))}</div>
            </div>
          </div>

          <div className="result-card">
            <div className="card-header"><h3 className="card-title"><span className="card-icon">📄</span>{t('transcript')}</h3></div>
            <div className="card-body"><div className="transcript-text">{result.transcript}</div></div>
          </div>
        </div>

        <div className="result-actions">
          <button className="btn-download" onClick={() => handleDownloadText(result)}><span className="btn-icon">💾</span> Descargar TXT</button>
          <button className="btn-download" onClick={() => handleCopySummary(result)}><span className="btn-icon">📋</span> Copiar Resumen</button>
          <button className="btn-download" onClick={() => handleEmail(result)}><span className="btn-icon">📧</span> Enviar por Email</button>
        </div>
      </div>
    );
  }

  return (
    <div className="upload fade-in">
      <div className="upload-header">
        <h1 className="upload-title"><span className="title-icon">📤</span>{t('uploadTitle')}</h1>
        <p className="upload-description">Sube tu grabación de clase y deja que la IA genere resúmenes, puntos clave y preguntas automáticamente</p>
      </div>

      <div className={`upload-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => !file && fileInputRef.current?.click()}>
        <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileSelect} style={{ display: 'none' }} />
        {!file ? (
          <div className="upload-placeholder">
            <div className="placeholder-icon">🎙️</div>
            <h3 className="placeholder-title">{t('dragDrop')}</h3>
            <p className="placeholder-subtitle">Formatos soportados: MP3, WAV, M4A, OGG</p>
            <p className="placeholder-subtitle">Tamaño máximo: 500 MB</p>
          </div>
        ) : (
          <div className="file-preview">
            <div className="file-icon">🎵</div>
            <div className="file-info"><div className="file-name">{file.name}</div><div className="file-size">{formatFileSize(file.size)}</div><div className="file-type">{file.type}</div></div>
            <button className="file-remove" onClick={(e) => { e.stopPropagation(); handleReset(); }}>✕</button>
          </div>
        )}
      </div>

      {processing && (
        <div className="processing-section">
          <div className="processing-header"><div className="processing-icon">��</div><div className="processing-text"><h3 className="processing-title">{t('processing')}</h3><p className="processing-subtitle">La IA está analizando tu clase...</p></div></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
          <div className="progress-percentage">{progress}%</div>
        </div>
      )}

      {file && !processing && (
        <div className="upload-actions">
          <button className="btn-primary btn-large" onClick={handleProcess}><span className="btn-icon">✨</span> Procesar con IA</button>
          <button className="btn-secondary btn-large" onClick={handleReset}><span className="btn-icon">🔄</span> Cambiar Archivo</button>
        </div>
      )}

      <div className="upload-features">
        <div className="feature-item"><div className="feature-icon">⚡</div><div className="feature-text"><strong>Procesamiento Rápido</strong><p>Resultados en minutos</p></div></div>
        <div className="feature-item"><div className="feature-icon">🔒</div><div className="feature-text"><strong>100% Privado</strong><p>Tus archivos están seguros</p></div></div>
        <div className="feature-item"><div className="feature-icon">🌍</div><div className="feature-text"><strong>Multiidioma</strong><p>30+ idiomas soportados</p></div></div>
      </div>
    </div>
  );
};

export default Upload;
