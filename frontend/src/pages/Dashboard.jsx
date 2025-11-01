import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

export default function Dashboard() {
  const { token } = useAuth();
  const [tesis, setTesis] = useState([]);
  const [filteredTesis, setFilteredTesis] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    anio: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTesis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.listTesis(token);
      setTesis(data);
      setFilteredTesis(data);
    } catch (err) {
      console.error('Error cargando tesis:', err);
      setError('Error al cargar las tesis');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const applyFilters = useCallback(() => {
    let result = [...tesis];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(t => 
        t.titulo?.toLowerCase().includes(search) ||
        t.autor?.toLowerCase().includes(search) ||
        t.tutor?.toLowerCase().includes(search)
      );
    }

    if (filters.anio) {
      result = result.filter(t => t.fecha_publicacion === parseInt(filters.anio));
    }

    setFilteredTesis(result);
  }, [tesis, filters]);

  useEffect(() => {
    loadTesis();
  }, [loadTesis]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const addToFavorites = async (tesisId) => {
    try {
      await api.addFavorito(tesisId, token);
      alert('✅ Agregado a favoritos');
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error al agregar a favoritos');
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-blue-500 p-8 flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Cargando tesis...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-blue-500 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-white">Buscar Tesis</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filtros */}
      <div className="bg-gray-100 p-6 rounded-2xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg text-black mb-2 font-semibold">Buscar</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Título, autor o tutor..."
              className="w-full p-3 rounded-2xl border border-amber-200 shadow"
            />
          </div>

          <div>
            <label className="block text-lg text-black mb-2 font-semibold">Año</label>
            <select
              name="anio"
              value={filters.anio}
              onChange={handleFilterChange}
              className="w-full p-3 rounded-2xl border border-amber-200 shadow"
            >
              <option value="">Todos</option>
              {[...new Set(tesis.map(t => t.fecha_publicacion))].sort().reverse().map(anio => (
                <option key={anio} value={anio}>{anio}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="text-white mb-4 text-lg">
        {filteredTesis.length} tesis encontradas
      </div>

      <div className="grid gap-4">
        {filteredTesis.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-gray-500">
            No se encontraron tesis con los filtros seleccionados
          </div>
        ) : (
          filteredTesis.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{t.titulo}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Autor:</strong> {t.autor}</p>
                    <p><strong>Tutor:</strong> {t.tutor}</p>
                    <p><strong>Año:</strong> {t.fecha_publicacion}</p>
                    {t.creado_por && (
                      <p className="text-sm"><strong>Subido por:</strong> {t.creado_por.first_name} {t.creado_por.last_name}</p>
                    )}
                  </div>
                  <p className="text-gray-700 mt-3">{t.resumen}</p>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  {t.archivo_pdf && (
                    <a 
                      href={t.archivo_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-center whitespace-nowrap hover:bg-blue-700 transition"
                    >
                      📄 Ver PDF
                    </a>
                  )}
                  <button 
                    onClick={() => addToFavorites(t.id)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-2xl whitespace-nowrap hover:bg-amber-700 transition"
                  >
                    ⭐ Favorito
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
