import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Usuarios() {
  return (
    <div className="min-h-screen min-w-screen flex">
      <NavBar />

      <div className="w-full bg-blue-500 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-semibold text-white">Listado de usuarios</h1>
          <Link
            to="/crearusuario"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-2xl hover:bg-amber-700 shadow"
          >
            + Crear usuario
          </Link>
        </div>

        {/* Contenido de usuarios (lista, filtros, etc.) */}
        <div className="bg-gray-100 p-6 rounded-2xl w-full">
          <p className="text-gray-700">Aquí podrás listar y gestionar usuarios.</p>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
