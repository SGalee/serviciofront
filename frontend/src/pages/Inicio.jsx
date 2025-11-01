import '../index.css';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/roles';

export default function Inicio() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      const routePrefix = user.role === ROLES.ADMIN ? '/admin' : 
                         user.role === ROLES.DOCENTE ? '/docente' : 
                         '/estudiante';
      navigate(`${routePrefix}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (error[id]) {
      setError((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const errores = {};
    if (!form.username) {
      errores.username = 'El nombre de usuario es obligatorio';
    }
    if (!form.password) {
      errores.password = 'La contraseña es obligatoria';
    }
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    setError({});

    try {
      const result = await login(form.username, form.password);
      
      if (result.success) {
        // La redirección se manejará en el useEffect
        const routePrefix = result.user.role === ROLES.ADMIN ? '/admin' : 
                           result.user.role === ROLES.DOCENTE ? '/docente' : 
                           '/estudiante';
        navigate(`${routePrefix}/dashboard`);
      } else {
        setError({ general: result.error || 'Error al iniciar sesión. Verifica tus credenciales.' });
      }
    } catch (err) {
      setError({ general: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: contenido (mitad izquierda) */}
      <div className="w-1/2 flex items-center justify-center p-6 bg-orange-500">
        <div className="w-full max-w-lg bg-blue-700 rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Inicio de sesión</h1>

          <form onSubmit={handleSubmit}>
            {error.general && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-sm text-white text-center">{error.general}</p>
              </div>
            )}

            <Input 
              label="Usuario" 
              id="username" 
              type="text" 
              placeholder="Tu nombre de usuario" 
              value={form.username} 
              onChange={handleChange} 
              error={!!error.username}
              disabled={loading}
            />
            {error.username && <p className="text-sm text-amber-200 mt-1">{error.username}</p>}
            
            <div className="h-4" />
            
            <Input 
              label="Contraseña" 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={form.password} 
              onChange={handleChange} 
              error={!!error.password}
              disabled={loading}
            />
            {error.password && <p className="text-sm text-amber-200 mt-1">{error.password}</p>}

            <div className="mt-6 flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-semibold text-lg"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>

              <div className="mt-4 text-center">
                <Link to="/recuperacion" className="text-sm text-white hover:underline hover:text-amber-200 block mb-2">
                  ¿Olvidaste tu contraseña?
                </Link>
                <p className="text-sm text-white mt-3">¿No tienes cuenta?</p>
                <Link to="/registro" className="text-sm text-white hover:underline hover:text-amber-200 font-semibold">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </form>
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
