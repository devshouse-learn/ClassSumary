# 🎓 ClassSummary - Resúmenes Inteligentes de Clases con IA

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

**ClassSummary** es una aplicación web inteligente que utiliza inteligencia artificial para transformar tus grabaciones de clase en resúmenes concisos, puntos clave y preguntas de repaso automáticamente. Compatible con más de 30 idiomas y con una interfaz moderna e intuitiva.

---

## ✨ Características Principales

### 🎙️ **Procesamiento de Audio Avanzado**
- Sube archivos de audio en múltiples formatos (MP3, WAV, M4A, OGG)
- Transcripción automática con alta precisión
- Procesamiento rápido (2-5 minutos por clase)
- Soporte para archivos de hasta 500 MB

### 🤖 **IA Inteligente**
- **Resúmenes automáticos**: Captura la esencia de cada clase
- **Puntos clave**: Identifica los conceptos más importantes
- **Preguntas de repaso**: Genera preguntas con respuestas para reforzar el aprendizaje
- **Transcripción completa**: Texto completo de la clase

### 🌍 **Multiidioma (30+ Idiomas)**
- Español, Inglés, Francés, Alemán, Italiano, Portugués
- Chino, Japonés, Coreano, Árabe, Hindi
- Y muchos más idiomas soportados
- Cambio de idioma en tiempo real

### 👤 **Sistema de Autenticación**
- **Registro de usuarios** con email y contraseña
- **Inicio de sesión** seguro
- **Modo invitado** funcional (sin registro)
- Persistencia de sesión

### 📱 **Interfaz Moderna**
- Diseño responsive (móvil, tablet, desktop)
- Menú lateral desplegable
- Animaciones suaves y profesionales
- Tema con gradientes vibrantes
- Experiencia de usuario intuitiva

### 💾 **Gestión de Datos**
- Historial completo de clases procesadas
- Exportación de resúmenes en PDF
- Copia al portapapeles
- Envío por email
- Almacenamiento local seguro

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 14+ instalado
- npm o yarn

### Instalación

