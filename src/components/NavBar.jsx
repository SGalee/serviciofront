import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES, ROLE_ROUTES } from '../utils/roles';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar el prefijo de ruta según el rol
  const getRoutePrefix = () => {
    if (!user) return '';
    switch (user.role) {
      case ROLES.ADMIN:
        return '/admin';
      case ROLES.DOCENTE:
        return '/docente';
      case ROLES.ESTUDIANTE:
        return '/estudiante';
      default:
        return '';
    }
  };

  const routePrefix = getRoutePrefix();

  // Obtener las rutas disponibles para el rol del usuario
  const availableRoutes = user ? ROLE_ROUTES[user.role] || [] : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Función para verificar si una ruta está activa
  const isActiveRoute = (path) => {
    return location.pathname === `${routePrefix}${path}`;
  };

  // Configuración de rutas con iconos y estilos
  const routeConfig = {
    '/dashboard': {
      label: 'Buscar Tesis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    '/creartesis': {
      label: 'Crear Tesis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
      ),
      highlight: true,
    },
    '/usuarios': {
      label: 'Usuarios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
      ),
    },
    '/crearusuario': {
      label: 'Crear Usuario',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
        </svg>
      ),
    },
    '/tesis': {
      label: 'Tesis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
      ),
    },
    '/favoritos': {
      label: 'Favoritos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
      ),
    },
    '/cuenta': {
      label: 'Mi Cuenta',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  return (
    <nav className="bg-orange-500 w-full md:w-1/3 lg:w-1/3 max-w-[420px] min-w-[220px] md:sticky md:top-0 md:h-screen self-start">
      <div className="px-6 py-8 flex flex-col items-center min-h-screen">
        {/* Top: logo */}
        <div className="mb-4" aria-label="Logo Servicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="currentColor" role="img">
            <path d="M4 6.75A2.75 2.75 0 016.75 4h10.5A2.75 2.75 0 0120 6.75v10.5A2.75 2.75 0 0117.25 20H6.75A2.75 2.75 0 014 17.25V6.75z" opacity=".2"/>
            <path d="M12 6c-.39 0-.78.08-1.12.24l-6.02 2.7a.75.75 0 000 1.36l6.02 2.7c.34.16.73.24 1.12.24s.78-.08 1.12-.24l6.02-2.7a.75.75 0 000-1.36L13.12 6.24A2.75 2.75 0 0012 6zm-6.88 7.03a.75.75 0 011.02-.36l4.74 2.13c.68.3 1.46.3 2.14 0l4.74-2.13a.75.75 0 11.66 1.35l-4.74 2.13a4.25 4.25 0 01-3.64 0l-4.74-2.13a.75.75 0 01-.36-1.02zm0 2.99a.75.75 0 011.02-.36l4.74 2.13c.68.3 1.46.3 2.14 0l4.74-2.13a.75.75 0 11.66 1.35l-4.74 2.13a4.25 4.25 0 01-3.64 0l-4.74-2.13a.75.75 0 01-.36-1.02z"/>
          </svg>
        </div>

        {/* User info */}
        {user && (
          <div className="mb-6 text-center">
            <p className="text-white text-sm font-medium">{user.username}</p>
            <p className="text-white/80 text-xs capitalize">{user.role}</p>
          </div>
        )}

        {/* Middle: dynamic links based on role */}
        <div className="flex-1 flex flex-col justify-center items-center w-full gap-3">
          {availableRoutes.map((route) => {
            const config = routeConfig[route.path] || { label: route.name };
            const isActive = isActiveRoute(route.path);
            const isHighlight = config.highlight;

            return (
              <Link
                key={route.path}
                to={`${routePrefix}${route.path}`}
                className={`w-[90%] text-center transition rounded-3xl px-6 py-3 text-lg font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 flex items-center justify-center gap-2 ${
                  isHighlight
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:scale-105 transform focus:ring-yellow-300'
                    : isActive
                    ? 'bg-white text-orange-600 focus:ring-white/50'
                    : 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/50'
                }`}
              >
                {config.icon}
                <span>{config.label || route.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom: logout */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="w-[90%] text-center mt-4 mb-2 text-orange-700 bg-white rounded-full px-6 py-3 text-xl font-semibold hover:bg-white/95 hover:text-orange-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
