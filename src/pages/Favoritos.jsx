import React, { useState, useEffect } from 'react';
import '../index.css';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

export default function Favoritos() {
  const { token } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavoritos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listFavoritos(token);
        setFavoritos(data);
      } catch (err) {
        console.error('Error cargando favoritos:', err);
        setError('Error al cargar favoritos');
      } finally {
        setLoading(false);
      }
    };
    
    loadFavoritos();
  }, [token]);

  const handleRemove = async (id) => {
    if (!window.confirm('¿Quitar esta tesis de favoritos?')) return;
    
    try {
      await api.removeFavorito(id, token);
      setFavoritos(favoritos.filter(f => f.id !== id));
    } catch (err) {
      console.error('Error:', err);
      alert('Error al eliminar favorito');
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-blue-500 p-8 flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Cargando favoritos...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-blue-500 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-white">Mis Favoritos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-4">
          {error}
        </div>
      )}

      {favoritos.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl text-center">
          <p className="text-gray-500 text-xl mb-4">⭐ No tienes favoritos aún</p>
          <p className="text-gray-400">Explora las tesis y agrega tus favoritas aquí</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {favoritos.map((fav) => (
            <div key={fav.id} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {fav.tesis_detalle?.titulo || 'Título no disponible'}
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Autor:</strong> {fav.tesis_detalle?.autor}</p>
                    <p><strong>Tutor:</strong> {fav.tesis_detalle?.tutor}</p>
                    <p><strong>Año:</strong> {fav.tesis_detalle?.fecha_publicacion}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Agregado:</strong> {new Date(fav.fecha_agregado).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-3">{fav.tesis_detalle?.resumen}</p>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  {fav.tesis_detalle?.archivo_pdf && (
                    <a 
                      href={fav.tesis_detalle.archivo_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-center whitespace-nowrap hover:bg-blue-700 transition"
                    >
                      📄 Ver PDF
                    </a>
                  )}
                  <button 
                    onClick={() => handleRemove(fav.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-2xl whitespace-nowrap hover:bg-red-700 transition"
                  >
                    🗑️ Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
