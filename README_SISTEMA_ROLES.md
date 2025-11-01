# 🎓 Sistema de Gestión de Tesis - Frontend

Sistema de gestión de tesis universitarias con autenticación y control de acceso basado en roles.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Backend corriendo en `http://localhost:8000`

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 🎭 Roles del Sistema

### 👨‍💼 Administrador
- Acceso completo a todas las funcionalidades
- Gestión de usuarios
- CRUD completo de tesis
- Vista: `/admin/*`

### 👨‍🏫 Docente
- Crear y gestionar sus propias tesis
- Visualizar todas las tesis
- Gestión de favoritos
- Vista: `/docente/*`

### 👨‍🎓 Estudiante
- Buscar y visualizar tesis
- Gestión de favoritos
- Solo lectura
- Vista: `/estudiante/*`

---

## 📁 Estructura del Proyecto

```
src/
├── context/          # Contexto de autenticación
├── hooks/            # Hooks personalizados (useAuth)
├── layouts/          # Layouts por rol
├── components/       # Componentes reutilizables
├── pages/            # Páginas de la aplicación
├── utils/            # Utilidades (API, roles, etc.)
└── App.jsx           # Configuración de rutas
```

---

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para autenticación:

1. Usuario ingresa credenciales
2. Backend retorna tokens (access y refresh)
3. Token se guarda en localStorage
4. Se extrae el rol del token
5. Usuario es redirigido según su rol

---

## 🛣️ Rutas Principales

### Públicas
- `/` - Login
- `/registro` - Registro
- `/recuperacion` - Recuperar contraseña

### Admin
- `/admin/dashboard` - Panel principal
- `/admin/creartesis` - Crear tesis
- `/admin/usuarios` - Gestión de usuarios
- `/admin/crearusuario` - Crear usuario

### Docente
- `/docente/dashboard` - Panel principal
- `/docente/creartesis` - Crear tesis
- `/docente/favoritos` - Favoritos

### Estudiante
- `/estudiante/dashboard` - Buscar tesis
- `/estudiante/favoritos` - Favoritos

---

## 📚 Documentación

- **[SISTEMA_ROLES.md](./SISTEMA_ROLES.md)** - Documentación completa del sistema de roles
- **[INTEGRACION_BACKEND.md](./INTEGRACION_BACKEND.md)** - Guía de integración con el backend
- **[ESTRUCTURA.md](./ESTRUCTURA.md)** - Resumen visual de la estructura

---

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000
```

### Uso en código:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

---

## 💻 Uso del Sistema

### 1. Iniciar sesión

```jsx
import { useAuth } from './hooks/useAuth';

function Login() {
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    
    if (result.success) {
      // Redirigir según rol
    }
  };
}
```

### 2. Proteger rutas

```jsx
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

<Route path="/admin" element={
  <ProtectedRoute allowedRoles={ROLES.ADMIN}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

### 3. Verificar roles

```jsx
import { useAuth } from './hooks/useAuth';
import { ROLES } from './utils/roles';

function Component() {
  const { hasRole } = useAuth();
  
  return (
    <>
      {hasRole(ROLES.ADMIN) && <AdminButton />}
      {hasRole([ROLES.ADMIN, ROLES.DOCENTE]) && <CreateButton />}
    </>
  );
}
```

---

## 🔌 Conexión con Backend

### Endpoints Principales

```javascript
import api from './utils/api';

// Login
await api.login(username, password);

// Tesis
await api.listTesis(token);
await api.createTesis(tesisData, token);

// Usuarios (Admin)
await api.listUsers(token);
await api.createUser(userData, token);

// Favoritos
await api.listFavoritos(token);
await api.addFavorito(tesisId, token);
```

Ver [ENDPOINTS_FRONTEND.md](../servicioback/servicio/ENDPOINTS_FRONTEND.md) para más detalles.

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Coverage
npm run coverage
```

---

## 🏗️ Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos estarán en `dist/`.

---

## 🐛 Troubleshooting

### Error: "useAuth must be used within an AuthProvider"
**Solución:** Asegúrate de que tu componente esté dentro de `<AuthProvider>`

### Error: Token expirado
**Solución:** El sistema refresca automáticamente. Si persiste, cierra sesión e inicia de nuevo.

### Error: CORS
**Solución:** Verifica que el backend tenga configurado CORS para `http://localhost:5173`

### No se muestran las rutas del rol
**Solución:** Verifica que el token JWT incluya el campo `role` en su payload

---

## 📦 Dependencias Principales

- React 18
- React Router DOM 6
- Axios (API calls)
- TailwindCSS (Estilos)
- Vite (Build tool)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Notas Importantes

- **Los tokens se guardan en localStorage** - Considerar cookies httpOnly en producción
- **Token de acceso expira en 5 minutos** - Se refresca automáticamente
- **Token de refresco expira en 24 horas** - Requiere nuevo login después
- **El rol debe venir en el JWT** - Configurar en el backend (ver INTEGRACION_BACKEND.md)

---

## 📧 Soporte

Si encuentras problemas:

1. Revisa la documentación en `SISTEMA_ROLES.md`
2. Consulta `INTEGRACION_BACKEND.md` para configuración del backend
3. Verifica la consola del navegador para errores
4. Revisa que el backend esté corriendo

---

## 📄 Licencia

[Especificar licencia]

---

## 👥 Autores

[Tus datos]

---

✅ **Sistema listo para usar**

Para más información detallada, consulta los archivos de documentación:
- [SISTEMA_ROLES.md](./SISTEMA_ROLES.md)
- [INTEGRACION_BACKEND.md](./INTEGRACION_BACKEND.md)
- [ESTRUCTURA.md](./ESTRUCTURA.md)
