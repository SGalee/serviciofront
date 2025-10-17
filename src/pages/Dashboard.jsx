import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <div className="min-h-screen flex">
        <div className="w-1/5 bg-yellow-400 flex flex-col px-10">

          <h1 className="text-6xl font-semibold flex flex-col py-15 items-center">[LOGO]</h1>
          <h1 className="text-2xl font-semibold flex flex-col py-10 items-center focus:ring">Cuenta</h1>
          <h1 className="text-2xl font-semibold flex flex-col py-10 items-center">Crear</h1>
          <h1 className="text-2xl font-semibold flex flex-col py-10 items-center">Buscar</h1>
          <h1 className="text-2xl font-semibold flex flex-col py-10 items-center">Favoritos</h1>
          <Link to="/" className="text-2xl font-semibold flex flex-col absolute bottom-10 left-27 hover:text-amber-900 underline">Cerrar sesión</Link>

        </div>
        <h1 className="text-6xl font-semibold px-6">Dashboard</h1>
      </div>

    </div>
  );
}
