import React from 'react';
import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import BRecuperar from '../components/BRecuperar.jsx';

export default function RecuperarContraseña() {
  return (
    <div className="min-h-screen flex">
      {/* Left: input de recuperación centrado */}
      <div className="w-1/2 flex items-center justify-center p-6 bg-orange-500">
        <div className="w-full max-w-md bg-blue-700 text-white rounded-xl shadow-md p-8">
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
