import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../hooks/useAuth';

/**
 * Layout principal para todas las vistas autenticadas
 * Incluye la barra de navegación y el contenido
 */
const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen min-w-screen flex">
      <NavBar userRole={user?.role} />
      <div className="flex-1 bg-blue-500">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
