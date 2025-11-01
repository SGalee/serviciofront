# 🚀 GUÍA COMPLETA DE INTEGRACIÓN BACKEND - FRONTEND

## ✅ SISTEMA IMPLEMENTADO

### 🎯 Características Implementadas:

1. ✅ **Sistema de Roles** (Admin, Docente, Estudiante)
2. ✅ **JWT con Información de Rol** incluida en el token
3. ✅ **Refresh Token Automático** con rotación
4. ✅ **Modelo de Usuario Personalizado**
5. ✅ **Sistema de Favoritos**
6. ✅ **Permisos por Rol**
7. ✅ **Gestión de Usuarios (Admin)**
8. ✅ **Perfil de Usuario**
9. ✅ **CRUD de Tesis con permisos**

---

## 📋 ENDPOINTS COMPLETOS

### Base URL: `http://localhost:8000/api`

---

### 🔐 **AUTENTICACIÓN (Públicos)**

#### 1. Registro
```http
POST /api/registro/
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@example.com",
  "password": "contraseña_segura",
  "confirm_password": "contraseña_segura",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "estudiante"  // opcional: estudiante (default), docente, admin
}
```

**Respuesta:**
```json
{
  "id": 1,
  "username": "usuario123",
  "email": "usuario@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "estudiante",
  "date_joined": "2024-11-01T10:00:00Z"
}
```

#### 2. Login (Obtener Tokens)
```http
POST /api/token/
Content-Type: application/json

{
  "username": "usuario123",
  "password": "contraseña_segura"
}
```

**Respuesta:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "estudiante"
  }
}
```

**El token ACCESS contiene:**
```json
{
  "token_type": "access",
  "exp": 1730462400,
  "iat": 1730458800,
  "jti": "abc123...",
  "user_id": 1,
  "username": "usuario123",
  "email": "usuario@example.com",
  "role": "estudiante",
  "first_name": "Juan",
  "last_name": "Pérez"
}
```

#### 3. Refresh Token
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Respuesta:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."  // Nuevo refresh token (rotación)
}
```

---

### 👤 **PERFIL DE USUARIO** (Requiere autenticación)

#### 1. Obtener Perfil Actual
```http
GET /api/perfil/
Authorization: Bearer {access_token}
```

#### 2. Actualizar Perfil
```http
PATCH /api/perfil/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "first_name": "Juan Carlos",
  "last_name": "Pérez García",
  "email": "nuevo@email.com"
}
```

---

### 📚 **TESIS** (Todos requieren autenticación)

#### 1. Listar Todas las Tesis
```http
GET /api/tesis/
Authorization: Bearer {access_token}

# Query params opcionales:
?autor=Juan        // Filtrar por autor
?anio=2024        // Filtrar por año
?titulo=Machine   // Filtrar por título
```

#### 2. Obtener Una Tesis
```http
GET /api/tesis/{id}/
Authorization: Bearer {access_token}
```

#### 3. Crear Tesis (Solo Docente o Admin)
```http
POST /api/tesis/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

titulo: Título de la tesis
autor: Juan Pérez
fecha_publicacion: 2024
resumen: Descripción completa...
archivo_pdf: [archivo]
tutor: Dr. García
```

#### 4. Actualizar Tesis (Solo Docente o Admin)
```http
PUT /api/tesis/{id}/
Authorization: Bearer {access_token}

PATCH /api/tesis/{id}/
Authorization: Bearer {access_token}
```

#### 5. Eliminar Tesis (Solo Docente o Admin)
```http
DELETE /api/tesis/{id}/
Authorization: Bearer {access_token}
```

#### 6. Mis Tesis (Tesis creadas por mí)
```http
GET /api/tesis/mis_tesis/
Authorization: Bearer {access_token}
```

---

### ⭐ **FAVORITOS** (Requiere autenticación)

#### 1. Listar Mis Favoritos
```http
GET /api/favoritos/
Authorization: Bearer {access_token}
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "tesis": 5,
    "tesis_detalle": {
      "id": 5,
      "titulo": "Título de la tesis",
      "autor": "Juan Pérez",
      ...
    },
    "fecha_agregado": "2024-11-01T10:00:00Z"
  }
]
```

#### 2. Agregar a Favoritos
```http
POST /api/favoritos/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "tesis": 5
}
```

#### 3. Quitar de Favoritos
```http
DELETE /api/favoritos/{id}/
Authorization: Bearer {access_token}
```

#### 4. Toggle Favorito (Agregar/Quitar)
```http
POST /api/favoritos/toggle/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "tesis": 5
}
```

**Respuesta si se agregó:**
```json
{
  "message": "Agregado a favoritos",
  "favorito": true,
  "data": { ... }
}
```

**Respuesta si se quitó:**
```json
{
  "message": "Eliminado de favoritos",
  "favorito": false
}
```

---

### 👥 **GESTIÓN DE USUARIOS** (Solo Admin)

#### 1. Listar Todos los Usuarios
```http
GET /api/usuarios/
Authorization: Bearer {access_token}
```

#### 2. Obtener Un Usuario
```http
GET /api/usuarios/{id}/
Authorization: Bearer {access_token}
```

