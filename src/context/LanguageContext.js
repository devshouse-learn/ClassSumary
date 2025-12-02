import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};

// Más de 30 idiomas soportados
export const SUPPORTED_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  fr: { name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  de: { name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  it: { name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  pt: { name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  ru: { name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  zh: { name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  ja: { name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  ko: { name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  ar: { name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  hi: { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  nl: { name: 'Nederlands', flag: '🇳🇱', nativeName: 'Nederlands' },
  sv: { name: 'Svenska', flag: '🇸🇪', nativeName: 'Svenska' },
  no: { name: 'Norsk', flag: '🇳🇴', nativeName: 'Norsk' },
  da: { name: 'Dansk', flag: '🇩🇰', nativeName: 'Dansk' },
  fi: { name: 'Suomi', flag: '🇫🇮', nativeName: 'Suomi' },
  pl: { name: 'Polski', flag: '🇵🇱', nativeName: 'Polski' },
  tr: { name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  el: { name: 'Ελληνικά', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  cs: { name: 'Čeština', flag: '🇨🇿', nativeName: 'Čeština' },
  hu: { name: 'Magyar', flag: '🇭🇺', nativeName: 'Magyar' },
  ro: { name: 'Română', flag: '🇷🇴', nativeName: 'Română' },
  uk: { name: 'Українська', flag: '🇺🇦', nativeName: 'Українська' },
  th: { name: 'Thai', flag: '🇹🇭', nativeName: 'ไทย' },
  vi: { name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  id: { name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
  ms: { name: 'Malay', flag: '🇲🇾', nativeName: 'Bahasa Melayu' },
  tl: { name: 'Tagalog', flag: '🇵🇭', nativeName: 'Tagalog' },
  he: { name: 'Hebrew', flag: '🇮🇱', nativeName: 'עברית' },
  bn: { name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  fa: { name: 'Persian', flag: '🇮🇷', nativeName: 'فارسی' },
  ca: { name: 'Català', flag: '🏴', nativeName: 'Català' },
  sk: { name: 'Slovenčina', flag: '🇸🇰', nativeName: 'Slovenčina' }
};

const translations = {
  es: {
    // Navegación
    dashboard: 'Inicio',
    upload: 'Subir Audio',
    history: 'Historial',
    settings: 'Configuración',
    help: 'Ayuda',
    logout: 'Cerrar Sesión',
    
    // Auth
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    guest: 'Continuar como Invitado',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    name: 'Nombre Completo',
    
    // Dashboard
    welcomeBack: 'Bienvenido de nuevo',
    recentClasses: 'Clases Recientes',
    statistics: 'Estadísticas',
    quickActions: 'Acciones Rápidas',
    
    // Upload
    uploadTitle: 'Subir Clase Grabada',
    dragDrop: 'Arrastra tu archivo aquí o haz clic para seleccionar',
    processing: 'Procesando...',
    
    // Results
    summary: 'Resumen',
    keyPoints: 'Puntos Clave',
    questions: 'Preguntas Generadas',
    transcript: 'Transcripción',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    download: 'Descargar',
    language: 'Idioma',
    loading: 'Cargando...'
  },
  en: {
    dashboard: 'Dashboard',
    upload: 'Upload Audio',
    history: 'History',
    settings: 'Settings',
    help: 'Help',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    guest: 'Continue as Guest',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    welcomeBack: 'Welcome back',
    recentClasses: 'Recent Classes',
    statistics: 'Statistics',
    quickActions: 'Quick Actions',
    uploadTitle: 'Upload Recorded Class',
    dragDrop: 'Drag your file here or click to select',
    processing: 'Processing...',
    summary: 'Summary',
    keyPoints: 'Key Points',
    questions: 'Generated Questions',
    transcript: 'Transcript',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    download: 'Download',
    language: 'Language',
    loading: 'Loading...'
  }
  // Más traducciones se pueden agregar según sea necesario
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('classsummary_language') || 'es';
  });

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('classsummary_language', langCode);
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages: SUPPORTED_LANGUAGES,
    getCurrentLanguageInfo: () => SUPPORTED_LANGUAGES[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
