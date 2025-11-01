import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../hooks/useAuth';

/**
 * Layout específico para el rol de Administrador
 * Incluye navegación con todas las opciones administrativas
 */
const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen min-w-screen flex">
      <NavBar userRole={user?.role} />
      <div className="flex-1 bg-blue-500">
        {/* Header específico para admin */}
        <div className="bg-amber-600 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <span className="text-sm">Administrador: {user?.username}</span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
