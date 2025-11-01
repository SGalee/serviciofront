# 🔌 LISTA COMPLETA DE ENDPOINTS - FRONTEND

**Base URL:** `http://localhost:8000/api`

---

## 📋 TABLA DE RESUMEN

| Método | Endpoint | Descripción | Auth | Rol Requerido |
|--------|----------|-------------|------|---------------|
| POST | `/registro/` | Registrar usuario | ❌ No | Público |
| POST | `/token/` | Login | ❌ No | Público |
| POST | `/token/refresh/` | Refrescar token | ❌ No | Público |
| GET | `/perfil/` | Ver mi perfil | ✅ Sí | Todos |
| PATCH | `/perfil/` | Editar mi perfil | ✅ Sí | Todos |
| GET | `/tesis/` | Listar tesis | ✅ Sí | Todos |
| GET | `/tesis/{id}/` | Ver una tesis | ✅ Sí | Todos |
| POST | `/tesis/` | Crear tesis | ✅ Sí | Docente/Admin |
| PUT | `/tesis/{id}/` | Actualizar tesis | ✅ Sí | Docente/Admin |
| PATCH | `/tesis/{id}/` | Actualizar parcial | ✅ Sí | Docente/Admin |
| DELETE | `/tesis/{id}/` | Eliminar tesis | ✅ Sí | Docente/Admin |
| GET | `/tesis/mis_tesis/` | Mis tesis | ✅ Sí | Docente/Admin |
| GET | `/favoritos/` | Mis favoritos | ✅ Sí | Todos |
| POST | `/favoritos/` | Agregar favorito | ✅ Sí | Todos |
| DELETE | `/favoritos/{id}/` | Quitar favorito | ✅ Sí | Todos |
| POST | `/favoritos/toggle/` | Toggle favorito | ✅ Sí | Todos |
| GET | `/usuarios/` | Listar usuarios | ✅ Sí | Admin |
| GET | `/usuarios/{id}/` | Ver usuario | ✅ Sí | Admin |
| PATCH | `/usuarios/{id}/` | Editar usuario | ✅ Sí | Admin |
| DELETE | `/usuarios/{id}/` | Eliminar usuario | ✅ Sí | Admin |
| PATCH | `/usuarios/{id}/cambiar_rol/` | Cambiar rol | ✅ Sí | Admin |

---

## 🔐 AUTENTICACIÓN

### 1. **REGISTRO DE USUARIO**

```http
POST http://localhost:8000/api/registro/
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "MiPassword123",
  "confirm_password": "MiPassword123",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "estudiante"
}
```

**Campos:**
- `username` (requerido, string): Nombre de usuario único
- `email` (requerido, string): Email único
- `password` (requerido, string): Contraseña
- `confirm_password` (opcional, string): Confirmar contraseña
- `first_name` (opcional, string): Nombre
- `last_name` (opcional, string): Apellido
- `role` (opcional, string): "estudiante" (default), "docente", "admin"

**Response 201 Created:**
```json
{
  "id": 1,
  "username": "juanperez",
  "email": "juan@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "estudiante",
  "date_joined": "2024-11-01T10:00:00Z"
}
```

**Response 400 Bad Request:**
```json
{
  "username": ["A user with that username already exists."],
  "email": ["This field must be unique."],
  "password": ["Las contraseñas no coinciden."]
}
```

---

### 2. **LOGIN (Obtener Tokens JWT)**

```http
POST http://localhost:8000/api/token/
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "juanperez",
  "password": "MiPassword123"
}
```

**Response 200 OK:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMDc1MDQwMCwiaWF0IjoxNzMwMTQ1NjAwLCJqdGkiOiJhYmMxMjMuLi4ifQ...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMTQ5MjAwLCJpYXQiOjE3MzAxNDU2MDAsImp0aSI6ImRlZjQ1Ni4uLiIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianVhbnBlcmV6IiwiZW1haWwiOiJqdWFuQGV4YW1wbGUuY29tIiwicm9sZSI6ImVzdHVkaWFudGUiLCJmaXJzdF9uYW1lIjoiSnVhbiIsImxhc3RfbmFtZSI6IlDDqXJleiJ9...",
  "user": {
    "id": 1,
    "username": "juanperez",
    "email": "juan@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "estudiante"
  }
}
```

**⚠️ IMPORTANTE: El token `access` contiene en su payload:**
```json
{
  "token_type": "access",
  "exp": 1730149200,
  "iat": 1730145600,
  "jti": "def456...",
  "user_id": 1,
  "username": "juanperez",
  "email": "juan@example.com",
  "role": "estudiante",        ← CAMPO IMPORTANTE
  "first_name": "Juan",
  "last_name": "Pérez"
}
```

**Response 401 Unauthorized:**
```json
{
  "detail": "No active account found with the given credentials"
}
```

---

### 3. **REFRESH TOKEN**

```http
POST http://localhost:8000/api/token/refresh/
Content-Type: application/json
```

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response 200 OK:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**⚠️ NOTA:** Con `ROTATE_REFRESH_TOKENS=True`, también devuelve un nuevo `refresh` token.

---

## 👤 PERFIL DE USUARIO

### 4. **VER MI PERFIL**

```http
GET http://localhost:8000/api/perfil/
Authorization: Bearer {access_token}
```

**Response 200 OK:**
```json
{
  "id": 1,
  "username": "juanperez",
  "email": "juan@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "estudiante",
  "date_joined": "2024-11-01T10:00:00Z"
}
```

---

### 5. **EDITAR MI PERFIL**

```http
PATCH http://localhost:8000/api/perfil/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body (todos los campos son opcionales):**
```json
{
  "first_name": "Juan Carlos",
  "last_name": "Pérez García",
  "email": "juan.nuevo@example.com",
  "password": "NuevaPassword123"
}
```

