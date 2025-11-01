import React, { useState } from 'react';
import '../index.css';
import NavBar from '../components/NavBar';

export default function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmPassword: '',
    rol: 'consultor',
  });

  const [error, setError] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  const validate = () => {
    const errores = {};
    if (!usuario.nombre) errores.nombre = 'El nombre es obligatorio';
    if (!usuario.apellido) errores.apellido = 'El apellido es obligatorio';
    if (!usuario.correo) {
      errores.correo = 'El correo institucional es obligatorio';
    } else {
      const correoOK = /@usm\.edu\.ve$/i.test(usuario.correo.trim());
      if (!correoOK) errores.correo = 'Debe ser un correo @usm.edu.ve';
    }
    if (!usuario.password) errores.password = 'La contraseña es obligatoria';
    if (!usuario.confirmPassword) errores.confirmPassword = 'Confirma la contraseña';
    if (usuario.password && usuario.confirmPassword && usuario.password !== usuario.confirmPassword) {
      errores.confirmPassword = 'Las contraseñas no coinciden';
    }
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    alert('Usuario guardado correctamente');
    console.log(usuario);

    // Guardado local (sin contraseñas por seguridad)
    const stored = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const saveObj = {
      id: Date.now(),
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol,
      createdAt: new Date().toISOString(),
    };
    stored.push(saveObj);
    localStorage.setItem('usuarios', JSON.stringify(stored));

    setUsuario({ nombre: '', apellido: '', correo: '', password: '', confirmPassword: '', rol: 'consultor' });
  }

  return (
    <div className="min-h-screen min-w-screen flex">
      <NavBar />

      <div className="w-full bg-blue-500 p-8">
  <h1 className="text-4xl font-semibold mb-6 text-white">Crear usuario</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Nombre</label>
              <input
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.nombre
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="Nombre"
              />
              {error.nombre && <p className="text-sm text-red-600 mb-4">{error.nombre}</p>}
            </div>

            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Apellido</label>
              <input
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.apellido
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="Apellido"
              />
              {error.apellido && <p className="text-sm text-red-600 mb-4">{error.apellido}</p>}
            </div>
          </div>

          <div>
            <label className="block text-lg text-black mt-4 mb-3 font-semibold">Correo institucional</label>
            <input
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
              type="email"
              className={`w-full p-2 rounded-2xl border transition-shadow ${
                error.correo
                  ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                  : 'border-amber-200 shadow'
              }`}
              placeholder="usuario@usm.edu.ve"
            />
            {error.correo && <p className="text-sm text-red-600 mb-4">{error.correo}</p>}
          </div>

          {/* Rol del usuario */}
          <div>
            <label className="block text-lg text-black mt-2 mb-3 font-semibold">Rol</label>
            <select
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              className="w-full p-2 rounded-2xl border border-amber-200 shadow"
            >
              <option value="consultor">Consultor</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-black mt-4 mb-3 font-semibold">Contraseña</label>
              <input
                name="password"
                value={usuario.password}
                onChange={handleChange}
                type="password"
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.password
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="••••••••"
              />
              {error.password && <p className="text-sm text-red-600 mb-4">{error.password}</p>}
            </div>

            <div>
              <label className="block text-lg text-black mt-4 mb-3 font-semibold">Confirmar contraseña</label>
              <input
                name="confirmPassword"
                value={usuario.confirmPassword}
                onChange={handleChange}
                type="password"
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.confirmPassword
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="••••••••"
              />
              {error.confirmPassword && <p className="text-sm text-red-600 mb-4">{error.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex justify-items-center mt-2">
            <button type="submit" className="bg-amber-600 flex flex-col text-white px-4 py-2 rounded hover:bg-amber-700">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
