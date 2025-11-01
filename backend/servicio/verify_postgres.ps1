# Script de Verificación de Configuración PostgreSQL

Write-Host "🔍 Verificando configuración de PostgreSQL..." -ForegroundColor Cyan
Write-Host ""

# 1. Verificar que PostgreSQL está instalado
Write-Host "1. Verificando instalación de PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "   ✅ PostgreSQL instalado: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ PostgreSQL no encontrado. Por favor, instálalo desde:" -ForegroundColor Red
    Write-Host "      https://www.postgresql.org/download/windows/" -ForegroundColor White
    exit 1
}

Write-Host ""

# 2. Verificar que el servicio está corriendo
Write-Host "2. Verificando servicio de PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service postgresql* -ErrorAction SilentlyContinue | Select-Object -First 1
if ($pgService) {
    if ($pgService.Status -eq "Running") {
        Write-Host "   ✅ Servicio PostgreSQL corriendo: $($pgService.Name)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Servicio PostgreSQL detenido. Iniciando..." -ForegroundColor Yellow
        Start-Service $pgService.Name
        Write-Host "   ✅ Servicio iniciado" -ForegroundColor Green
    }
} else {
    Write-Host "   ❌ Servicio PostgreSQL no encontrado" -ForegroundColor Red
}

Write-Host ""

# 3. Verificar archivo .env
Write-Host "3. Verificando archivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ Archivo .env existe" -ForegroundColor Green
    
    # Leer configuración
    $envContent = Get-Content .env
    $dbName = ($envContent | Select-String "DB_NAME=").ToString().Split("=")[1]
    $dbUser = ($envContent | Select-String "DB_USER=").ToString().Split("=")[1]
    $dbHost = ($envContent | Select-String "DB_HOST=").ToString().Split("=")[1]
    $dbPort = ($envContent | Select-String "DB_PORT=").ToString().Split("=")[1]
    
    Write-Host "      DB_NAME: $dbName" -ForegroundColor White
    Write-Host "      DB_USER: $dbUser" -ForegroundColor White
    Write-Host "      DB_HOST: $dbHost" -ForegroundColor White
    Write-Host "      DB_PORT: $dbPort" -ForegroundColor White
    
    # Verificar contraseña
    if ($envContent -match "DB_PASSWORD=tu_password_aqui" -or $envContent -match "DB_PASSWORD=$") {
        Write-Host "   ⚠️ ADVERTENCIA: Debes configurar DB_PASSWORD en el archivo .env" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 4. Verificar python-dotenv
Write-Host "4. Verificando python-dotenv..." -ForegroundColor Yellow
$dotenvInstalled = pip list | Select-String "python-dotenv"
if ($dotenvInstalled) {
    Write-Host "   ✅ python-dotenv instalado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ python-dotenv no instalado. Instalando..." -ForegroundColor Yellow
    pip install python-dotenv
    Write-Host "   ✅ python-dotenv instalado" -ForegroundColor Green
}

Write-Host ""

# 5. Verificar psycopg2
Write-Host "5. Verificando psycopg2-binary..." -ForegroundColor Yellow
$psycopgInstalled = pip list | Select-String "psycopg2-binary"
if ($psycopgInstalled) {
    Write-Host "   ✅ psycopg2-binary instalado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ psycopg2-binary no instalado. Instalando..." -ForegroundColor Yellow
    pip install psycopg2-binary
    Write-Host "   ✅ psycopg2-binary instalado" -ForegroundColor Green
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# 6. Instrucciones
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Edita el archivo .env y configura tu contraseña de PostgreSQL:" -ForegroundColor White
Write-Host "   DB_PASSWORD=tu_contraseña_real" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Crea la base de datos (elige una opción):" -ForegroundColor White
Write-Host ""
Write-Host "   Opción A - Usar pgAdmin:" -ForegroundColor Cyan
Write-Host "   • Abre pgAdmin 4" -ForegroundColor Gray
Write-Host "   • Click derecho en Databases → Create → Database" -ForegroundColor Gray
Write-Host "   • Nombre: servicio_tesis_db" -ForegroundColor Gray
Write-Host ""
Write-Host "   Opción B - Usar psql:" -ForegroundColor Cyan
Write-Host "   psql -U postgres -c `"CREATE DATABASE servicio_tesis_db;`"" -ForegroundColor Gray
Write-Host ""
Write-Host "   Opción C - Usar el script SQL:" -ForegroundColor Cyan
Write-Host "   psql -U postgres -f setup_database.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Aplicar migraciones:" -ForegroundColor White
Write-Host "   python manage.py makemigrations" -ForegroundColor Cyan
Write-Host "   python manage.py migrate" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Crear superusuario:" -ForegroundColor White
Write-Host "   python manage.py createsuperuser" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Iniciar servidor:" -ForegroundColor White
Write-Host "   python manage.py runserver" -ForegroundColor Cyan
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentación completa en: CONFIGURAR_POSTGRESQL.md" -ForegroundColor Yellow
Write-Host ""
