import React from 'react';
import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import DRegistro from '../components/BRegistro.jsx';

export default function Registro() {
  return (
    <div className="min-h-screen flex">
      {/* Left: formulario de registro */}
      <div className="w-1/2 flex items-center justify-center bg-orange-500 p-6">
        <div className="w-full max-w-lg bg-blue-700 text-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>

          <Input label="Nombre" id="reg-nombre" type="Nombre"/>
          <div className="h-4" />
          <Input label="Apellido" id="reg-nombre" type="Nombre"/>
          <div className="h-4" />
          <Input label="Correo institucional" id="reg-email" type="email" placeholder="correo@usm.edu.ve" />
          <div className="h-4" />
          <Input label="Contraseña" id="reg-password" type="password" placeholder="••••••••" />
          <div className="h-4" />
          <Input label="Confirmar contraseña" id="reg-password2" type="password" placeholder="••••••••" />

          <div className="mt-6 flex flex-col items-center w-full">
            <div className="w-40">
              <DRegistro />
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