#### 3. Actualizar Usuario
```http
PATCH /api/usuarios/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "role": "docente",
  "is_active": true
}
```

#### 4. Cambiar Rol de Usuario
```http
PATCH /api/usuarios/{id}/cambiar_rol/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "role": "docente"  // admin, docente, estudiante
}
```

#### 5. Eliminar Usuario
```http
DELETE /api/usuarios/{id}/
Authorization: Bearer {access_token}
```

---

## 🔑 PERMISOS POR ROL

| Endpoint | Estudiante | Docente | Admin |
|----------|-----------|---------|-------|
| Ver tesis | ✅ | ✅ | ✅ |
| Crear tesis | ❌ | ✅ | ✅ |
| Editar tesis | ❌ | ✅ (propias) | ✅ (todas) |
| Eliminar tesis | ❌ | ✅ (propias) | ✅ (todas) |
| Ver usuarios | ❌ | ❌ | ✅ |
| Editar usuarios | ❌ | ❌ | ✅ |
| Favoritos | ✅ | ✅ | ✅ |
| Perfil propio | ✅ | ✅ | ✅ |

---

## ⚙️ CONFIGURACIÓN FRONTEND (Axios)

### Archivo: `src/services/api.js`

```javascript
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:8000';
const API_URL = 'http://localhost:8000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener datos del token
export const getTokenData = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      firstName: decoded.first_name,
      lastName: decoded.last_name,
      exp: decoded.exp,
    };
  } catch (error) {
    return null;
  }
};

// Función para verificar si el token expiró
export const isTokenExpired = () => {
  const tokenData = getTokenData();
  if (!tokenData) return true;
  
  const now = Date.now() / 1000;
  return tokenData.exp < now;
};

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para refrescar token automáticamente
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        // No hay refresh token, redirigir al login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;
        
        // Guardar nuevos tokens
        localStorage.setItem('access_token', access);
        if (refresh) {
          localStorage.setItem('refresh_token', refresh);
        }

        // Actualizar header
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        processQueue(null, access);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Refresh falló, limpiar y redirigir
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { BASE_URL, API_URL };
```

---

## 📦 SERVICIOS DE AUTENTICACIÓN

### Archivo: `src/services/authService.js`

```javascript
import api, { getTokenData } from './api';

const authService = {
  // Login
  async login(username, password) {
    try {
      const response = await api.post('/token/', {
        username,
        password
      });
      
      const { access, refresh, user } = response.data;
      
      // Guardar tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Guardar info del usuario
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al iniciar sesión'
      };
    }
  },

  // Registro
  async register(userData) {
    try {
      const response = await api.post('/registro/', userData);
      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al registrar'
      };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Obtener usuario actual
  getCurrentUser() {
    const tokenData = getTokenData();
    if (!tokenData) return null;
    
    return {
      id: tokenData.userId,
      username: tokenData.username,
      email: tokenData.email,
      role: tokenData.role,
      firstName: tokenData.firstName,
      lastName: tokenData.lastName,
    };
  },

  // Verificar si está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    const tokenData = getTokenData();
    if (!tokenData) return false;
    
    // Verificar si expiró
    const now = Date.now() / 1000;
    return tokenData.exp > now;
  },

  // Verificar rol
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  // Verificar si es admin
  isAdmin() {
    return this.hasRole('admin');
  },

  // Verificar si es docente
  isDocente() {
    return this.hasRole('docente');
  },

  // Verificar si es estudiante
  isEstudiante() {
    return this.hasRole('estudiante');
  },
};

export default authService;
```

---

## 🎯 EJEMPLO DE USO EN COMPONENTES

### Login Component

```javascript
import { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await authService.login(
      credentials.username,
      credentials.password
    );

    if (result.success) {
      const user = result.user;
      
      // Redirigir según el rol
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'docente') {
        navigate('/docente/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

### Protected Route Component

```javascript
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function ProtectedRoute({ children, allowedRoles }) {
  const isAuth = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

// Uso:
<Route 
  path="/admin/*" 
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 🔄 PASOS PARA INICIAR EL BACKEND

```bash
# 1. Instalar dependencias (si no están)
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# 2. Eliminar la base de datos antigua (si existe)
rm db.sqlite3

# 3. Eliminar migraciones anteriores
rm tesis/migrations/0*.py

# 4. Crear nuevas migraciones
python manage.py makemigrations

# 5. Aplicar migraciones
python manage.py migrate

# 6. Crear superusuario (admin)
python manage.py createsuperuser

# 7. Iniciar servidor
python manage.py runserver
```

---

## ✅ CHECKLIST DE INTEGRACIÓN

- [x] Modelo User personalizado con roles
- [x] JWT con campo 'role' en el token
- [x] Refresh token con rotación
- [x] CORS configurado
- [x] Endpoints de autenticación
- [x] Endpoints de perfil
- [x] Endpoints de tesis con permisos
- [x] Sistema de favoritos
- [x] Gestión de usuarios (admin)
- [x] Permisos por rol
- [x] Admin panel configurado

---

## 🚀 ¡TODO LISTO PARA INTEGRAR!

El backend ya está 100% preparado para conectarse con el frontend. Los tokens JWT incluyen toda la información necesaria del usuario y el sistema de refresh automático está implementado.
