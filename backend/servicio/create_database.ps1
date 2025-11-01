# Script Rápido para Crear Base de Datos PostgreSQL

Write-Host "🐘 Creando base de datos PostgreSQL..." -ForegroundColor Cyan
Write-Host ""

# Leer configuración del .env
if (Test-Path ".env") {
    $envContent = Get-Content .env
    $dbName = ($envContent | Select-String "DB_NAME=").ToString().Split("=")[1]
    $dbUser = ($envContent | Select-String "DB_USER=").ToString().Split("=")[1]
    
    Write-Host "Base de datos: $dbName" -ForegroundColor Yellow
    Write-Host "Usuario: $dbUser" -ForegroundColor Yellow
    Write-Host ""
    
    # Intentar crear la base de datos
    Write-Host "Creando base de datos..." -ForegroundColor Cyan
    Write-Host "Se te pedirá la contraseña de PostgreSQL" -ForegroundColor Gray
    Write-Host ""
    
    $createDbCommand = "CREATE DATABASE $dbName;"
    
    try {
        $result = psql -U $dbUser -c $createDbCommand 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Base de datos '$dbName' creada exitosamente!" -ForegroundColor Green
        } else {
            if ($result -like "*already exists*") {
                Write-Host "ℹ️ La base de datos '$dbName' ya existe" -ForegroundColor Yellow
            } else {
                Write-Host "❌ Error al crear la base de datos:" -ForegroundColor Red
                Write-Host $result -ForegroundColor Gray
                exit 1
            }
        }
    } catch {
        Write-Host "❌ Error: $_" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✅ CONFIGURACIÓN COMPLETA" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. python manage.py makemigrations" -ForegroundColor Cyan
    Write-Host "2. python manage.py migrate" -ForegroundColor Cyan
    Write-Host "3. python manage.py createsuperuser" -ForegroundColor Cyan
    Write-Host "4. python manage.py runserver" -ForegroundColor Cyan
    Write-Host ""
    
} else {
    Write-Host "❌ Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}
