import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import BIniciar from '../components/BIniciar.jsx';
import ColumnaColors from '../components/ColumnaColors.jsx'
import React, { useState } from 'react';

export default function Inicio() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const errores = {};
    if (!form.email && !form.correo) {
      // For safety if id differs, support both keys
      errores.correo = 'El correo institucional es obligatorio';
    }
    const correo = form.email || form.correo || '';
    if (correo && !/@usm\.edu\.ve$/i.test(correo.trim())) {
      errores.correo = 'Debe ser un correo @usm.edu.ve';
    }
    if (!form.password) {
      errores.password = 'La contraseña es obligatoria';
    }
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  const onSubmitClick = (e) => {
    if (!validate()) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: contenido (mitad izquierda) */}
      <div className="w-1/2 flex items-center justify-center p-6 bg-orange-500">
        <div className="w-full max-w-lg bg-blue-700 rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Inicio de sesión</h1>

          <Input label="Correo institucional" id="correo" type="email" placeholder="correo@usm.edu.ve" value={form.correo} onChange={handleChange} error={!!error.correo} />
          {error.correo && <p className="text-sm text-amber-200 mt-1">{error.correo}</p>}
          <div className="h-4" />
          <Input label="Contraseña" id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} error={!!error.password} />
          {error.password && <p className="text-sm text-amber-200 mt-1">{error.password}</p>}

          <div className="mt-6 flex flex-col items-center">
            <div className="w-40">
              <BIniciar to="/dashboard" onClick={onSubmitClick} />
            </div>

            <div className="mt-3">
              <Link to="/recuperacion" className="text-sm text-white hover:underline hover:text-amber-800">
                Olvidaste tu contraseña
              </Link>
              <h1 className="text-sm items-center text-white flex flex-col">¿No tienes cuenta?</h1>
              <Link to="/registro" className="text-sm text-white hover:underline text-center flex-col flex hover:text-amber-900">
                Regístrate
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
