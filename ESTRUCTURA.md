# 📊 Resumen de la Estructura del Sistema de Roles

## 🗂️ Archivos Creados

```
serviciofront/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx          ✨ NUEVO - Gestión de autenticación y estado del usuario
│   │
│   ├── hooks/
│   │   └── useAuth.js               ✨ NUEVO - Hook para acceder al contexto de auth
│   │
│   ├── utils/
│   │   ├── api.ts                   ✅ ACTUALIZADO - Nuevas funciones de API
│   │   └── roles.js                 ✨ NUEVO - Constantes de roles y permisos
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx           ✨ NUEVO - Layout general
│   │   ├── AdminLayout.jsx          ✨ NUEVO - Layout para admin
│   │   ├── DocenteLayout.jsx        ✨ NUEVO - Layout para docente
│   │   └── EstudianteLayout.jsx     ✨ NUEVO - Layout para estudiante
│   │
│   ├── components/
│   │   ├── ProtectedRoute.jsx       ✨ NUEVO - Componente para proteger rutas
│   │   └── NavBar.jsx               ✅ ACTUALIZADO - Navegación dinámica por rol
│   │
│   ├── pages/
│   │   └── Inicio.jsx               ✅ ACTUALIZADO - Login con autenticación
│   │
│   └── App.jsx                      ✅ ACTUALIZADO - Rutas protegidas por rol
│
├── SISTEMA_ROLES.md                 📖 Documentación completa del sistema
├── INTEGRACION_BACKEND.md           📖 Guía de integración con el backend
└── README.md                        (Actualizar con nueva info)
```

---

## 🎭 Rutas del Sistema

### Públicas (Sin autenticación)
```
/                     → Inicio (Login)
/registro             → Registro de usuario
/recuperacion         → Recuperar contraseña
```

### Protegidas - Administrador
```
/admin/dashboard      → Dashboard del admin
/admin/creartesis     → Crear nueva tesis
/admin/usuarios       → Gestión de usuarios
/admin/crearusuario   → Crear nuevo usuario
/admin/cuenta         → Perfil del admin
/admin/favoritos      → Favoritos del admin
```

### Protegidas - Docente
```
/docente/dashboard    → Dashboard del docente
/docente/creartesis   → Crear nueva tesis
/docente/cuenta       → Perfil del docente
/docente/favoritos    → Favoritos del docente
```

### Protegidas - Estudiante
```
/estudiante/dashboard → Dashboard del estudiante
/estudiante/cuenta    → Perfil del estudiante
/estudiante/favoritos → Favoritos del estudiante
```

---

## 🔐 Flujo de Autenticación

```
┌─────────────────┐
│  Usuario entra  │
│   a /inicio     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Ingresa user   │
│  y contraseña   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Frontend llama a:          │
│  POST /api/token/           │
│  { username, password }     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Backend verifica y         │
│  retorna:                   │
│  { access, refresh }        │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Frontend decodifica token  │
│  y extrae: user_id, role    │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Guarda en localStorage:    │
│  - access_token             │
│  - refresh_token            │
│  - user (con rol)           │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  AuthContext actualiza      │
│  estado global              │
└────────┬────────────────────┘
         │
         ▼
        / \
       /   \
      /     \
     /       \
    /         \
┌───▼────┐  ┌──▼──────┐  ┌──▼──────────┐
│ Admin  │  │ Docente │  │ Estudiante  │
│ /admin │  │/docente │  │ /estudiante │
└────────┘  └─────────┘  └─────────────┘
```

---

## 🛡️ Sistema de Permisos

### Por Rol

| Acción | Admin | Docente | Estudiante |
|--------|-------|---------|------------|
| Ver tesis | ✅ Todas | ✅ Todas | ✅ Todas |
| Crear tesis | ✅ | ✅ | ❌ |
| Editar tesis | ✅ Todas | ✅ Propias | ❌ |
| Eliminar tesis | ✅ Todas | ✅ Propias | ❌ |
| Ver usuarios | ✅ | ❌ | ❌ |
| Crear usuarios | ✅ | ❌ | ❌ |
| Editar usuarios | ✅ | ❌ | ❌ |
| Eliminar usuarios | ✅ | ❌ | ❌ |
| Favoritos | ✅ | ✅ | ✅ |

