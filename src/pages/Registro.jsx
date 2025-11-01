import React, { useState } from 'react';
import '../index.css';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    nombre: '', 
    apellido: '', 
    correo: '', 
    username: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    // Limpiar error del campo al escribir
    if (error[id]) {
      setError((prev) => ({ ...prev, [id]: '' }));
    }
    setGeneralError('');
  };

  const validate = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = 'El nombre es obligatorio';
    if (!form.apellido.trim()) errores.apellido = 'El apellido es obligatorio';
    if (!form.username.trim()) {
      errores.username = 'El nombre de usuario es obligatorio';
    } else if (form.username.length < 3) {
      errores.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    if (!form.correo.trim()) {
      errores.correo = 'El correo institucional es obligatorio';
    } else if (!/@usm\.edu\.ve$/i.test(form.correo.trim())) {
      errores.correo = 'Debe ser un correo @usm.edu.ve';
    }
    if (!form.password) {
      errores.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      errores.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!form.confirmPassword) {
      errores.confirmPassword = 'Confirma la contraseña';
    } else if (form.password !== form.confirmPassword) {
      errores.confirmPassword = 'Las contraseñas no coinciden';
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
    setGeneralError('');

    try {
      // Preparar payload para el backend
      const payload = {
        username: form.username.trim(),
        password: form.password,
        email: form.correo.trim(),
        first_name: form.nombre.trim(),
        last_name: form.apellido.trim(),
      };

      await registerUser(payload);

      // Registro exitoso - redirigir a login
      alert('¡Registro exitoso! Ya puedes iniciar sesión.');
      navigate('/');
      
    } catch (err) {
      console.error('Error al registrar:', err);
      
      // Manejar errores específicos del backend
      if (err.status === 400) {
        setGeneralError('Datos inválidos. Verifica que el correo o nombre de usuario no estén en uso.');
      } else if (err.status === 409) {
        setGeneralError('El correo o nombre de usuario ya están registrados.');
      } else {
        setGeneralError('Error al registrar. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: formulario de registro */}
      <div className="w-1/2 flex items-center justify-center bg-orange-500 p-6">
        <div className="w-full max-w-lg bg-blue-700 text-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>

          <form onSubmit={handleSubmit}>
            <Input 
              label="Nombre" 
              id="nombre" 
              value={form.nombre} 
              onChange={handleChange} 
              error={!!error.nombre} 
            />
            {error.nombre && <p className="text-sm text-amber-200 mt-1">{error.nombre}</p>}
            <div className="h-4" />

            <Input 
              label="Apellido" 
              id="apellido" 
              value={form.apellido} 
              onChange={handleChange} 
              error={!!error.apellido} 
            />
            {error.apellido && <p className="text-sm text-amber-200 mt-1">{error.apellido}</p>}
            <div className="h-4" />

            <Input 
              label="Nombre de usuario" 
              id="username" 
              placeholder="usuario123" 
              value={form.username} 
              onChange={handleChange} 
              error={!!error.username} 
            />
            {error.username && <p className="text-sm text-amber-200 mt-1">{error.username}</p>}
            <div className="h-4" />

            <Input 
              label="Correo institucional" 
              id="correo" 
              type="email" 
              placeholder="correo@usm.edu.ve" 
              value={form.correo} 
              onChange={handleChange} 
              error={!!error.correo} 
            />
            {error.correo && <p className="text-sm text-amber-200 mt-1">{error.correo}</p>}
            <div className="h-4" />

            <Input 
              label="Contraseña" 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={form.password} 
              onChange={handleChange} 
              error={!!error.password} 
            />
            {error.password && <p className="text-sm text-amber-200 mt-1">{error.password}</p>}
            <div className="h-4" />

            <Input 
              label="Confirmar contraseña" 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              error={!!error.confirmPassword} 
            />
            {error.confirmPassword && <p className="text-sm text-amber-200 mt-1">{error.confirmPassword}</p>}

            {generalError && (
              <div className="mt-4 p-3 bg-red-600 text-white rounded-lg text-sm text-center">
                {generalError}
              </div>
            )}

            <div className="mt-6 flex flex-col items-center w-full">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-amber-200">¿Ya estás registrado?</p>
                <Link 
                  to="/" 
                  className="text-sm text-amber-400 hover:underline hover:text-amber-300 font-semibold"
                >
                  Inicia sesión aquí
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
