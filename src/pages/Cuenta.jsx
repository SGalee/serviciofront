import React, { useState, useEffect } from 'react';
import '../index.css';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

export default function Cuenta() {
  const { user, token, updateUserProfile } = useAuth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.getUserProfile(token);
        setForm({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: profile.email || '',
        });
      } catch (err) {
        console.error('Error cargando perfil:', err);
      }
    };
    
    loadProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const updated = await api.updateUserProfile(form, token);
      updateUserProfile(updated);
      setSuccess(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-blue-500 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-white">Mi Cuenta</h1>
      
      <div className="bg-gray-100 p-6 rounded-2xl max-w-2xl">
        <div className="mb-6 pb-6 border-b border-gray-300">
          <p className="text-gray-600 mb-2">
            <strong className="text-black">Usuario:</strong> {user?.username}
          </p>
          <p className="text-gray-600">
            <strong className="text-black">Rol:</strong> 
            <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-amber-200 text-amber-800 capitalize">
              {user?.role}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-2xl border border-green-300">
              ✅ Perfil actualizado correctamente
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-2xl border border-red-300">
              ❌ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-lg text-black mb-2 font-semibold">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-3 border border-amber-200 rounded-2xl shadow"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-black mb-2 font-semibold">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-3 border border-amber-200 rounded-2xl shadow"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg text-black mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-amber-200 rounded-2xl shadow"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