---

## 🔄 Componentes Reutilizables

### 1. **useAuth Hook**
```jsx
import { useAuth } from '../hooks/useAuth';

function MiComponente() {
  const { user, logout, hasRole } = useAuth();
  
  return (
    <div>
      <p>Hola {user?.username}</p>
      {hasRole('admin') && <button>Solo admin</button>}
      <button onClick={logout}>Salir</button>
    </div>
  );
}
```

### 2. **ProtectedRoute**
```jsx
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../utils/roles';

<Route path="/admin" element={
  <ProtectedRoute allowedRoles={ROLES.ADMIN}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

### 3. **NavBar Dinámico**
```jsx
// Se adapta automáticamente según el rol
<NavBar /> // No necesita props, lee del contexto
```

---

## 📚 API Functions

### Autenticación
```javascript
import api from '../utils/api';

// Login
const { access, refresh } = await api.login(username, password);

// Registro
await api.registerUser({ username, email, password, ... });

// Refrescar token
const { access } = await api.refreshToken(refreshToken);
```

### Perfil
```javascript
// Obtener perfil
const profile = await api.getUserProfile(token);

// Actualizar perfil
await api.updateUserProfile({ first_name, email }, token);
```

### Usuarios (Admin)
```javascript
// Listar
const users = await api.listUsers(token);

// Crear
await api.createUser({ username, role, ... }, token);

// Actualizar
await api.updateUser(id, { role: 'docente' }, token);

// Eliminar
await api.deleteUser(id, token);
```

### Tesis
```javascript
// Listar
const tesis = await api.listTesis(token);

// Crear con archivo
await api.createTesis({ 
  titulo, autor, resumen, tutor, 
  fecha_publicacion, archivo 
}, token);

// Actualizar
await api.updateTesis(id, { titulo }, token);

// Eliminar
await api.deleteTesis(id, token);
```

### Favoritos
```javascript
// Listar
const favoritos = await api.listFavoritos(token);

// Agregar
await api.addFavorito(tesisId, token);

// Eliminar
await api.removeFavorito(favoritoId, token);
```

---

## ✅ Checklist de Implementación

### Frontend (Completado)
- [x] AuthContext creado
- [x] Hook useAuth implementado
- [x] Constantes de roles definidas
- [x] ProtectedRoute creado
- [x] Layouts por rol creados
- [x] NavBar dinámico implementado
- [x] Rutas protegidas configuradas
- [x] Página de login actualizada
- [x] API functions completadas

### Backend (Pendiente - Ver INTEGRACION_BACKEND.md)
- [ ] Agregar campo 'role' al modelo User
- [ ] Configurar JWT con rol en payload
- [ ] Crear endpoint /api/perfil/
- [ ] Crear endpoint /api/usuarios/
- [ ] Crear endpoint /api/favoritos/
- [ ] Implementar permisos por rol
- [ ] Verificar CORS

---

## 🚀 Cómo Usar

### 1. **Iniciar el proyecto**
```bash
npm run dev
```

### 2. **Probar el login**
- Ir a `http://localhost:5173`
- Ingresar credenciales
- Verificar redirección según rol

### 3. **Navegar**
- El NavBar mostrará solo las opciones permitidas
- Las rutas protegidas verificarán el rol
- El sistema refrescará el token automáticamente

---

## 🔍 Debugging

### Ver el estado del usuario
```javascript
// En cualquier componente
const { user } = useAuth();
console.log('Usuario:', user);
```

### Ver el token decodificado
```javascript
const token = localStorage.getItem('access_token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Payload:', payload);
```

### Verificar autenticación
```javascript
const { isAuthenticated } = useAuth();
console.log('Autenticado:', isAuthenticated);
```

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola del navegador** para errores
2. **Verifica que el backend esté corriendo**
3. **Consulta SISTEMA_ROLES.md** para documentación completa
4. **Consulta INTEGRACION_BACKEND.md** para configuración del backend
5. **Verifica el token en localStorage** para ver si incluye el rol

---

✅ **Sistema completo de roles implementado y documentado**
