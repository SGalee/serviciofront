# Script de Migración - Backend Django

Write-Host "🚀 Iniciando migración del Backend..." -ForegroundColor Green
Write-Host ""

# 1. Verificar si estamos en el directorio correcto
if (-not (Test-Path "manage.py")) {
    Write-Host "❌ Error: No se encuentra manage.py" -ForegroundColor Red
    Write-Host "Por favor, ejecuta este script desde el directorio raíz del proyecto Django" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Paso 1: Verificando dependencias..." -ForegroundColor Cyan
pip list | Select-String "djangorestframework-simplejwt"

Write-Host ""
Write-Host "🗄️ Paso 2: Eliminando base de datos anterior (si existe)..." -ForegroundColor Cyan
if (Test-Path "db.sqlite3") {
    Remove-Item "db.sqlite3" -Force
    Write-Host "✅ Base de datos eliminada" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No hay base de datos anterior" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🧹 Paso 3: Limpiando migraciones anteriores..." -ForegroundColor Cyan
if (Test-Path "tesis\migrations") {
    Get-ChildItem "tesis\migrations\0*.py" | Remove-Item -Force
    Write-Host "✅ Migraciones anteriores eliminadas" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No hay migraciones anteriores" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Paso 4: Creando nuevas migraciones..." -ForegroundColor Cyan
python manage.py makemigrations
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al crear migraciones" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "⚙️ Paso 5: Aplicando migraciones..." -ForegroundColor Cyan
python manage.py migrate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al aplicar migraciones" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ ¡Migración completada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Crear un superusuario (admin):" -ForegroundColor White
Write-Host "   python manage.py createsuperuser" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Iniciar el servidor:" -ForegroundColor White
Write-Host "   python manage.py runserver" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Acceder al admin en:" -ForegroundColor White
Write-Host "   http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host ""

# Preguntar si quiere crear superusuario ahora
Write-Host "¿Quieres crear un superusuario ahora? (S/N): " -NoNewline -ForegroundColor Yellow
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s") {
    Write-Host ""
    Write-Host "👤 Creando superusuario..." -ForegroundColor Cyan
    python manage.py createsuperuser
}

Write-Host ""
Write-Host "¿Quieres iniciar el servidor ahora? (S/N): " -NoNewline -ForegroundColor Yellow
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s") {
    Write-Host ""
    Write-Host "🚀 Iniciando servidor..." -ForegroundColor Green
    python manage.py runserver
}
