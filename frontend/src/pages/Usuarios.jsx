import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Usuarios() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listUsers(token);
        setUsers(data);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        setError('Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    
    try {
      await api.deleteUser(id, token);
      setUsers(users.filter(u => u.id !== id));
      alert('✅ Usuario eliminado');
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error al eliminar usuario');
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-200 text-red-800';
      case 'docente': return 'bg-green-200 text-green-800';
      case 'estudiante': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-blue-500 p-8 flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-blue-500 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold text-white">Gestión de Usuarios</h1>
        <button
          onClick={() => navigate('crearusuario')}
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-2xl hover:bg-amber-700 shadow-lg font-semibold"
        >
          ➕ Crear Usuario
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold">Usuario</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Nombre</th>
              <th className="p-4 text-left font-semibold">Rol</th>
              <th className="p-4 text-left font-semibold">Fecha Registro</th>
              <th className="p-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.username}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => alert('Función de editar en desarrollo')}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
