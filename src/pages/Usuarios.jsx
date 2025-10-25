import React from 'react'
import { Link } from 'react-router-dom';

function CrearUsuario() {
  return (
    <div className="min-h-screen min-w-screen flex">
  
        <div className="sm:w-1/4 lg:w-1/4 bg-orange-500 flex flex-col items-center hover:text-4xl">

          <h1 className="text-6xl font-semibold flex flex-col my-15 ">[LOGO]</h1>

          <h1 className="text-3xl px-23 py-4 rounded-3xl hover:bg-yellow-400 hover:text-4xl transition  font-semibold my-6 focus:ring">Cuenta</h1>
         <Link to ="/dashboard" className="text-3xl px-23 py-4 rounded-4xl hover:bg-yellow-400 transition font-semibold my-6 ">Buscar</Link>
          <Link to="/crearusuario" className="text-4xl px-19 py-4 rounded-3xl bg-yellow-400 font-semibold my-6 ">Usuarios</Link>
          <Link to="/creartesis" className="text-3xl px-15 py-4 rounded-3xl hover:bg-yellow-400 hover:text-4xl transition font-semibold my-6">Crear Tesis</Link>
          <h1 className="text-3xl px-19 py-4 rounded-3xl hover:bg-yellow-500 hover:text-4xl transition font-semibold my-6">Historial</h1>
          <Link to="/" className="text-3xl font-semibold flex flex-col bottom-10 left-27 my-10 hover:text-amber-900 underline">Cerrar sesión</Link> 
        </div>

      <div className="w-full bg-blue-500">
        <h1 className="text-6xl font-semibold">Usuarios</h1>

        <form className="w-full rounded-lg bg- shadow-">
          <label> KELOKEEE</label>
        </form>

      </div>

    </div>
  )
}

export default CrearUsuario
