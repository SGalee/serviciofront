import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, refreshToken as apiRefreshToken } from '../utils/api';
import { ROLES } from '../utils/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedRefresh = localStorage.getItem('refresh_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setRefreshTokenValue(storedRefresh);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Función de login
  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);
      const { access, refresh } = response;

      // Guardar tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setToken(access);
      setRefreshTokenValue(refresh);

      // Decodificar el token para obtener información del usuario
      const userPayload = decodeToken(access);
      
      // Aquí deberías hacer una llamada al backend para obtener el perfil completo
      // Por ahora usamos los datos del token
      const userData = {
        id: userPayload.user_id,
        username: username,
        role: userPayload.role || ROLES.ESTUDIANTE, // Por defecto estudiante
        ...userPayload,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setToken(null);
    setRefreshTokenValue(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Función para refrescar el token
  const refreshAccessToken = async () => {
    try {
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await apiRefreshToken(refreshTokenValue);
      const { access } = response;

      localStorage.setItem('access_token', access);
      setToken(access);

      return access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      throw error;
    }
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Decodificar JWT (básico, sin verificación)
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  const value = {
    user,
    token,
    refreshTokenValue,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken,
    hasRole,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
