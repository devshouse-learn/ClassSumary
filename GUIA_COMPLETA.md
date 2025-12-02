# 📘 Guía Completa - ClassSummary

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación Detallada](#instalación-detallada)
3. [Arquitectura](#arquitectura)
4. [Características Completas](#características-completas)
5. [Guía de Usuario](#guía-de-usuario)
6. [API y Contextos](#api-y-contextos)
7. [Personalización](#personalización)
8. [Troubleshooting](#troubleshooting)
9. [FAQ](#faq)

---

## Introducción

ClassSummary es una aplicación web progresiva (PWA) construida con React que utiliza inteligencia artificial para procesar grabaciones de clase y generar:

- Transcripciones completas
- Resúmenes concisos
- Puntos clave identificados
- Preguntas de repaso con respuestas

### Características Destacadas

- 🌍 **30+ Idiomas**: Soporte multiidioma completo
- 🔐 **Autenticación**: Login, registro y modo invitado
- 📱 **Responsive**: Funciona en todos los dispositivos
- 💾 **Offline**: Datos almacenados localmente
- 🎨 **Moderno**: Diseño con gradientes y animaciones
- ⚡ **Rápido**: Procesamiento optimizado

---

## Instalación Detallada

### Requisitos del Sistema

```
Node.js: >= 14.0.0
npm: >= 6.0.0
Navegador: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
RAM: 4GB mínimo
Espacio: 500MB para archivos temporales
```

### Instalación Paso a Paso

#### 1. Clonar o Descargar el Proyecto

```bash
# Si tienes Git
git clone https://github.com/tu-usuario/ClassSummary.git
cd ClassSummary

# O descomprime el ZIP y navega al directorio
cd ClassSummary
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala:
- React y React-DOM
- React Scripts
- Lucide React (iconos)
- Todas las dependencias necesarias

#### 3. Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz:

```env
REACT_APP_NAME=ClassSummary
REACT_APP_VERSION=1.0.0
REACT_APP_MAX_FILE_SIZE=524288000
```

#### 4. Iniciar en Desarrollo

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

#### 5. Build para Producción

```bash
npm run build
```

Genera una carpeta `build/` lista para desplegar.

---

## Arquitectura

### Estructura de Componentes

```
App (Root)
├── AuthProvider (Context)
│   └── LanguageProvider (Context)
│       ├── Auth (Login/Register/Guest)
│       └── AppContent
│           ├── Sidebar (Navigation)
│           └── Main Content
│               ├── Dashboard
│               ├── Upload
│               ├── History
│               ├── Settings
│               └── Help
```

### Flujo de Datos

```
User Action
    ↓
Component
    ↓
Context (State Management)
    ↓
LocalStorage (Persistence)
    ↓
UI Update
```

### Contextos Principales

#### AuthContext
Gestiona la autenticación y sesión del usuario:
- `user`: Objeto con datos del usuario
- `register()`: Registrar nuevo usuario
- `login()`: Iniciar sesión
- `loginAsGuest()`: Modo invitado
- `logout()`: Cerrar sesión
- `updateUserPreferences()`: Actualizar preferencias

#### LanguageContext
Gestiona el idioma de la interfaz:
- `currentLanguage`: Código del idioma actual
- `changeLanguage()`: Cambiar idioma
- `t()`: Función de traducción
- `SUPPORTED_LANGUAGES`: 30+ idiomas disponibles

---

## Características Completas

### 1. Sistema de Autenticación

#### Registro
```javascript
// Campos requeridos
{
  name: string,      // Nombre completo
  email: string,     // Email válido
  password: string   // Mínimo 6 caracteres
}
```

#### Login
```javascript
// Campos requeridos
{
  email: string,
  password: string
}
```

#### Modo Invitado
- Acceso sin registro
- Funciones completas
- Datos temporales
- ID único generado

### 2. Procesamiento de Audio

#### Formatos Soportados
- MP3 (audio/mpeg)
- WAV (audio/wav)
- M4A (audio/mp4)
- OGG (audio/ogg)
- FLAC (audio/flac)

#### Limitaciones
- Tamaño máximo: 500 MB
- Duración máxima: 3 horas
- Calidad mínima recomendada: 128 kbps

#### Proceso de IA (Simulado)

```javascript
1. Upload del archivo (0-20%)
2. Validación y conversión (20-40%)
3. Transcripción con IA (40-60%)
4. Generación de resumen (60-80%)
5. Extracción de puntos clave (80-90%)
6. Creación de preguntas (90-100%)
```

### 3. Resultados Generados

#### Transcripción
- Texto completo del audio
- Formato legible con párrafos
- Timestamps opcionales

#### Resumen
- Versión condensada (20-30% del original)
- Estructura clara con secciones
- Formato Markdown soportado

#### Puntos Clave
```javascript
{
  title: string,        // Título del punto
  description: string,  // Descripción detallada
  icon: emoji          // Ícono representativo
}
```

#### Preguntas
```javascript
{
  question: string,    // La pregunta
  answer: string,      // Respuesta detallada
  difficulty: enum     // 'easy', 'medium', 'hard'
}
```

### 4. Sistema Multiidioma

#### Idiomas Completos
```javascript
const languages = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  // ... 20+ más
};
```

#### Agregar Nuevo Idioma

1. Edita `src/context/LanguageContext.js`
2. Agrega el código y metadata:
```javascript
SUPPORTED_LANGUAGES: {
  // ...
  xx: {
    name: 'Language Name',
    flag: '🏳️',
    nativeName: 'Native Name'
  }
}
```
3. Agrega traducciones:
```javascript
translations: {
  xx: {
    dashboard: 'Translated text',
    upload: 'Translated text',
    // ...
  }
}
```

### 5. Gestión de Datos

#### LocalStorage Keys
```javascript
'classsummary_user'         // Usuario actual
'classsummary_users'        // Todos los usuarios
'classsummary_classes'      // Clases procesadas
'classsummary_language'     // Idioma seleccionado
'classsummary_preferences'  // Preferencias de usuario
```

#### Estructura de Datos

**Usuario:**
```javascript
{
  id: string,
  email: string,
  name: string,
  isGuest: boolean,
  createdAt: ISO8601,
  preferences: {
    language: string,
    autoSave: boolean,
    notifications: boolean
  }
}
```

**Clase Procesada:**
```javascript
{
  id: string,
  title: string,
  date: ISO8601,
  duration: string,
  audioFile: File,
  transcript: string,
  summary: string,
  keyPoints: Array<KeyPoint>,
  questions: Array<Question>,
  userId: string
}
```

### 6. Exportación de Datos

#### Formato JSON
```javascript
{
  user: UserObject,
  classes: Array<Class>,
  exportDate: ISO8601,
  version: string
}
```

#### Formato PDF (Próximamente)
- Encabezado con logo
- Resumen formateado
- Puntos clave con iconos
- Preguntas numeradas
- Pie de página con fecha

---

## Guía de Usuario

### Dashboard

El dashboard muestra:

1. **Estadísticas**
   - Clases procesadas
   - Horas de audio
   - Resúmenes guardados
   - Preguntas generadas

2. **Clases Recientes**
   - Últimas 3 clases procesadas
   - Acceso rápido a resúmenes
   - Información resumida

3. **Acciones Rápidas**
   - Subir nueva clase
   - Ver historial completo
   - Ir a configuración

### Upload

#### Proceso de Subida

1. **Selección**
   - Drag & drop
   - Click para explorar
   - Validación automática

2. **Vista Previa**
   - Nombre del archivo
   - Tamaño
   - Tipo
   - Botón para cambiar

3. **Procesamiento**
   - Barra de progreso
   - Mensajes de estado
   - Tiempo estimado

4. **Resultados**
   - Vista completa de resultados
   - Pestañas navegables
   - Acciones de exportación

### History

#### Funciones

- **Búsqueda**: Filtra por nombre de clase
- **Ordenamiento**: Por fecha, duración, etc.
- **Acciones por Clase**:
  - Ver resumen completo
  - Descargar PDF
  - Copiar al portapapeles
  - Eliminar

#### Filtros Disponibles

```javascript
{
  all: 'Todas las clases',
  recent: 'Más recientes',
  oldest: 'Más antiguas',
  longest: 'Más largas',
  shortest: 'Más cortas'
}
```

### Settings

#### Secciones

1. **Información de Usuario**
   - Nombre
   - Email
   - Tipo de cuenta

2. **Idioma**
   - Selector con 30+ opciones
   - Búsqueda de idiomas
   - Vista previa del cambio

3. **Preferencias**
   - Guardado automático
   - Notificaciones
   - Tema (próximamente)

4. **Datos y Privacidad**
   - Exportar datos
   - Eliminar cuenta
   - Ver política de privacidad

### Help

#### Contenido

1. **Guía de Inicio Rápido**
   - 4 pasos ilustrados
   - Enlaces directos

2. **Características**
   - Descripción de cada función
   - Capturas de pantalla

3. **FAQ**
   - Preguntas frecuentes
   - Respuestas detalladas
   - Expandible/colapsable

4. **Contacto**
   - Email de soporte
   - Chat en vivo
   - Formulario de contacto

---

## API y Contextos

### AuthContext API

```javascript
// Hook
const { 
  user,                    // Usuario actual
  loading,                 // Estado de carga
  isAuthenticated,         // Boolean
  isGuest,                 // Boolean
  register,                // Function
  login,                   // Function
  loginAsGuest,            // Function
  logout,                  // Function
  updateUserPreferences    // Function
} = useAuth();

// Uso
register(email, password, name);
login(email, password);
loginAsGuest();
logout();
updateUserPreferences({ language: 'es' });
```

### LanguageContext API

```javascript
// Hook
const { 
  currentLanguage,         // Código actual (ej: 'es')
  changeLanguage,          // Function
  t,                       // Función traducción
  languages,               // Objeto de idiomas
  getCurrentLanguageInfo   // Function
} = useLanguage();

// Uso
changeLanguage('en');
const text = t('dashboard');  // Traduce 'dashboard'
const info = getCurrentLanguageInfo();  // { name, flag, nativeName }
```

---

## Personalización

### Cambiar Colores

Edita las variables CSS en cada archivo `.css`:

```css
/* Colores principales */
--primary-color: #667eea;
--secondary-color: #764ba2;
--success-color: #43e97b;
--danger-color: #ff4444;
--warning-color: #ffeb3b;

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

### Agregar Nuevas Vistas

1. Crear componente en `src/components/`:
```javascript
// MiNuevaVista.js
import React from 'react';
import './MiNuevaVista.css';

const MiNuevaVista = () => {
  return (
    <div className="mi-nueva-vista">
      {/* Contenido */}
    </div>
  );
};

export default MiNuevaVista;
```

2. Agregar ruta en `App.js`:
```javascript
case 'mi-vista':
  return <MiNuevaVista />;
```

3. Agregar al menú en `Sidebar.js`:
```javascript
const menuItems = [
  // ...
  { 
    id: 'mi-vista', 
    icon: '🎯', 
    label: 'Mi Vista', 
    color: '#667eea' 
  }
];
```

### Personalizar Traducciones

Edita `src/context/LanguageContext.js`:

```javascript
const translations = {
  es: {
    // Agrega o modifica claves
    miNuevaClave: 'Mi texto en español'
  },
  en: {
    miNuevaClave: 'My text in English'
  }
};
```

Usa en componentes:
```javascript
const { t } = useLanguage();
<p>{t('miNuevaClave')}</p>
```

---

## Troubleshooting

### Problemas Comunes

#### 1. No se inicia la aplicación

**Problema**: Error al ejecutar `npm start`

**Soluciones**:
```bash
# Limpar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node
node --version  # Debe ser >= 14
```

#### 2. Error de compilación

**Problema**: Errores de sintaxis o módulos no encontrados

**Soluciones**:
```bash
# Verificar que todos los archivos existen
# Revisar imports en cada archivo

# Reinstalar dependencia específica
npm install react@18.2.0 react-dom@18.2.0
```

#### 3. No se guardan los datos

**Problema**: Los datos desaparecen al recargar

**Soluciones**:
- Verificar que localStorage está habilitado
- Verificar que no estás en modo incógnito
- Revisar la consola por errores de localStorage
- Limpiar localStorage y reiniciar:
```javascript
localStorage.clear();
location.reload();
```

#### 4. El audio no se procesa

**Problema**: El archivo no se sube o el proceso se detiene

**Soluciones**:
- Verificar formato del archivo (MP3, WAV, M4A, OGG)
- Verificar tamaño (máximo 500 MB)
- Verificar que el archivo no está corrupto
- Intentar con otro archivo

#### 5. Interfaz no responsive

**Problema**: La interfaz no se adapta al móvil

**Soluciones**:
```css
/* Verificar meta viewport en index.html */
<meta name="viewport" content="width=device-width, initial-scale=1" />

/* Limpiar caché del navegador */
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Logs y Debugging

#### Habilitar Logs

```javascript
// En desarrollo, React muestra logs automáticamente
// Para logs adicionales, agrega:
console.log('Debug:', variable);

// En producción, usar:
if (process.env.NODE_ENV === 'development') {
  console.log('Debug:', variable);
}
```

#### React DevTools

1. Instalar extensión de Chrome/Firefox
2. Abrir DevTools (F12)
3. Pestaña "Components" y "Profiler"
4. Inspeccionar contextos y props

---

## FAQ

### General

**P: ¿Es gratis?**
R: Sí, completamente gratis y open source.

**P: ¿Necesito Internet?**
R: Solo para la instalación inicial. Luego funciona offline.

**P: ¿Los datos están seguros?**
R: Sí, se almacenan localmente en tu navegador. Nunca se envían a servidores.

**P: ¿Funciona en móvil?**
R: Sí, es totalmente responsive.

### Técnicas

**P: ¿Puedo integrar una API de transcripción real?**
R: Sí, modifica `Upload.js` para llamar a tu API preferida (Google Speech-to-Text, AWS Transcribe, etc.).

**P: ¿Cómo despliego en producción?**
R: 
```bash
npm run build
# Sube la carpeta build/ a tu hosting
# Netlify, Vercel, GitHub Pages, etc.
```

**P: ¿Puedo usar una base de datos?**
R: Sí, reemplaza localStorage con Firebase, Supabase, o tu backend preferido.

**P: ¿Soporta TypeScript?**
R: No actualmente, pero puedes migrar agregando tipos gradualmente.

### Funcionalidades

**P: ¿Cuántas clases puedo procesar?**
R: Ilimitadas (depende del espacio en localStorage ~5-10 MB).

**P: ¿Puedo compartir resúmenes?**
R: Sí, mediante descarga PDF, copiar o email.

**P: ¿Hay límite de duración de audio?**
R: Recomendado hasta 3 horas por razones de performance.

**P: ¿Se puede usar con video?**
R: Actualmente no, pero puedes extraer el audio del video primero.

---

## Conclusión

ClassSummary es una aplicación completa y profesional lista para usar. Esta guía cubre todos los aspectos del proyecto, desde la instalación hasta la personalización avanzada.

Para más información:
- 📧 Email: soporte@classsummary.com
- 📖 Documentación online: www.classsummary.com/docs
- 🐛 GitHub Issues: github.com/tu-usuario/ClassSummary/issues

**¡Gracias por usar ClassSummary!** 🎓✨

---

*Última actualización: Diciembre 2024*
*Versión: 1.0.0*