**Response 200 OK:**
```json
{
  "id": 1,
  "username": "juanperez",
  "email": "juan.nuevo@example.com",
  "first_name": "Juan Carlos",
  "last_name": "Pérez García",
  "role": "estudiante",
  "date_joined": "2024-11-01T10:00:00Z"
}
```

---

## 📚 TESIS

### 6. **LISTAR TODAS LAS TESIS**

```http
GET http://localhost:8000/api/tesis/
Authorization: Bearer {access_token}
```

**Query Parameters (opcionales):**
- `?autor=Juan` - Filtrar por autor
- `?anio=2024` - Filtrar por año
- `?titulo=Machine` - Filtrar por título

**Ejemplo con filtros:**
```http
GET http://localhost:8000/api/tesis/?anio=2024&autor=Juan
Authorization: Bearer {access_token}
```

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "titulo": "Desarrollo de Aplicaciones Web Modernas",
    "autor": "Juan Pérez López",
    "fecha_publicacion": 2024,
    "resumen": "Esta tesis explora el desarrollo de aplicaciones...",
    "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/tesis_1.pdf",
    "tutor": "Dr. García",
    "creado_por": {
      "id": 2,
      "username": "docente1",
      "email": "docente@example.com",
      "first_name": "María",
      "last_name": "Profesora",
      "role": "docente"
    },
    "creado_por_id": 2,
    "fecha_creacion": "2024-11-01T10:00:00Z",
    "fecha_actualizacion": "2024-11-01T10:00:00Z"
  },
  {
    "id": 2,
    "titulo": "Machine Learning en Medicina",
    "autor": "Ana Martínez",
    "fecha_publicacion": 2023,
    "resumen": "Aplicación de algoritmos de ML...",
    "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/tesis_2.pdf",
    "tutor": "Dra. Fernández",
    "creado_por": {
      "id": 2,
      "username": "docente1",
      "email": "docente@example.com",
      "first_name": "María",
      "last_name": "Profesora",
      "role": "docente"
    },
    "creado_por_id": 2,
    "fecha_creacion": "2024-10-15T14:30:00Z",
    "fecha_actualizacion": "2024-10-15T14:30:00Z"
  }
]
```

---

### 7. **VER UNA TESIS ESPECÍFICA**

```http
GET http://localhost:8000/api/tesis/1/
Authorization: Bearer {access_token}
```

**Response 200 OK:**
```json
{
  "id": 1,
  "titulo": "Desarrollo de Aplicaciones Web Modernas",
  "autor": "Juan Pérez López",
  "fecha_publicacion": 2024,
  "resumen": "Esta tesis explora el desarrollo de aplicaciones...",
  "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/tesis_1.pdf",
  "tutor": "Dr. García",
  "creado_por": {
    "id": 2,
    "username": "docente1",
    "email": "docente@example.com",
    "first_name": "María",
    "last_name": "Profesora",
    "role": "docente"
  },
  "creado_por_id": 2,
  "fecha_creacion": "2024-11-01T10:00:00Z",
  "fecha_actualizacion": "2024-11-01T10:00:00Z"
}
```

**Response 404 Not Found:**
```json
{
  "detail": "Not found."
}
```

---

### 8. **CREAR NUEVA TESIS** (Solo Docente/Admin)

```http
POST http://localhost:8000/api/tesis/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
titulo: Título de mi Tesis
autor: Juan Pérez López
fecha_publicacion: 2024
resumen: Este es el resumen completo de la tesis...
archivo_pdf: [File]
tutor: Dr. García Martínez
```

**Response 201 Created:**
```json
{
  "id": 3,
  "titulo": "Título de mi Tesis",
  "autor": "Juan Pérez López",
  "fecha_publicacion": 2024,
  "resumen": "Este es el resumen completo de la tesis...",
  "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/tesis_3.pdf",
  "tutor": "Dr. García Martínez",
  "creado_por": {
    "id": 2,
    "username": "docente1",
    "email": "docente@example.com",
    "first_name": "María",
    "last_name": "Profesora",
    "role": "docente"
  },
  "creado_por_id": 2,
  "fecha_creacion": "2024-11-01T15:30:00Z",
  "fecha_actualizacion": "2024-11-01T15:30:00Z"
}
```

**Response 403 Forbidden (si no es docente/admin):**
```json
{
  "detail": "You do not have permission to perform this action."
}
```

---

### 9. **ACTUALIZAR TESIS COMPLETA** (Solo Docente/Admin)

```http
PUT http://localhost:8000/api/tesis/1/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body:** Todos los campos son requeridos (igual que POST)

