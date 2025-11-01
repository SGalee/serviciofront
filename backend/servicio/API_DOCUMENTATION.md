# 📚 DOCUMENTACIÓN DEL BACKEND - SISTEMA DE TESIS

## 🎯 RESUMEN DE CAMBIOS APLICADOS

### ✅ Configuraciones Corregidas:
1. ✅ **CORS configurado correctamente** - El frontend puede hacer requests
2. ✅ **corsheaders agregado a INSTALLED_APPS**
3. ✅ **MIDDLEWARE ordenado correctamente**
4. ✅ **MEDIA_URL y MEDIA_ROOT configurados** - Los PDFs son accesibles
5. ✅ **UsuarioSerializer corregido** - Ahora hereda de ModelSerializer
6. ✅ **URLs para servir archivos media agregadas**

---

## 🚀 ENDPOINTS DISPONIBLES PARA EL FRONTEND

### 📝 **GESTIÓN DE TESIS**

#### 1. Listar todas las tesis
```http
GET http://localhost:8000/api/tesis/
```
**Respuesta:**
```json
[
  {
    "id": 1,
    "titulo": "Título de la tesis",
    "autor": "Juan Pérez",
    "fecha_publicacion": 2024,
    "resumen": "Resumen de la tesis...",
    "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/archivo.pdf",
    "tutor": "Dr. García"
  }
]
```

#### 2. Obtener una tesis específica
```http
GET http://localhost:8000/api/tesis/{id}/
```

#### 3. Crear nueva tesis
```http
POST http://localhost:8000/api/tesis/
Content-Type: multipart/form-data

{
  "titulo": "Nueva tesis",
  "autor": "María López",
  "fecha_publicacion": 2024,
  "resumen": "Descripción...",
  "archivo_pdf": [archivo],
  "tutor": "Dr. Martínez"
}
```

#### 4. Actualizar tesis completa
```http
PUT http://localhost:8000/api/tesis/{id}/
Content-Type: application/json
```

#### 5. Actualizar tesis parcial
```http
PATCH http://localhost:8000/api/tesis/{id}/
Content-Type: application/json
```

#### 6. Eliminar tesis
```http
DELETE http://localhost:8000/api/tesis/{id}/
```

---

### 🔐 **AUTENTICACIÓN**

#### 1. Registro de nuevo usuario
```http
POST http://localhost:8000/api/registro/
Content-Type: application/json

{
  "username": "nuevo_usuario",
  "email": "usuario@example.com",
  "password": "contraseña_segura",
  "first_name": "Nombre",
  "last_name": "Apellido"
}
```

#### 2. Login (Obtener Token)
```http
POST http://localhost:8000/api/token/
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```
**Respuesta:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 3. Refrescar Token
```http
POST http://localhost:8000/api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 🔧 **CONFIGURACIÓN PARA EL FRONTEND**

### Ejemplo de configuración Axios (React/Vue):

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### Ejemplo de uso:

```javascript
// Obtener todas las tesis
const tesis = await api.get('/tesis/');

// Crear nueva tesis (con archivo)
const formData = new FormData();
formData.append('titulo', 'Mi Tesis');
formData.append('autor', 'Juan Pérez');
formData.append('fecha_publicacion', 2024);
formData.append('resumen', 'Descripción...');
formData.append('archivo_pdf', pdfFile);
formData.append('tutor', 'Dr. García');

await api.post('/tesis/', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Login
const response = await api.post('/token/', {
  username: 'usuario',
  password: 'contraseña'
});
localStorage.setItem('access_token', response.data.access);
localStorage.setItem('refresh_token', response.data.refresh);
```

---

## 📊 **MODELO DE DATOS**

### Tesis
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único (auto-generado) |
| titulo | String (200) | Título de la tesis |
| autor | String (100) | Autor de la tesis |
| fecha_publicacion | Integer | Año de publicación |
| resumen | Text | Resumen/descripción |
| archivo_pdf | File | Archivo PDF de la tesis |
| tutor | String (100) | Nombre del tutor |

---

## ⚙️ **CONFIGURACIÓN CORS**

### Orígenes permitidos:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React/Next.js)
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

### Métodos permitidos:
- GET, POST, PUT, PATCH, DELETE, OPTIONS

---

## 🔒 **AUTENTICACIÓN**

El backend usa **JWT (JSON Web Tokens)** para autenticación.

### Flujo de autenticación:
1. Usuario hace login → recibe `access` y `refresh` tokens
2. Incluir el `access` token en cada request:
   ```
   Authorization: Bearer {access_token}
   ```
3. Cuando el `access` expira, usar el `refresh` token para obtener uno nuevo
4. Si el `refresh` expira, el usuario debe hacer login nuevamente

### Duración de tokens (configuración por defecto de simplejwt):
- Access token: 5 minutos
- Refresh token: 24 horas

---

## 🚦 **COMANDOS PARA INICIAR EL SERVIDOR**

```bash
# Activar entorno virtual (si existe)
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Hacer migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

El servidor estará disponible en: `http://localhost:8000`

---

## 📁 **ESTRUCTURA DE ARCHIVOS MEDIA**

Los archivos PDF se guardan en:
```
servicio/
├── media/
│   └── tesis_pdfs/
│       └── archivo.pdf
```

URL para acceder: `http://localhost:8000/media/tesis_pdfs/archivo.pdf`

---

## 🐛 **TROUBLESHOOTING**

### Error CORS:
- Verificar que el frontend esté corriendo en uno de los puertos permitidos
- Verificar que `corsheaders` esté instalado: `pip install django-cors-headers`

### Error de archivos media:
- Verificar que exista la carpeta `media/tesis_pdfs/`
- En producción, usar un servicio de almacenamiento como AWS S3

### Error de autenticación:
- Verificar que el token esté en el formato: `Bearer {token}`
- Verificar que el token no haya expirado

---

## 📝 **NOTAS IMPORTANTES**

1. **Seguridad**: El `SECRET_KEY` actual es para desarrollo. En producción usar una clave segura.
2. **DEBUG**: Cambiar `DEBUG = False` en producción
3. **ALLOWED_HOSTS**: Agregar el dominio de producción
4. **Base de datos**: Considerar PostgreSQL para producción
5. **Archivos estáticos**: Usar WhiteNoise o CDN en producción

---

## 🎓 **PRÓXIMOS PASOS RECOMENDADOS**

1. ✅ Agregar filtros y búsqueda en el endpoint de tesis
2. ✅ Agregar paginación para mejorar performance
3. ✅ Implementar permisos más granulares
4. ✅ Agregar validaciones personalizadas
5. ✅ Documentación Swagger/OpenAPI automática (drf-yasg ya está instalado)
6. ✅ Tests unitarios
7. ✅ Logs y monitoreo

---

Generado el: November 1, 2025
