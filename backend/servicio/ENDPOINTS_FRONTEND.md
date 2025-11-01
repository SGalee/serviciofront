# 🔌 ENDPOINTS PARA EL FRONTEND

## 📍 Base URL
```javascript
const BASE_URL = 'http://localhost:8000';
const API_URL = 'http://localhost:8000/api';
```

---

## 🔐 AUTENTICACIÓN

### 1. **Registro de Usuario**
```javascript
// POST /api/registro/
axios.post(`${API_URL}/registro/`, {
  username: "usuario123",
  email: "usuario@example.com",
  password: "contraseña_segura",
  first_name: "Juan",
  last_name: "Pérez"
})
```

### 2. **Login (Obtener Token)**
```javascript
// POST /api/token/
axios.post(`${API_URL}/token/`, {
  username: "usuario123",
  password: "contraseña_segura"
})
// Respuesta:
// {
//   "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
//   "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
// }
```

### 3. **Refrescar Token**
```javascript
// POST /api/token/refresh/
axios.post(`${API_URL}/token/refresh/`, {
  refresh: "eyJ0eXAiOiJKV1QiLCJhbGc..."
})
// Respuesta:
// {
//   "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
// }
```

---

## 📚 TESIS (CRUD COMPLETO)

### 1. **Listar Todas las Tesis**
```javascript
// GET /api/tesis/
axios.get(`${API_URL}/tesis/`, {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
```

### 2. **Obtener Una Tesis Específica**
```javascript
// GET /api/tesis/{id}/
axios.get(`${API_URL}/tesis/1/`, {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
```

### 3. **Crear Nueva Tesis (con PDF)**
```javascript
// POST /api/tesis/
const formData = new FormData();
formData.append('titulo', 'Título de mi tesis');
formData.append('autor', 'Juan Pérez');
formData.append('fecha_publicacion', 2024);
formData.append('resumen', 'Este es el resumen de la tesis...');
formData.append('archivo_pdf', pdfFile); // File object del input
formData.append('tutor', 'Dr. García');

axios.post(`${API_URL}/tesis/`, formData, {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'multipart/form-data'
  }
})
```

### 4. **Actualizar Tesis Completa**
```javascript
// PUT /api/tesis/{id}/
const formData = new FormData();
formData.append('titulo', 'Título actualizado');
formData.append('autor', 'Juan Pérez');
formData.append('fecha_publicacion', 2024);
formData.append('resumen', 'Resumen actualizado...');
formData.append('tutor', 'Dr. García');
// Si quieres cambiar el PDF:
formData.append('archivo_pdf', newPdfFile);

axios.put(`${API_URL}/tesis/1/`, formData, {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'multipart/form-data'
  }
})
```

### 5. **Actualizar Tesis Parcial (solo algunos campos)**
```javascript
// PATCH /api/tesis/{id}/
axios.patch(`${API_URL}/tesis/1/`, {
  titulo: 'Nuevo título',
  resumen: 'Nuevo resumen'
}, {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }
})
```

### 6. **Eliminar Tesis**
```javascript
// DELETE /api/tesis/{id}/
axios.delete(`${API_URL}/tesis/1/`, {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
```

---

## 📦 LISTA COMPLETA DE ENDPOINTS

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| POST | `/api/registro/` | Registrar nuevo usuario | ❌ No |
| POST | `/api/token/` | Login (obtener tokens) | ❌ No |
| POST | `/api/token/refresh/` | Refrescar access token | ❌ No |
| GET | `/api/tesis/` | Listar todas las tesis | ✅ Sí |
| GET | `/api/tesis/{id}/` | Ver una tesis | ✅ Sí |
| POST | `/api/tesis/` | Crear tesis | ✅ Sí |
| PUT | `/api/tesis/{id}/` | Actualizar tesis completa | ✅ Sí |
| PATCH | `/api/tesis/{id}/` | Actualizar tesis parcial | ✅ Sí |
| DELETE | `/api/tesis/{id}/` | Eliminar tesis | ✅ Sí |

---

## ⚙️ CONFIGURACIÓN DE AXIOS (RECOMENDADA)

### Archivo: `src/api/axiosConfig.js` o `src/services/api.js`

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const API_URL = 'http://localhost:8000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token automáticamente
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

// Interceptor para manejar errores y refrescar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró (401) y no hemos intentado refrescar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
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

## 📝 EJEMPLOS DE USO EN COMPONENTES

### 1. **Login Component**

