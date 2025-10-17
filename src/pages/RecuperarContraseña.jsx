import React, { useEffect } from 'react';
import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import BRecuperar from '../components/BRecuperar.jsx';

export default function RecuperarContraseña() {
  return (
    <div className="min-h-screen flex">
      {/* Left: input de recuperación centrado */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-semibold mb-4 text-center">Recuperar contraseña</h1>

          <Input label="Correo de recuperación" id="rec-email" type="email" placeholder="correo@usm.edu.ve" />

          <div className="w-full mt-6">
            <BRecuperar />
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="text-sm text-yellow-400 hover:underline hover:text-yellow-900">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Right: fondo amarillo contrastante */}
      <div className="w-1/2 bg-yellow-300 flex items-center justify-center">
        {/* espacio visual */}
      </div>
    </div>
  );
}
