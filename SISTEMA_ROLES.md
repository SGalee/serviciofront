# 🔐 Sistema de Roles - Documentación Frontend

## 📋 Descripción General

Sistema completo de autenticación y autorización basado en roles para la aplicación de gestión de tesis.

## 🎭 Roles Disponibles

### 1. **Administrador (`admin`)**
- Acceso completo a todas las funcionalidades
- Puede crear, editar y eliminar tesis
- Gestión de usuarios (crear, editar, eliminar)
- Visualización de todas las tesis del sistema

### 2. **Docente (`docente`)**
- Puede crear, editar y eliminar sus propias tesis
- Visualización de tesis del sistema
- Gestión de favoritos
- No puede gestionar usuarios

### 3. **Estudiante (`estudiante`)**
- Solo visualización de tesis
- Búsqueda y filtrado de tesis
- Gestión de favoritos
- No puede crear ni editar tesis

---

## 📁 Estructura del Proyecto

```
src/
├── context/
│   └── AuthContext.jsx          # Contexto de autenticación
├── hooks/
│   └── useAuth.js               # Hook personalizado para auth
├── utils/
│   ├── api.ts                   # Funciones de API
│   └── roles.js                 # Constantes de roles y permisos
├── layouts/
│   ├── MainLayout.jsx           # Layout principal
│   ├── AdminLayout.jsx          # Layout para administradores
│   ├── DocenteLayout.jsx        # Layout para docentes
│   └── EstudianteLayout.jsx     # Layout para estudiantes
├── components/
│   ├── ProtectedRoute.jsx       # HOC para proteger rutas
│   └── NavBar.jsx               # Barra de navegación dinámica
├── pages/
│   ├── Inicio.jsx               # Login
│   ├── Registro.jsx             # Registro de usuario
│   └── ... (otras páginas)
└── App.jsx                      # Configuración de rutas
```

---

## 🔧 Configuración Inicial

### 1. **Envolver la aplicación con AuthProvider**

Ya está configurado en `App.jsx`:

```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Resto de la aplicación */}
    </AuthProvider>
  );
}
```

### 2. **Configurar rutas protegidas**

Las rutas están organizadas por rol:

```jsx
// Rutas de Administrador
<Route path="/admin/*" element={
  <ProtectedRoute allowedRoles={ROLES.ADMIN}>
    <AdminLayout />
  </ProtectedRoute>
}>
  {/* Sub-rutas */}
</Route>

// Rutas de Docente
<Route path="/docente/*" element={
  <ProtectedRoute allowedRoles={ROLES.DOCENTE}>
    <DocenteLayout />
  </ProtectedRoute>
}>
  {/* Sub-rutas */}
</Route>

// Rutas de Estudiante
<Route path="/estudiante/*" element={
  <ProtectedRoute allowedRoles={ROLES.ESTUDIANTE}>
    <EstudianteLayout />
  </ProtectedRoute>
}>
  {/* Sub-rutas */}
</Route>
```

---

## 💻 Uso del Hook useAuth

### Importar el hook

```jsx
import { useAuth } from '../hooks/useAuth';
```

### Propiedades disponibles

```jsx
const {
  user,              // Objeto del usuario actual
  token,             // Token de acceso JWT
  refreshTokenValue, // Token de refresco
  loading,           // Estado de carga
  isAuthenticated,   // Boolean: está autenticado?
  login,             // Función para login
  logout,            // Función para logout
  refreshAccessToken,// Función para refrescar token
  hasRole,           // Función para verificar rol
  updateUserProfile  // Función para actualizar perfil
} = useAuth();
```

### Ejemplo de uso en un componente

```jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/roles';

function MiComponente() {
  const { user, hasRole, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {user?.username}</h1>
      <p>Rol: {user?.role}</p>
      
      {hasRole(ROLES.ADMIN) && (
        <button>Botón solo para admin</button>
      )}
      
      {hasRole([ROLES.ADMIN, ROLES.DOCENTE]) && (
        <button>Botón para admin y docente</button>
      )}
      
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

---

## 🔐 Funciones de API

### Autenticación

```jsx
import api from '../utils/api';

// Login
const result = await api.login('username', 'password');
// Retorna: { access: "token", refresh: "refresh_token" }

// Registro
const user = await api.registerUser({
  username: 'usuario',
  email: 'email@example.com',
  password: 'password123',
  first_name: 'Nombre',
  last_name: 'Apellido'
});

// Refrescar token
const { access } = await api.refreshToken(refreshToken);
```

### Perfil de Usuario

```jsx
// Obtener perfil actual
const profile = await api.getUserProfile(token);

// Actualizar perfil
const updated = await api.updateUserProfile({
  first_name: 'Nuevo Nombre',
  email: 'nuevo@email.com'
}, token);
```

### Gestión de Usuarios (Solo Admin)

```jsx
// Listar usuarios
const users = await api.listUsers(token);

// Crear usuario
const newUser = await api.createUser({
  username: 'nuevo_usuario',
  email: 'usuario@example.com',
  password: 'password123',
  role: 'docente'
}, token);

// Actualizar usuario
const updated = await api.updateUser(userId, {
  role: 'admin'
}, token);

// Eliminar usuario
await api.deleteUser(userId, token);
```

### Tesis

```jsx
// Listar tesis
const tesis = await api.listTesis(token);

// Obtener una tesis
const tesis = await api.getTesis(tesisId, token);

// Crear tesis con archivo
const formData = {
  titulo: 'Título',
  autor: 'Autor',
  resumen: 'Resumen',
  tutor: 'Tutor',
  fecha_publicacion: 2024,
  archivo: fileObject // File del input
};
const newTesis = await api.createTesis(formData, token);