```bash
# 1. Clonar o navegar al directorio del proyecto
cd ClassSummary

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

---

## 📖 Cómo Usar

### 1️⃣ **Autenticación**
- **Opción A**: Regístrate con email, contraseña y nombre
- **Opción B**: Inicia sesión si ya tienes cuenta
- **Opción C**: Continúa como invitado (datos temporales)

### 2️⃣ **Subir una Clase**
1. Ve a la sección **"Subir Audio"** en el menú lateral
2. Arrastra tu archivo de audio o haz clic para seleccionarlo
3. Haz clic en **"Procesar con IA"**
4. Espera mientras la IA analiza tu clase (2-5 minutos)

### 3️⃣ **Ver Resultados**
Una vez procesado, obtendrás:
- 📝 **Resumen completo** de la clase
- 🎯 **Puntos clave** más importantes
- ❓ **Preguntas de repaso** con respuestas
- 📄 **Transcripción completa** del audio

### 4️⃣ **Gestionar Resúmenes**
- **Ver Historial**: Accede a todas tus clases procesadas
- **Descargar**: Guarda los resúmenes en PDF
- **Copiar**: Copia el contenido al portapapeles
- **Compartir**: Envía por email

### 5️⃣ **Configuración**
- Cambia el idioma de la interfaz (30+ opciones)
- Configura preferencias de guardado automático
- Activa/desactiva notificaciones
- Exporta todos tus datos

---

## 📂 Estructura del Proyecto

```
ClassSummary/
├── public/
│   └── index.html              # HTML principal
├── src/
│   ├── components/
│   │   ├── Auth.js             # Login/Registro/Invitado
│   │   ├── Auth.css
│   │   ├── Sidebar.js          # Menú lateral
│   │   ├── Sidebar.css
│   │   ├── Dashboard.js        # Panel principal
│   │   ├── Dashboard.css
│   │   ├── Upload.js           # Subida y procesamiento
│   │   ├── Upload.css
│   │   ├── History.js          # Historial de clases
│   │   ├── History.css
│   │   ├── Settings.js         # Configuración
│   │   ├── Settings.css
│   │   ├── Help.js             # Centro de ayuda
│   │   └── Help.css
│   ├── context/
│   │   ├── AuthContext.js      # Contexto de autenticación
│   │   └── LanguageContext.js  # Contexto de idiomas (30+)
│   ├── App.js                  # Componente principal
│   ├── App.css
│   ├── index.js                # Punto de entrada
│   └── index.css
├── package.json
└── README.md
```

---

## 🎨 Capturas de Pantalla

### Autenticación
- Pantalla de inicio con opciones de login, registro y modo invitado
- Diseño moderno con gradientes y animaciones

### Dashboard
- Estadísticas de uso
- Clases recientes
- Acciones rápidas

### Subida de Audio
- Interfaz drag-and-drop intuitiva
- Barra de progreso en tiempo real
- Vista previa del archivo

### Resultados
- Resumen estructurado
- Puntos clave visuales
- Preguntas interactivas con respuestas ocultas
- Transcripción completa

---

## 🌍 Idiomas Soportados

La aplicación incluye soporte nativo para más de 30 idiomas:

| Idioma | Código | Emoji |
|--------|--------|-------|
| Español | es | 🇪🇸 |
| English | en | 🇬🇧 |
| Français | fr | 🇫🇷 |
| Deutsch | de | 🇩🇪 |
| Italiano | it | 🇮🇹 |
| Português | pt | 🇵🇹 |
| Русский | ru | 🇷🇺 |
| 中文 | zh | 🇨🇳 |
| 日本語 | ja | 🇯🇵 |
| 한국어 | ko | 🇰🇷 |
| العربية | ar | 🇸🇦 |
| हिन्दी | hi | 🇮🇳 |
| **Y 20+ más** | ... | ... |

---

## 💻 Tecnologías Utilizadas

- **Frontend**: React 18.2.0
- **Estilos**: CSS3 con animaciones y gradientes
- **Iconos**: Emojis nativos
- **Estado**: Context API (Auth, Language)
- **Almacenamiento**: LocalStorage
- **Responsive**: Mobile-first design

---

## 🔒 Privacidad y Seguridad

- **100% Local**: Los datos se almacenan en tu navegador
- **Sin servidor**: No enviamos tus archivos a servidores externos
- **Modo Invitado**: Prueba sin registro
- **Exportación**: Descarga tus datos en cualquier momento
- **Control Total**: Elimina tu cuenta y datos cuando quieras

---

## 📝 Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test

# Analizar el bundle
npm run analyze
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🐛 Reporte de Bugs

Si encuentras algún error, por favor:
1. Verifica que no esté ya reportado en Issues
2. Crea un nuevo Issue con:
   - Descripción del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si es posible

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**ClassSummary Team**
- Email: soporte@classsummary.com
- Web: www.classsummary.com

---

## 🙏 Agradecimientos

- Comunidad de React
- Diseños inspirados en aplicaciones modernas
- Usuarios beta testers

---

## 📱 Soporte

¿Necesitas ayuda?
- 📧 Email: soporte@classsummary.com
- 💬 Chat en vivo dentro de la app
- 📖 Documentación completa en `/help`

---

## 🔄 Versiones

### v1.0.0 (Diciembre 2024)
- ✅ Lanzamiento inicial
- ✅ Sistema de autenticación completo
- ✅ Procesamiento con IA
- ✅ 30+ idiomas soportados
- ✅ Interfaz responsive
- ✅ Historial y exportación

---

## 🎯 Roadmap

### Próximas Características
- [ ] Integración con API real de transcripción
- [ ] Soporte para video
- [ ] Colaboración en tiempo real
- [ ] App móvil nativa
- [ ] Sincronización en la nube
- [ ] Análisis de sentimientos
- [ ] Resúmenes por capítulos

---

**¡Gracias por usar ClassSummary! 🎓✨**

*Transforma tus clases en conocimiento organizado*
