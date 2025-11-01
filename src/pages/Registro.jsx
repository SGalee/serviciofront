import React, { useState } from 'react';
import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import DRegistro from '../components/BRegistro.jsx';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', password: '', confirmPassword: '' });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const errores = {};
    if (!form.nombre) errores.nombre = 'El nombre es obligatorio';
    if (!form.apellido) errores.apellido = 'El apellido es obligatorio';
    if (!form.correo) {
      errores.correo = 'El correo institucional es obligatorio';
    } else if (!/@usm\.edu\.ve$/i.test(form.correo.trim())) {
      errores.correo = 'Debe ser un correo @usm.edu.ve';
    }
    if (!form.password) errores.password = 'La contraseña es obligatoria';
    if (!form.confirmPassword) errores.confirmPassword = 'Confirma la contraseña';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      errores.confirmPassword = 'Las contraseñas no coinciden';
    }
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  const onSubmitClick = (e) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    // Opcional: guardar un registro mínimo (sin contraseñas)
    const stored = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const saveObj = {
      id: Date.now(),
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      createdAt: new Date().toISOString(),
    };
    stored.push(saveObj);
    localStorage.setItem('usuarios', JSON.stringify(stored));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: formulario de registro */}
      <div className="w-1/2 flex items-center justify-center bg-orange-500 p-6">
        <div className="w-full max-w-lg bg-blue-700 text-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>

          <Input label="Nombre" id="nombre" value={form.nombre} onChange={handleChange} error={!!error.nombre} />
          {error.nombre && <p className="text-sm text-amber-200 mt-1">{error.nombre}</p>}
          <div className="h-4" />

          <Input label="Apellido" id="apellido" value={form.apellido} onChange={handleChange} error={!!error.apellido} />
          {error.apellido && <p className="text-sm text-amber-200 mt-1">{error.apellido}</p>}
          <div className="h-4" />

          <Input label="Correo institucional" id="correo" type="email" placeholder="correo@usm.edu.ve" value={form.correo} onChange={handleChange} error={!!error.correo} />
          {error.correo && <p className="text-sm text-amber-200 mt-1">{error.correo}</p>}
          <div className="h-4" />

          <Input label="Contraseña" id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} error={!!error.password} />
          {error.password && <p className="text-sm text-amber-200 mt-1">{error.password}</p>}
          <div className="h-4" />

          <Input label="Confirmar contraseña" id="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={!!error.confirmPassword} />
          {error.confirmPassword && <p className="text-sm text-amber-200 mt-1">{error.confirmPassword}</p>}

          <div className="mt-6 flex flex-col items-center w-full">
            <div className="w-40">
              <DRegistro to="/dashboard" onClick={onSubmitClick} />
            </div>

            <div className="mt-3">
              <h1 className="text-sm items-center text-amber-600">¿Ya estas registrado?</h1>
              <Link to="/" className="text-sm text-amber-600 hover:underline text-center flex flex-col hover:text-amber-900">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>

      <div className="w-20 h-1/6 bg-blue-900 flex flex-col"></div>
      <div className=" w-20 h-1/4 bg-orange-500 "></div>
      <div className="w-20 h-1/3 bg-blue-900 flex"></div>
      <div className=" w-20 h-1/4 bg-orange-500 "></div>

      </div>


      <div>
       <div className="w-20 h-1/6 bg-blue-600"></div>
        <div className="w-20 h-1/4 bg-blue-900 "></div>
        <div className="w-20 h-1/4 bg-yellow-400 flex"></div>
        <div className="w-20 h-1/3 bg-blue-900 flex"></div>
      </div>

      <div>
      <div className="w-20 h-1/1 bg-blue-900"></div>
      </div>

      <div className="w-1/2 bg-blue-600 flex flex-col items-center justify-center"></div>
    </div>
  );
}
