# 🎨 Ejemplos de Componentes con el Sistema de Roles

Ejemplos prácticos de cómo usar el sistema de roles en tus componentes.

---

## 1. 📝 Componente de Lista de Tesis

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/roles';
import api from '../utils/api';

function TesisList() {
  const { user, token, hasRole } = useAuth();
  const [tesis, setTesis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTesis();
  }, []);

  const loadTesis = async () => {
    try {
      setLoading(true);
      const data = await api.listTesis(token);
      setTesis(data);
    } catch (err) {
      setError('Error al cargar tesis');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta tesis?')) return;
    
    try {
      await api.deleteTesis(id, token);
      loadTesis(); // Recargar lista
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Tesis</h2>
      
      {hasRole([ROLES.ADMIN, ROLES.DOCENTE]) && (
        <button 
          onClick={() => navigate('/creartesis')}
          className="bg-amber-600 text-white px-4 py-2 rounded mb-4"
        >
          Nueva Tesis
        </button>
      )}

      <div className="grid gap-4">
        {tesis.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{t.titulo}</h3>
            <p className="text-gray-600">Autor: {t.autor}</p>
            <p className="text-gray-600">Tutor: {t.tutor}</p>
            <p className="text-gray-600">Año: {t.fecha_publicacion}</p>
            
            <div className="mt-4 flex gap-2">
              <a 
                href={t.archivo_pdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Ver PDF
              </a>
              
              {/* Botón editar: solo admin o docente (dueño) */}
              {(hasRole(ROLES.ADMIN) || 
                (hasRole(ROLES.DOCENTE) && t.usuario_id === user.id)) && (
                <button 
                  onClick={() => navigate(`/editar/${t.id}`)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>
              )}
              
              {/* Botón eliminar: solo admin o docente (dueño) */}
              {(hasRole(ROLES.ADMIN) || 
                (hasRole(ROLES.DOCENTE) && t.usuario_id === user.id)) && (
                <button 
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TesisList;
```

---

## 2. 👥 Componente de Gestión de Usuarios (Solo Admin)

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/roles';
import api from '../utils/api';

function UserManagement() {
  const { token, hasRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Solo admin puede acceder
  if (!hasRole(ROLES.ADMIN)) {
    return <div>No tienes permisos para ver esta página</div>;
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.listUsers(token);
      setUsers(data);
    } catch (err) {
      console.error('Error cargando usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    
    try {
      await api.deleteUser(id, token);
      loadUsers();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async (userData) => {
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, userData, token);
      } else {
        await api.createUser(userData, token);
      }
      setShowModal(false);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      alert('Error al guardar usuario');
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded"
        >
          Nuevo Usuario
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-sm ${
                  user.role === 'admin' ? 'bg-red-200' :
                  user.role === 'docente' ? 'bg-green-200' :
                  'bg-blue-200'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-3">
                <button 
                  onClick={() => handleEdit(user)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal 
          user={editingUser}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UserManagement;
```

---

## 3. ⭐ Componente de Favoritos

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Favoritos() {
  const { token } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    try {
      setLoading(true);
      const data = await api.listFavoritos(token);
      setFavoritos(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.removeFavorito(id, token);
      loadFavoritos();
    } catch (err) {
      alert('Error al eliminar favorito');
    }
  };

  if (loading) return <div>Cargando favoritos...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Favoritos</h2>
      
      {favoritos.length === 0 ? (
        <p className="text-gray-500">No tienes favoritos aún</p>
      ) : (
        <div className="grid gap-4">
          {favoritos.map((fav) => (
            <div key={fav.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{fav.tesis_detalle.titulo}</h3>
              <p className="text-gray-600">Autor: {fav.tesis_detalle.autor}</p>
              <p className="text-sm text-gray-500">
                Agregado: {new Date(fav.fecha_agregado).toLocaleDateString()}
              </p>
              
              <div className="mt-3 flex gap-2">
                <a 
                  href={fav.tesis_detalle.archivo_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Ver PDF
                </a>
                <button 
                  onClick={() => handleRemove(fav.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Quitar de favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
```

---

## 4. 👤 Componente de Perfil de Usuario

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Cuenta() {
  const { user, token, updateUserProfile } = useAuth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await api.getUserProfile(token);
      setForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updated = await api.updateUserProfile(form, token);
      updateUserProfile(updated);
      setSuccess(true);
    } catch (err) {
      alert('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>
      
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6">
          <p className="text-gray-600">Usuario: <strong>{user?.username}</strong></p>
          <p className="text-gray-600">Rol: <strong className="capitalize">{user?.role}</strong></p>
        </div>

        <form onSubmit={handleSubmit}>
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              Perfil actualizado correctamente
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cuenta;
```

---

## 5. 🔍 Componente de Búsqueda con Filtros

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Dashboard() {
  const { token } = useAuth();
  const [tesis, setTesis] = useState([]);
  const [filteredTesis, setFilteredTesis] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    año: '',
    tipo: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTesis();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tesis]);

  const loadTesis = async () => {
    try {
      setLoading(true);
      const data = await api.listTesis(token);
      setTesis(data);
      setFilteredTesis(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tesis];

    // Filtrar por búsqueda (título, autor, tutor)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(t => 
        t.titulo.toLowerCase().includes(search) ||
        t.autor.toLowerCase().includes(search) ||
        t.tutor.toLowerCase().includes(search)
      );
    }

    // Filtrar por año
    if (filters.año) {
      result = result.filter(t => t.fecha_publicacion === parseInt(filters.año));
    }

    // Filtrar por tipo
    if (filters.tipo) {
      result = result.filter(t => t.tipo === filters.tipo);
    }

    setFilteredTesis(result);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const addToFavorites = async (tesisId) => {
    try {
      await api.addFavorito(tesisId, token);
      alert('Agregado a favoritos');
    } catch (err) {
      alert('Error al agregar a favoritos');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buscar Tesis</h2>

      {/* Filtros */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Título, autor o tutor..."
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Año</label>
            <select
              name="año"
              value={filters.año}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              {[...new Set(tesis.map(t => t.fecha_publicacion))].sort().reverse().map(año => (
                <option key={año} value={año}>{año}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tipo</label>
            <select
              name="tipo"
              value={filters.tipo}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="pregrado">Pregrado</option>
              <option value="postgrado">Postgrado</option>
              <option value="maestria">Maestría</option>
              <option value="doctorado">Doctorado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="text-gray-600 mb-4">
        {filteredTesis.length} tesis encontradas
      </div>

      <div className="grid gap-4">
        {filteredTesis.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{t.titulo}</h3>
                <p className="text-gray-600"><strong>Autor:</strong> {t.autor}</p>
                <p className="text-gray-600"><strong>Tutor:</strong> {t.tutor}</p>
                <p className="text-gray-600"><strong>Año:</strong> {t.fecha_publicacion}</p>
                <p className="text-gray-600"><strong>Tipo:</strong> {t.tipo}</p>
                <p className="text-gray-700 mt-2">{t.resumen}</p>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <a 
                  href={t.archivo_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-center whitespace-nowrap"
                >
                  Ver PDF
                </a>
                <button 
                  onClick={() => addToFavorites(t.id)}
                  className="bg-amber-600 text-white px-4 py-2 rounded whitespace-nowrap"
                >
                  ⭐ Favorito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 6. 🔒 HOC para Verificar Permisos

```jsx
// withPermission.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function withPermission(Component, requiredRoles) {
  return function PermissionComponent(props) {
    const { hasRole, user } = useAuth();

    if (!hasRole(requiredRoles)) {
      return (
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Acceso denegado</strong>
            <p>No tienes permisos para ver esta página.</p>
            <p className="text-sm mt-2">Tu rol: {user?.role}</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Uso:
const AdminPanel = () => <div>Panel Admin</div>;
export default withPermission(AdminPanel, ['admin']);
```

---

Estos ejemplos te muestran cómo implementar las funcionalidades principales usando el sistema de roles. Puedes adaptarlos según tus necesidades específicas.
