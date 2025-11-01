# 🚀 INSTRUCCIONES PASO A PASO - PUESTA EN MARCHA

## ⚠️ IMPORTANTE: LEE ESTO PRIMERO

Este backend ha sido **completamente reconfigurado** con:
- ✅ Sistema de roles (Admin, Docente, Estudiante)
- ✅ JWT con rol incluido en el token
- ✅ Refresh token automático
- ✅ Modelo de usuario personalizado
- ✅ Sistema de favoritos
- ✅ Permisos granulares

**⚠️ DEBES RECREAR LA BASE DE DATOS** porque el modelo User cambió.

---

## 📋 PASO 1: PREPARACIÓN

### 1.1 Verificar que estás en el directorio correcto

```powershell
cd c:\Users\gales\OneDrive\Desktop\servicioback\servicio
```

### 1.2 Verificar que existe manage.py

```powershell
ls manage.py
```

Si no existe, estás en el directorio incorrecto.

---

## 📋 PASO 2: LIMPIAR BASE DE DATOS ANTERIOR

### 2.1 Eliminar base de datos (si existe)

```powershell
Remove-Item db.sqlite3 -Force -ErrorAction SilentlyContinue
```

### 2.2 Eliminar migraciones anteriores

```powershell
Remove-Item tesis\migrations\0*.py -Force -ErrorAction SilentlyContinue
```

---

## 📋 PASO 3: CREAR NUEVA BASE DE DATOS

### 3.1 Crear migraciones

```powershell
python manage.py makemigrations
```

**Deberías ver:**
```
Migrations for 'tesis':
  tesis\migrations\0001_initial.py
    - Create model User
    - Create model Tesis
    - Create model Favorito
```

### 3.2 Aplicar migraciones

```powershell
python manage.py migrate
```

**Deberías ver muchas líneas de:**
```
Applying tesis.0001_initial... OK
Applying admin.0001_initial... OK
...
```

---

## 📋 PASO 4: CREAR SUPERUSUARIO (ADMIN)

```powershell
python manage.py createsuperuser
```

**Ejemplo:**
- Username: `admin`
- Email: `admin@example.com`
- Password: `admin123` (o la que prefieras)
- Confirmar password: `admin123`

---

## 📋 PASO 5: CREAR USUARIOS DE PRUEBA

### 5.1 Abrir shell de Django

```powershell
python manage.py shell
```

### 5.2 Copiar y pegar este código completo:

```python
from tesis.models import User

# Crear Docente
docente = User.objects.create_user(
    username='docente',
    email='docente@example.com',
    password='docente123',
    first_name='Juan',
    last_name='Profesor',
    role='docente'
)
print(f"✅ Docente creado: {docente.username}")

# Crear Estudiante
estudiante = User.objects.create_user(
    username='estudiante',
    email='estudiante@example.com',
    password='estudiante123',
    first_name='María',
    last_name='Estudiante',
    role='estudiante'
)
print(f"✅ Estudiante creado: {estudiante.username}")

# Actualizar el admin con el rol
admin = User.objects.get(username='admin')
admin.role = 'admin'
admin.save()
print(f"✅ Admin actualizado: {admin.username}")

print("\n🎉 Usuarios de prueba creados exitosamente!")
print("\nCredenciales:")
print("  Admin:      admin / admin123")
print("  Docente:    docente / docente123")
print("  Estudiante: estudiante / estudiante123")

exit()
```

---

## 📋 PASO 6: CREAR TESIS DE PRUEBA (OPCIONAL)

### 6.1 Volver a abrir el shell

```powershell
python manage.py shell
```

### 6.2 Copiar y pegar:

```python
from tesis.models import Tesis, User

docente = User.objects.get(username='docente')

tesis1 = Tesis.objects.create(
    titulo='Desarrollo de Aplicaciones Web con Django y React',
    autor='María García López',
    fecha_publicacion=2024,
    resumen='Esta tesis explora el desarrollo de aplicaciones web modernas utilizando Django como backend y React como frontend. Se implementa un sistema completo de autenticación con JWT y se analizan las mejores prácticas de seguridad.',
    tutor='Dr. Juan Pérez',
    creado_por=docente
)

tesis2 = Tesis.objects.create(
    titulo='Machine Learning aplicado a la Predicción de Enfermedades',
    autor='Carlos Rodríguez Martínez',
    fecha_publicacion=2023,
    resumen='Investigación sobre la aplicación de algoritmos de machine learning para la predicción temprana de enfermedades cardiovasculares. Se utilizan redes neuronales profundas y análisis de datos clínicos.',
    tutor='Dra. Ana Fernández',
    creado_por=docente
)

tesis3 = Tesis.objects.create(
    titulo='Sistemas de Información Geográfica en Planificación Urbana',
    autor='Laura Sánchez Torres',
    fecha_publicacion=2024,
    resumen='Análisis del uso de sistemas de información geográfica (SIG) en procesos de planificación urbana sostenible. Incluye estudios de caso en ciudades latinoamericanas.',
    tutor='Dr. Roberto Gómez',
    creado_por=docente
)

tesis4 = Tesis.objects.create(
    titulo='Ciberseguridad en Sistemas IoT',
    autor='Diego Martínez Ruiz',
    fecha_publicacion=2023,
    resumen='Estudio de vulnerabilidades y soluciones de seguridad en dispositivos Internet of Things (IoT). Propuesta de framework de seguridad para redes de sensores.',
    tutor='Dr. Luis Hernández',
    creado_por=docente
)

tesis5 = Tesis.objects.create(
    titulo='Blockchain aplicado a la Trazabilidad de Alimentos',
    autor='Ana Patricia Morales',
    fecha_publicacion=2024,
    resumen='Implementación de tecnología blockchain para mejorar la trazabilidad en la cadena de suministro de alimentos. Caso de estudio en productos orgánicos.',
    tutor='Dra. Carmen López',
    creado_por=docente
)

print(f"✅ {Tesis.objects.count()} tesis creadas exitosamente")
exit()
```