---

### 10. **ACTUALIZAR TESIS PARCIAL** (Solo Docente/Admin)

```http
PATCH http://localhost:8000/api/tesis/1/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body (solo los campos que quieres actualizar):**
```json
{
  "titulo": "Nuevo Título",
  "resumen": "Nuevo resumen actualizado"
}
```

**Response 200 OK:** Retorna la tesis completa actualizada

---

### 11. **ELIMINAR TESIS** (Solo Docente/Admin)

```http
DELETE http://localhost:8000/api/tesis/1/
Authorization: Bearer {access_token}
```

**Response 204 No Content** (sin body)

---

### 12. **MIS TESIS** (Tesis creadas por mí)

```http
GET http://localhost:8000/api/tesis/mis_tesis/
Authorization: Bearer {access_token}
```

**Response 200 OK:** Array de tesis creadas por el usuario actual

---

## ⭐ FAVORITOS

### 13. **LISTAR MIS FAVORITOS**

```http
GET http://localhost:8000/api/favoritos/
Authorization: Bearer {access_token}
```

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "usuario": 1,
    "tesis": 5,
    "tesis_detalle": {
      "id": 5,
      "titulo": "Machine Learning en Medicina",
      "autor": "Ana Martínez",
      "fecha_publicacion": 2023,
      "resumen": "Aplicación de algoritmos...",
      "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/tesis_5.pdf",
      "tutor": "Dra. Fernández",
      "creado_por": {
        "id": 2,
        "username": "docente1",
        "email": "docente@example.com",
        "first_name": "María",
        "last_name": "Profesora",
        "role": "docente"
      },
      "creado_por_id": 2,
      "fecha_creacion": "2024-10-15T14:30:00Z",
      "fecha_actualizacion": "2024-10-15T14:30:00Z"
    },
    "usuario_detalle": {
      "id": 1,
      "username": "juanperez",
      "email": "juan@example.com",
      "first_name": "Juan",
      "last_name": "Pérez",
      "role": "estudiante"
    },
    "fecha_agregado": "2024-11-01T12:00:00Z"
  }
]
```

---

### 14. **AGREGAR A FAVORITOS**

```http
POST http://localhost:8000/api/favoritos/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "tesis": 5
}
```

**Response 201 Created:**
```json
{
  "id": 2,
  "usuario": 1,
  "tesis": 5,
  "tesis_detalle": { ... },
  "usuario_detalle": { ... },
  "fecha_agregado": "2024-11-01T16:00:00Z"
}
```

**Response 400 Bad Request (si ya existe):**
```json
{
  "non_field_errors": ["The fields usuario, tesis must make a unique set."]
}
```

---

### 15. **QUITAR DE FAVORITOS**

```http
DELETE http://localhost:8000/api/favoritos/1/
Authorization: Bearer {access_token}
```

**Response 204 No Content**

---

### 16. **TOGGLE FAVORITO** (Agregar/Quitar en una sola petición)

```http
POST http://localhost:8000/api/favoritos/toggle/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "tesis": 5
}
```

**Response 200 OK (si se quitó):**
```json
{
  "message": "Eliminado de favoritos",
  "favorito": false
}
```

**Response 201 Created (si se agregó):**
```json
{
  "message": "Agregado a favoritos",
  "favorito": true,
  "data": {
    "id": 3,
    "usuario": 1,
    "tesis": 5,
    "tesis_detalle": { ... },
    "usuario_detalle": { ... },
    "fecha_agregado": "2024-11-01T16:30:00Z"
  }
}
```

---

## 👥 GESTIÓN DE USUARIOS (Solo Admin)

### 17. **LISTAR TODOS LOS USUARIOS**

