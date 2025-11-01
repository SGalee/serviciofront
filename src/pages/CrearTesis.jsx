import React, { useState } from 'react';
import '../index.css';
 
export default function CrearTesis() {
  const [loading, setLoading] = useState(false);
  const [tesis, setTesis] = useState({
    titulo: '',
    resumen: '',
    tutor: '',
    año: '',
    autor1: '',
    autor2: '',
    tipo: 'pregrado',
    archivo: null, // almacena el File seleccionado
  });
  const [error, setError] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setTesis(prev => ({ ...prev, [name]: value }));
  }

  const validate = () => {
    let errores = {};
    if(!tesis.titulo)
    {errores.titulo = "El título es obligatorio"};
    if(!tesis.resumen)
    {errores.resumen = "El resumen es obligatorio"};
    if(!tesis.tutor)
    {errores.tutor = "El tutor es obligatorio"};
    if(!tesis.año)
    {errores.año = "El año es obligatorio"};
    if(!tesis.autor1)
    {errores.autor1 = "El primer autor es obligatorio"};
    if(!tesis.archivo)
    {errores.archivo = "Debe subirse un archivo"};
    setError(errores);
    return Object.keys(errores).length ===0;
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    setTesis(prev => ({ ...prev, archivo: file || null }));
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    
    if(!validate()){
      console.log("Errores de validación:", error);
      return;
    }

    setLoading(true);
    setError({});

    try {
      // Obtener el token del usuario
      const token = localStorage.getItem('access_token');
      
      // Preparar FormData para enviar archivo
      const formData = new FormData();
      formData.append('titulo', tesis.titulo);
      formData.append('autor', `${tesis.autor1}${tesis.autor2 ? ' y ' + tesis.autor2 : ''}`);
      formData.append('resumen', tesis.resumen);
      formData.append('tutor', tesis.tutor);
      formData.append('fecha_publicacion', tesis.año);
      formData.append('tipo', tesis.tipo);
      formData.append('archivo_pdf', tesis.archivo); // Backend espera 'archivo_pdf'
      
      // Llamar a la API directamente con fetch
      const response = await fetch('http://localhost:8000/api/tesis/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      
      console.log('Tesis creada:', data);
      alert('✅ Tesis guardada correctamente');
      
      // Limpiar el formulario
      setTesis({
        titulo: '',
        resumen: '', 
        tutor: '', 
        año: '', 
        autor1: '', 
        autor2: '',
        tipo: 'pregrado', 
        archivo: null,
      });
      
    } catch (err) {
      console.error('Error al crear tesis:', err);
      alert('❌ Error al guardar la tesis. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div className="w-full bg-blue-500 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-white">Crear Tesis</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl w-full">
          <div>
          <label className="block text-lg text-black mb-3 font-semibold">Título</label>
          <input
            name="titulo"
            value={tesis.titulo}
            onChange={handleChange}
            className={`w-full mb-4 p-2 rounded-2xl border transition-shadow ${
              error.titulo
                ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                : 'border-amber-200 shadow'
            }`}
            placeholder="Título de la tesis"
          />
          {error.titulo && <p className="text-sm text-red-600 mb-4">{error.titulo}</p>}
          </div>

          <div>
          <label className="block text-lg text-black mb-3 font-semibold">Resumen</label>
          <textarea
            name="resumen"
            value={tesis.resumen}
            onChange={handleChange}
            className={`w-full mb-4 p-2 rounded-2xl h-32 border transition-shadow ${
              error.resumen
                ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                : 'border-amber-200 shadow'
            }`}
            placeholder="Resumen breve"
          ></textarea>
          {error.resumen && <p className="text-sm text-red-600 mb-4">{error.resumen}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Tutor</label>
              <input
                name="tutor"
                value={tesis.tutor}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.tutor
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
                placeholder="Nombre y apellido del tutor"
              />
              {error.tutor && <p className="text-sm text-red-600 mb-4">{error.tutor}</p>}
            </div>

            <div>
              <label className="block text-black mb-3 font-semibold">Año</label>
              <select
                name="año"
                value={tesis.año}
                onChange={handleChange}
                className={`w-full p-2 rounded-2xl border transition-shadow ${
                  error.año
                    ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                    : 'border-amber-200 shadow'
                }`}
              >
                <option value="">Selecciona un año</option>
                {Array.from({ length: 2050 - 1970 + 1 }, (_, i) => 1970 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {error.año && <p className="text-sm text-red-600 mb-4">{error.año}</p>}
            </div>
          </div>

          {/* Dos inputs separados para primer y segundo autor */}
          <div>
          <label className="block text-black mt-4 mb-3 font-semibold">Primer autor</label>
          <input
            name="autor1"
            value={tesis.autor1}
            onChange={handleChange}
            className={`w-full mb-3 p-2 rounded-2xl border transition-shadow ${
              error.autor1
                ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)] focus:shadow-[0_0_0_6px_rgba(239,68,68,0.18)]'
                : 'border-amber-200 shadow'
            }`}
            placeholder="Nombre y apellido (Obligatorio)"
          />
          {error.autor1 && <p className="text-sm text-red-600 mb-4">{error.autor1}</p>}
          </div>

          <label className="block text-black mt-2 mb-3 font-semibold">Segundo autor</label>
          <input
            name="autor2"
            value={tesis.autor2}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-2xl border border-amber-200 shadow"
            placeholder="Nombre y apellido (opcional)"
          />

          <label className="block text-black mb-3 font-semibold">Tipo</label>
          <select name="tipo" value={tesis.tipo} onChange={handleChange} className="w-full mb-4 p-2 rounded-2xl border border-amber-200 shadow">
            <option value="pregrado">Pregrado</option>
            <option value="postgrado">Postgrado</option>
            <option value="doctorado">Doctorado</option>
            <option value="maestria">Maestría</option>
          </select>

          {/* Input para importar archivo (PDF/DOCX) mejorado */}
          <div>
            <label className="block text-black mb-3 font-semibold">Digitalización</label>
            <input
              id="archivo"
              type="file"
              accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="archivo"
              className={`inline-flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-2xl shadow hover:bg-gray-50 cursor-pointer border ${
                error.archivo ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]' : 'border-amber-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3a4 4 0 00-4 4v5a2 2 0 104 0V8a1 1 0 112 0v4a4 4 0 11-8 0V7a6 6 0 1112 0v5a6 6 0 11-12 0V8a1 1 0 112 0v4a4 4 0 108 0V7a8 8 0 10-16 0v5a8 8 0 0016 0V8a3 3 0 10-6 0v4a1 1 0 11-2 0V7a2 2 0 114 0v5a5 5 0 11-10 0V7a7 7 0 1114 0v5a7 7 0 11-14 0V8a3 3 0 116 0v4a3 3 0 106 0V7a5 5 0 10-10 0v5a5 5 0 1010 0V8a2 2 0 10-4 0v4a2 2 0 11-4 0V7a3 3 0 016 0v5a6 6 0 11-12 0V8a4 4 0 118 0v4a4 4 0 11-8 0V7a5 5 0 1110 0v5a7 7 0 11-14 0V8a6 6 0 1112 0v4a6 6 0 11-12 0V7a7 7 0 1114 0v5a8 8 0 11-16 0" /></svg>
              Subir archivo (PDF/DOCX)
            </label>
            {tesis.archivo && <p className="text-sm text-black mt-2">Archivo seleccionado: {tesis.archivo.name}</p>}
            {error.archivo && <p className="text-sm text-red-600 mt-2">{error.archivo}</p>}
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-2xl shadow hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
  );
}