---

## 📋 PASO 7: INICIAR EL SERVIDOR

```powershell
python manage.py runserver
```

**Deberías ver:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

---

## 📋 PASO 8: VERIFICAR QUE TODO FUNCIONA

### 8.1 Abrir el navegador y visitar:

1. **Admin Panel:** http://localhost:8000/admin/
   - Login con: `admin` / `admin123`
   - Deberías ver: Users, Tesis, Favoritos

2. **API Root:** http://localhost:8000/api/
   - Deberías ver la lista de endpoints

3. **Tesis (requiere login):** http://localhost:8000/api/tesis/

---

## 📋 PASO 9: PROBAR EL LOGIN CON POSTMAN/INSOMNIA

### 9.1 Login como Estudiante

**Request:**
```
POST http://localhost:8000/api/token/
Content-Type: application/json

{
  "username": "estudiante",
  "password": "estudiante123"
}
```

**Response esperada:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 3,
    "username": "estudiante",
    "email": "estudiante@example.com",
    "first_name": "María",
    "last_name": "Estudiante",
    "role": "estudiante"
  }
}
```

### 9.2 Verificar el Token

1. Copiar el token `access`
2. Ir a https://jwt.io
3. Pegar el token en el campo izquierdo
4. En la sección "Payload" deberías ver:

```json
{
  "token_type": "access",
  "exp": 1730462400,
  "user_id": 3,
  "username": "estudiante",
  "email": "estudiante@example.com",
  "role": "estudiante",  ← ¡IMPORTANTE!
  "first_name": "María",
  "last_name": "Estudiante"
}
```

### 9.3 Usar el Token para Obtener Tesis

**Request:**
```
GET http://localhost:8000/api/tesis/
Authorization: Bearer TU_TOKEN_AQUI
```

**Response:**
Lista de tesis en formato JSON

---

## 📋 PASO 10: PROBAR CON POWERSHELL (OPCIONAL)

```powershell
# Login
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/token/" -Method POST -Body (@{username="estudiante"; password="estudiante123"} | ConvertTo-Json) -ContentType "application/json"

# Ver el usuario
$response.user

# Guardar token
$token = $response.access

# Usar token para obtener tesis
$headers = @{Authorization="Bearer $token"}
$tesis = Invoke-RestMethod -Uri "http://localhost:8000/api/tesis/" -Headers $headers

# Ver tesis
$tesis
```

---

## ✅ VERIFICACIÓN FINAL

Si llegaste hasta aquí, verifica:

- [ ] El servidor corre sin errores
- [ ] Puedes acceder al admin panel
- [ ] El login retorna `access`, `refresh` y `user`
- [ ] El token incluye el campo `role`
- [ ] Puedes obtener la lista de tesis con el token
- [ ] Los 3 usuarios están creados (admin, docente, estudiante)
- [ ] (Opcional) Hay tesis de prueba en la base de datos

---

## 🎉 ¡BACKEND LISTO!

Tu backend está 100% funcional y listo para conectarse con el frontend.

### 📚 Documentación Disponible:

1. **RESUMEN.md** - Resumen ejecutivo de todo
2. **GUIA_INTEGRACION_COMPLETA.md** - Guía completa con ejemplos de código
3. **ENDPOINTS_FRONTEND.md** - Lista de endpoints para el frontend
4. **COMANDOS.md** - Comandos útiles de PowerShell
5. **API_DOCUMENTATION.md** - Documentación técnica

### 🔗 URLs Importantes:

- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin/
- API: http://localhost:8000/api/
- Tesis: http://localhost:8000/api/tesis/

### 👥 Usuarios de Prueba:

| Usuario | Password | Rol | Para probar |
|---------|----------|-----|-------------|
| admin | admin123 | admin | Gestión de usuarios |
| docente | docente123 | docente | Crear/editar tesis |
| estudiante | estudiante123 | estudiante | Ver tesis y favoritos |

---

## 🚨 SI ALGO SALE MAL

### Error: "Table already exists"

```powershell
Remove-Item db.sqlite3 -Force
python manage.py migrate --run-syncdb
```

### Error: "No changes detected"

```powershell
python manage.py makemigrations tesis
```

### Error: Module not found

```powershell
pip install -r requirements.txt
```

### Error: Port 8000 already in use

```powershell
# Matar proceso en puerto 8000
netstat -ano | findstr :8000
# Anotar el PID y ejecutar:
taskkill /PID <PID> /F
```

---

## 📞 SIGUIENTE PASO

Ahora puedes ir al frontend y configurar Axios para conectarse con este backend siguiendo la guía en **GUIA_INTEGRACION_COMPLETA.md**

---

**¡Éxito! 🎉**
