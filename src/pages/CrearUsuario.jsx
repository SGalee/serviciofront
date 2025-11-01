import React, { useState } from 'react';
import '../index.css';
import { createUser } from '../utils/api';

export default function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    username: '',
    password: '',
    confirmPassword: '',
    rol: 'estudiante',
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  const validate = () => {
    const errores = {};
    if (!usuario.nombre.trim()) errores.nombre = 'El nombre es obligatorio';
    if (!usuario.apellido.trim()) errores.apellido = 'El apellido es obligatorio';
    if (!usuario.username.trim()) {
      errores.username = 'El nombre de usuario es obligatorio';
    } else if (usuario.username.length < 3) {
      errores.username = 'Mínimo 3 caracteres';
    }
    if (!usuario.correo.trim()) {
      errores.correo = 'El correo institucional es obligatorio';
    } else {
      const correoOK = /@usm\.edu\.ve$/i.test(usuario.correo.trim());
      if (!correoOK) errores.correo = 'Debe ser un correo @usm.edu.ve';
    }
    if (!usuario.password) {
      errores.password = 'La contraseña es obligatoria';
    } else if (usuario.password.length < 6) {
      errores.password = 'Mínimo 6 caracteres';
    }
    if (!usuario.confirmPassword) {
      errores.confirmPassword = 'Confirma la contraseña';
    } else if (usuario.password !== usuario.confirmPassword) {
      errores.confirmPassword = 'Las contraseñas no coinciden';
    }
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccessMessage('');
    setError({});

    const token = localStorage.getItem('access_token');
    
    try {
      const userData = {
        username: usuario.username.trim(),
        email: usuario.correo.trim(),
        password: usuario.password,
        first_name: usuario.nombre.trim(),
        last_name: usuario.apellido.trim(),
        role: usuario.rol
      };
      
      await createUser(userData, token);
      
      setSuccessMessage(`✅ Usuario ${usuario.rol} creado correctamente`);
      
      // Limpiar formulario después de éxito
      setUsuario({ 
        nombre: '', 
        apellido: '', 
        correo: '', 
        username: '',
        password: '', 
        confirmPassword: '', 
        rol: 'estudiante' 
      });
      
    } catch (err) {
      console.error('Error al crear usuario:', err);
      setError({ general: 'Error al crear usuario. Verifica que el username no esté en uso.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-blue-500 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-white">Crear usuario</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl w-full">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
          
          {error.general && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error.general}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Nombre</label>
              <input
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.nombre
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="Nombre"
              />
              {error.nombre && <p className="text-sm text-red-600 mt-1">{error.nombre}</p>}
            </div>

            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Apellido</label>
              <input
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.apellido
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="Apellido"
              />
              {error.apellido && <p className="text-sm text-red-600 mt-1">{error.apellido}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Nombre de usuario</label>
              <input
                name="username"
                value={usuario.username}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.username
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="usuario123"
              />
              {error.username && <p className="text-sm text-red-600 mt-1">{error.username}</p>}
            </div>

            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Correo institucional</label>
              <input
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                type="email"
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.correo
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="usuario@usm.edu.ve"
              />
              {error.correo && <p className="text-sm text-red-600 mt-1">{error.correo}</p>}
            </div>
          </div>

          {/* Rol del usuario */}
          <div className="mt-4">
            <label className="block text-lg text-black mb-3 font-semibold">Rol</label>
            <select
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              className="w-full p-2 rounded-2xl border border-amber-200 shadow text-gray-900"
            >
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Contraseña</label>
              <input
                name="password"
                value={usuario.password}
                onChange={handleChange}
                type="password"
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.password
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="••••••••"
              />
              {error.password && <p className="text-sm text-red-600 mt-1">{error.password}</p>}
            </div>

            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Confirmar contraseña</label>
              <input
                name="confirmPassword"
                value={usuario.confirmPassword}
                onChange={handleChange}
                type="password"
                className={`w-full p-2 rounded-2xl border text-gray-900 transition-shadow ${
                  error.confirmPassword
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="••••••••"
              />
              {error.confirmPassword && <p className="text-sm text-red-600 mt-1">{error.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex justify-items-center mt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {loading ? 'Creando...' : 'Guardar Usuario'}
            </button>
          </div>
        </form>
      </div>
  );
}