// Actualizar tesis
await api.updateTesis(tesisId, { titulo: 'Nuevo título' }, token);

// Eliminar tesis
await api.deleteTesis(tesisId, token);
```

### Favoritos

```jsx
// Listar favoritos
const favoritos = await api.listFavoritos(token);

// Agregar a favoritos
await api.addFavorito(tesisId, token);

// Eliminar de favoritos
await api.removeFavorito(favoritoId, token);
```

---

## 🛡️ Protección de Rutas

### Componente ProtectedRoute

```jsx
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../utils/roles';

// Ruta que requiere autenticación
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

// Ruta solo para admin
<Route path="/admin/usuarios" element={
  <ProtectedRoute allowedRoles={ROLES.ADMIN}>
    <Usuarios />
  </ProtectedRoute>
} />

// Ruta para admin y docente
<Route path="/creartesis" element={
  <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]}>
    <CrearTesis />
  </ProtectedRoute>
} />
```

---

## 🎨 Navegación Dinámica por Rol

El componente `NavBar` se adapta automáticamente según el rol del usuario.

### Rutas disponibles por rol

Definidas en `utils/roles.js`:

```javascript
export const ROLE_ROUTES = {
  admin: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/creartesis', name: 'Crear Tesis' },
    { path: '/usuarios', name: 'Gestión de Usuarios' },
    { path: '/crearusuario', name: 'Crear Usuario' },
    { path: '/tesis', name: 'Todas las Tesis' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
  docente: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/creartesis', name: 'Crear Tesis' },
    { path: '/tesis', name: 'Mis Tesis' },
    { path: '/favoritos', name: 'Favoritos' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
  estudiante: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/tesis', name: 'Buscar Tesis' },
    { path: '/favoritos', name: 'Favoritos' },
    { path: '/cuenta', name: 'Mi Cuenta' },
  ],
};
```

---

## 📝 Ejemplo Completo: Página de Login

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/roles';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(form.username, form.password);
      
      if (result.success) {
        // Redirigir según el rol
        const prefix = result.user.role === ROLES.ADMIN ? '/admin' :
                      result.user.role === ROLES.DOCENTE ? '/docente' :
                      '/estudiante';
        navigate(`${prefix}/dashboard`);
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        value={form.username}
        onChange={(e) => setForm({...form, username: e.target.value})}
        placeholder="Usuario"
      />
      
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({...form, password: e.target.value})}
        placeholder="Contraseña"
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
```

---

## 🔄 Flujo de Autenticación

1. **Usuario ingresa credenciales** → Página de Login
2. **Se llama a `login()`** → AuthContext
3. **Se hace petición al backend** → `/api/token/`
4. **Se reciben tokens JWT** → access y refresh
5. **Se decodifica el token** → Obtener rol del usuario
6. **Se guarda en localStorage** → Persistencia
7. **Se actualiza el estado** → AuthContext
8. **Se redirige según rol** → `/admin`, `/docente` o `/estudiante`

---

## 📡 Endpoints del Backend

### Base URL
```
http://localhost:8000/api
```

### Autenticación
- `POST /token/` - Login
- `POST /token/refresh/` - Refrescar token
- `POST /registro/` - Registro

### Usuarios
- `GET /perfil/` - Perfil actual
- `PATCH /perfil/` - Actualizar perfil
- `GET /usuarios/` - Listar usuarios (admin)
- `POST /usuarios/` - Crear usuario (admin)
- `PATCH /usuarios/{id}/` - Actualizar usuario (admin)
- `DELETE /usuarios/{id}/` - Eliminar usuario (admin)

### Tesis
- `GET /tesis/` - Listar tesis
- `POST /tesis/` - Crear tesis
- `GET /tesis/{id}/` - Ver tesis
- `PATCH /tesis/{id}/` - Actualizar tesis
- `DELETE /tesis/{id}/` - Eliminar tesis

### Favoritos
- `GET /favoritos/` - Listar favoritos
- `POST /favoritos/` - Agregar favorito
- `DELETE /favoritos/{id}/` - Eliminar favorito

---

## 🚀 Próximos Pasos

1. **Actualizar la página de Registro** para incluir selección de rol (si aplica)
2. **Implementar la página de Cuenta** con formulario de actualización de perfil
3. **Crear la página de Favoritos** con lista de tesis favoritas
4. **Implementar búsqueda y filtrado** en Dashboard
5. **Agregar validaciones de permisos** en cada acción (crear, editar, eliminar)

---

## ⚠️ Notas Importantes

- **Los tokens se guardan en localStorage** - Considerar usar httpOnly cookies para mayor seguridad en producción
- **El token de acceso expira en 5 minutos** - El sistema refresca automáticamente
- **El token de refresco expira en 24 horas** - Después de eso, el usuario debe volver a iniciar sesión
- **El rol viene en el token JWT** - Asegúrate de que el backend incluya el rol en el payload del token
- **Las rutas protegidas verifican roles** - Usuario sin permiso es redirigido al dashboard

---

## 🐛 Troubleshooting

### Error: "useAuth must be used within an AuthProvider"
**Solución:** Asegúrate de que tu componente esté envuelto en `<AuthProvider>`

### Error: Token expirado
**Solución:** El sistema refresca automáticamente. Si falla, cierra sesión y vuelve a entrar.

### Las rutas no redirigen correctamente
**Solución:** Verifica que el rol en el token coincida con los roles definidos en `utils/roles.js`

### NavBar no muestra las opciones correctas
**Solución:** Verifica que `user.role` tenga el valor correcto y que esté definido en `ROLE_ROUTES`

---

✅ **Sistema de roles implementado y listo para usar**
