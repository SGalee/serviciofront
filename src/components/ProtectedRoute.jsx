import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente para proteger rutas basándose en autenticación y roles
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si está autorizado
 * @param {string|string[]} props.allowedRoles - Rol(es) permitido(s) para acceder a la ruta
 * @param {string} props.redirectTo - Ruta a la que redirigir si no está autorizado (default: '/')
 */
const ProtectedRoute = ({ children, allowedRoles = null, redirectTo = '/' }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al inicio
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si se especificaron roles permitidos, verificar si el usuario tiene uno de ellos
  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const hasRequiredRole = user && roles.includes(user.role);

    if (!hasRequiredRole) {
      // Redirigir al dashboard si no tiene el rol requerido
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Usuario autenticado y con el rol correcto, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