```http
GET http://localhost:8000/api/usuarios/
Authorization: Bearer {access_token}
```

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "first_name": "Admin",
    "last_name": "Sistema",
    "role": "admin",
    "date_joined": "2024-10-01T00:00:00Z"
  },
  {
    "id": 2,
    "username": "docente1",
    "email": "docente@example.com",
    "first_name": "María",
    "last_name": "Profesora",
    "role": "docente",
    "date_joined": "2024-10-05T10:00:00Z"
  },
  {
    "id": 3,
    "username": "estudiante1",
    "email": "estudiante@example.com",
    "first_name": "Carlos",
    "last_name": "Estudiante",
    "role": "estudiante",
    "date_joined": "2024-10-10T15:00:00Z"
  }
]
```

---

### 18. **VER UN USUARIO**

```http
GET http://localhost:8000/api/usuarios/3/
Authorization: Bearer {access_token}
```

**Response 200 OK:** (mismo formato que la lista)

---

### 19. **EDITAR USUARIO**

```http
PATCH http://localhost:8000/api/usuarios/3/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "Carlos Alberto",
  "role": "docente"
}
```

**Response 200 OK:** Usuario actualizado

---

### 20. **ELIMINAR USUARIO**

```http
DELETE http://localhost:8000/api/usuarios/3/
Authorization: Bearer {access_token}
```

**Response 204 No Content**

---

### 21. **CAMBIAR ROL DE USUARIO**

```http
PATCH http://localhost:8000/api/usuarios/3/cambiar_rol/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "role": "docente"
}
```

**Valores permitidos:** `"admin"`, `"docente"`, `"estudiante"`

**Response 200 OK:**
```json
{
  "message": "Rol actualizado a Docente",
  "usuario": {
    "id": 3,
    "username": "estudiante1",
    "email": "estudiante@example.com",
    "first_name": "Carlos",
    "last_name": "Estudiante",
    "role": "docente",
    "date_joined": "2024-10-10T15:00:00Z"
  }
}
```

**Response 400 Bad Request:**
```json
{
  "error": "Rol inválido. Debe ser: admin, docente o estudiante"
}
```

---

## 🔒 CÓDIGOS DE RESPUESTA HTTP

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Petición exitosa (GET, PATCH, PUT) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 204 | No Content | Eliminación exitosa (DELETE) |
| 400 | Bad Request | Datos inválidos en la petición |
| 401 | Unauthorized | Token inválido o expirado |
| 403 | Forbidden | Sin permisos para esta acción |
| 404 | Not Found | Recurso no encontrado |
| 500 | Server Error | Error interno del servidor |

---

## 🛡️ HEADERS REQUERIDOS

### Para todas las peticiones autenticadas:
```http
Authorization: Bearer {access_token}
```

### Para peticiones con JSON:
```http
Content-Type: application/json
```

### Para peticiones con archivos:
```http
Content-Type: multipart/form-data
```

---

## 📝 NOTAS IMPORTANTES

### 🔐 Tokens JWT:
- **Access Token:** Válido por 60 minutos
- **Refresh Token:** Válido por 7 días
- El refresh token se rota automáticamente
- Guardar ambos tokens en localStorage

### 📦 Respuestas Anidadas:
- Las tesis incluyen información del creador (`creado_por`)
- Los favoritos incluyen detalles de la tesis (`tesis_detalle`)
- Los favoritos incluyen detalles del usuario (`usuario_detalle`)

### 🔍 Filtros:
Los filtros en `/api/tesis/` son case-insensitive y buscan coincidencias parciales.

### 📄 Archivos PDF:
- El campo `archivo_pdf` devuelve la URL completa del archivo
- Los archivos se sirven desde `/media/tesis_pdfs/`
- En producción, usar un servicio de almacenamiento (S3, etc.)

### ⚠️ Permisos:
- **Estudiante:** Solo lectura en tesis, gestión de favoritos
- **Docente:** Crear/editar tesis propias, gestión de favoritos
- **Admin:** Acceso completo a todo

---

## 🚀 RESUMEN PARA AXIOS

```javascript
// Base configuration
const API_URL = 'http://localhost:8000/api';

// Endpoints
const endpoints = {
  // Auth
  register: '/registro/',
  login: '/token/',
  refresh: '/token/refresh/',
  
  // Profile
  profile: '/perfil/',
  
  // Tesis
  tesis: '/tesis/',
  tesisDetail: (id) => `/tesis/${id}/`,
  misTesis: '/tesis/mis_tesis/',
  
  // Favoritos
  favoritos: '/favoritos/',
  favoritoDetail: (id) => `/favoritos/${id}/`,
  favoritoToggle: '/favoritos/toggle/',
  
  // Usuarios (Admin)
  usuarios: '/usuarios/',
  usuarioDetail: (id) => `/usuarios/${id}/`,
  cambiarRol: (id) => `/usuarios/${id}/cambiar_rol/`,
};
```

---

✅ **Todos los endpoints están listos y funcionando!**
