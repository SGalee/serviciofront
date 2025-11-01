# 🔧 COMANDOS RÁPIDOS - BACKEND

## 📦 Instalación Inicial

```powershell
# Instalar dependencias
pip install -r requirements.txt
```

## 🔄 Migración de Base de Datos

```powershell
# Opción 1: Usar el script automático
.\migrate.ps1

# Opción 2: Comandos manuales
# Eliminar base de datos antigua
Remove-Item db.sqlite3 -Force

# Eliminar migraciones anteriores
Get-ChildItem tesis\migrations\0*.py | Remove-Item -Force

# Crear nuevas migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
```

## 🚀 Iniciar Servidor

```powershell
python manage.py runserver
```

## 👤 Crear Usuarios de Prueba

```powershell
# Ejecutar shell de Django
python manage.py shell
```

```python
from tesis.models import User

# Crear Admin
admin = User.objects.create_user(
    username='admin',
    email='admin@example.com',
    password='admin123',
    first_name='Admin',
    last_name='Sistema',
    role='admin',
    is_staff=True,
    is_superuser=True
)

# Crear Docente
docente = User.objects.create_user(
    username='docente',
    email='docente@example.com',
    password='docente123',
    first_name='Juan',
    last_name='Profesor',
    role='docente'
)

# Crear Estudiante
estudiante = User.objects.create_user(
    username='estudiante',
    email='estudiante@example.com',
    password='estudiante123',
    first_name='María',
    last_name='Estudiante',
    role='estudiante'
)

print("✅ Usuarios de prueba creados")
exit()
```

## 📝 Crear Datos de Prueba (Tesis)

```python
# En el shell de Django (python manage.py shell)
from tesis.models import Tesis, User

docente = User.objects.get(username='docente')

# Crear tesis de ejemplo
tesis1 = Tesis.objects.create(
    titulo='Desarrollo de Aplicaciones Web con Django y React',
    autor='María García López',
    fecha_publicacion=2024,
    resumen='Esta tesis explora el desarrollo de aplicaciones web modernas utilizando Django como backend y React como frontend...',
    tutor='Dr. Juan Pérez',
    creado_por=docente
)

tesis2 = Tesis.objects.create(
    titulo='Machine Learning aplicado a la Predicción de Enfermedades',
    autor='Carlos Rodríguez Martínez',
    fecha_publicacion=2023,
    resumen='Investigación sobre la aplicación de algoritmos de machine learning para la predicción temprana de enfermedades...',
    tutor='Dra. Ana Fernández',
    creado_por=docente
)

tesis3 = Tesis.objects.create(
    titulo='Sistemas de Información Geográfica en la Planificación Urbana',
    autor='Laura Sánchez Torres',
    fecha_publicacion=2024,
    resumen='Análisis del uso de sistemas de información geográfica en procesos de planificación urbana sostenible...',
    tutor='Dr. Roberto Gómez',
    creado_por=docente
)

print("✅ Tesis de prueba creadas")
exit()
```

## 🔍 Verificar Configuración

```powershell
# Ver todas las URLs disponibles
python manage.py show_urls

# Verificar configuración
python manage.py check

# Ver migraciones
python manage.py showmigrations

# Crear superusuario adicional
python manage.py createsuperuser
```

## 🧹 Limpiar y Reiniciar

```powershell
# Limpiar base de datos y empezar de cero
Remove-Item db.sqlite3 -Force
Get-ChildItem tesis\migrations\0*.py | Remove-Item -Force
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## 📊 Información del Sistema

```powershell
# Versión de Django
python -m django --version

# Versiones de paquetes
pip list

# Información de la base de datos
python manage.py dbshell
.tables
.exit
```

## 🧪 Probar Endpoints

```powershell
# Instalar httpie (cliente HTTP)
pip install httpie

# Probar registro
http POST http://localhost:8000/api/registro/ username=test email=test@test.com password=test123 confirm_password=test123 first_name=Test last_name=User

# Probar login
http POST http://localhost:8000/api/token/ username=test password=test123

# Probar endpoint protegido (reemplaza TOKEN con el token recibido)
http GET http://localhost:8000/api/tesis/ "Authorization: Bearer TOKEN"
```

## 🎯 URLs Importantes

- Admin Panel: http://localhost:8000/admin/
- API Root: http://localhost:8000/api/
- Swagger Docs: http://localhost:8000/swagger/ (si está configurado)
- Browsable API: http://localhost:8000/api/tesis/

## 📋 Checklist de Verificación

```powershell
# 1. Verificar que el servidor corre
# Debe responder OK
curl http://localhost:8000/admin/

# 2. Verificar que CORS funciona
# Revisar los headers en las respuestas

# 3. Verificar autenticación
# Debe fallar con 401
curl http://localhost:8000/api/tesis/

# 4. Verificar login
curl -X POST http://localhost:8000/api/token/ -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"

# 5. Verificar token incluye role
# Decodificar el token en jwt.io y verificar que tenga el campo 'role'
```

## 🐛 Solución de Problemas

```powershell
# Error: No module named 'rest_framework_simplejwt.token_blacklist'
pip install djangorestframework-simplejwt

# Error: No changes detected
python manage.py makemigrations tesis

# Error: Table already exists
python manage.py migrate --fake

# Ver logs detallados
python manage.py runserver --verbosity 3

# Limpiar __pycache__
Get-ChildItem -Recurse -Filter "__pycache__" | Remove-Item -Recurse -Force
Get-ChildItem -Recurse -Filter "*.pyc" | Remove-Item -Force
```

## 📦 Backup y Restore

```powershell
# Backup de la base de datos
Copy-Item db.sqlite3 db.sqlite3.backup

# Restore
Copy-Item db.sqlite3.backup db.sqlite3

# Export datos
python manage.py dumpdata > backup.json

# Import datos
python manage.py loaddata backup.json
```

## 🎓 Usuarios de Prueba Predefinidos

Después de ejecutar los comandos de creación, tendrás:

| Usuario | Contraseña | Rol | Email |
|---------|-----------|-----|-------|
| admin | admin123 | admin | admin@example.com |
| docente | docente123 | docente | docente@example.com |
| estudiante | estudiante123 | estudiante | estudiante@example.com |

## 🔐 Probar JWT con Rol

```powershell
# 1. Login
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/token/" -Method POST -Body (@{username="estudiante"; password="estudiante123"} | ConvertTo-Json) -ContentType "application/json"

# 2. Ver token
$response.access

# 3. Decodificar (ir a jwt.io y pegar el token)
# Debe mostrar el campo "role": "estudiante"

# 4. Usar token
$headers = @{Authorization="Bearer $($response.access)"}
Invoke-RestMethod -Uri "http://localhost:8000/api/tesis/" -Headers $headers
```
