#!/bin/bash

# Script de inicio rápido para ClassSummary
# ==========================================

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🎓 CLASSSUMMARY - INICIO RÁPIDO 🎓                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF

echo ""
echo "⚡ Iniciando ClassSummary..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Error: Node.js no está instalado"
    echo "📥 Por favor instala Node.js desde: https://nodejs.org"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "⚠️  Advertencia: Node.js versión 14 o superior recomendada"
fi

echo "✅ Node.js detectado: $(node -v)"
echo "✅ npm detectado: $(npm -v)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    echo "   (Esto puede tomar 1-2 minutos la primera vez)"
    echo ""
    npm install
    echo ""
fi

echo "🚀 Iniciando aplicación..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   La aplicación se abrirá automáticamente en:"
echo "   📱 http://localhost:3000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Consejo: Puedes cerrar esta ventana después de que se abra el navegador"
echo ""
echo "🛑 Para detener la aplicación: Presiona Ctrl + C"
echo ""

# Iniciar la aplicación
npm start