```javascript
import api from './api/axiosConfig';

const login = async (username, password) => {
  try {
    const response = await api.post('/token/', {
      username,
      password
    });
    
    // Guardar tokens
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    console.log('Login exitoso');
    return response.data;
  } catch (error) {
    console.error('Error en login:', error.response?.data);
    throw error;
  }
};
```

### 2. **Registro Component**

```javascript
import api from './api/axiosConfig';

const register = async (userData) => {
  try {
    const response = await api.post('/registro/', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName
    });
    
    console.log('Usuario registrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data);
    throw error;
  }
};
```

### 3. **Listar Tesis Component**

```javascript
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';

const TesisList = () => {
  const [tesis, setTesis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTesis = async () => {
      try {
        const response = await api.get('/tesis/');
        setTesis(response.data);
      } catch (error) {
        console.error('Error al cargar tesis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTesis();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {tesis.map((t) => (
        <div key={t.id}>
          <h3>{t.titulo}</h3>
          <p>Autor: {t.autor}</p>
          <p>Año: {t.fecha_publicacion}</p>
          <a href={t.archivo_pdf} target="_blank">Ver PDF</a>
        </div>
      ))}
    </div>
  );
};
```

### 4. **Crear Tesis Component**

```javascript
import api from './api/axiosConfig';
import { useState } from 'react';

const CreateTesis = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    fecha_publicacion: 2024,
    resumen: '',
    tutor: '',
    archivo_pdf: null
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo_pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('autor', formData.autor);
    data.append('fecha_publicacion', formData.fecha_publicacion);
    data.append('resumen', formData.resumen);
    data.append('tutor', formData.tutor);
    data.append('archivo_pdf', formData.archivo_pdf);

    try {
      const response = await api.post('/tesis/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Tesis creada:', response.data);
      alert('Tesis creada exitosamente!');
    } catch (error) {
      console.error('Error al crear tesis:', error.response?.data);
      alert('Error al crear tesis');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={formData.titulo}
        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
      />
      <input
        type="text"
        placeholder="Autor"
        value={formData.autor}
        onChange={(e) => setFormData({...formData, autor: e.target.value})}
      />
      <input
        type="number"
        placeholder="Año"
        value={formData.fecha_publicacion}
        onChange={(e) => setFormData({...formData, fecha_publicacion: e.target.value})}
      />
      <textarea
        placeholder="Resumen"
        value={formData.resumen}
        onChange={(e) => setFormData({...formData, resumen: e.target.value})}
      />
      <input
        type="text"
        placeholder="Tutor"
        value={formData.tutor}
        onChange={(e) => setFormData({...formData, tutor: e.target.value})}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <button type="submit">Crear Tesis</button>
    </form>
  );
};
```

### 5. **Eliminar Tesis**

```javascript
import api from './api/axiosConfig';

const deleteTesis = async (id) => {
  try {
    await api.delete(`/tesis/${id}/`);
    console.log('Tesis eliminada');
    return true;
  } catch (error) {
    console.error('Error al eliminar:', error);
    return false;
  }
};
```

---

## 🔄 RESPUESTAS DEL BACKEND

### Respuesta exitosa de Tesis:
```json
{
  "id": 1,
  "titulo": "Título de la tesis",
  "autor": "Juan Pérez",
  "fecha_publicacion": 2024,
  "resumen": "Este es el resumen...",
  "archivo_pdf": "http://localhost:8000/media/tesis_pdfs/archivo.pdf",
  "tutor": "Dr. García"
}
```

### Respuesta de Login exitoso:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Respuesta de error:
```json
{
  "detail": "No active account found with the given credentials"
}
```

---

## ⚠️ NOTAS IMPORTANTES

1. **CORS ya está configurado** para:
   - `http://localhost:5173` (Vite)
   - `http://localhost:3000` (React/Next.js)

2. **Tokens JWT**:
   - Access token dura 5 minutos
   - Refresh token dura 24 horas
   - Guardar en `localStorage` o `sessionStorage`

3. **Archivos PDF**:
   - El campo `archivo_pdf` devuelve la URL completa
   - Usar `multipart/form-data` para crear/actualizar con archivos

4. **Autenticación**:
   - Endpoints públicos: `/registro/`, `/token/`, `/token/refresh/`
   - Todos los endpoints de tesis requieren autenticación

---

## 🚀 INICIO RÁPIDO

1. **Instalar Axios en tu proyecto:**
```bash
npm install axios
```

2. **Copiar la configuración de Axios** (código arriba)

3. **Usar en tus componentes:**
```javascript
import api from './api/axiosConfig';

// Hacer requests
const data = await api.get('/tesis/');
```

---

✅ **¡Todo listo para conectar el frontend con el backend!**
