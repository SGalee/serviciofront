import React, { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
 
export default function CrearTesis() {
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

  function handleChange(e) {
    const { name, value } = e.target;
    setTesis(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    setTesis(prev => ({ ...prev, archivo: file || null }));
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    // Guardar en localStorage (puedes reemplazar por llamada API)
    const stored = JSON.parse(localStorage.getItem('tesis') || '[]');
    // No se puede guardar File en localStorage; guardar metadatos del archivo
    const archivoMeta = tesis.archivo
      ? { name: tesis.archivo.name, type: tesis.archivo.type, size: tesis.archivo.size }
      : null;
    const saveObj = {
      titulo: tesis.titulo,
      resumen: tesis.resumen,
      tutor: tesis.tutor,
      anio: tesis.año,
      autor1: tesis.autor1,
      autor2: tesis.autor2,
      tipo: tesis.tipo,
      archivo: archivoMeta,
      id: Date.now(),
    };
    stored.push(saveObj);
    localStorage.setItem('tesis', JSON.stringify(stored));
    // limpiar formulario
    setTesis({ titulo: '', resumen: '', tutor: '', año: '', autor1: '', autor2: '', tipo: 'pregrado', archivo: null });
    alert('Tesis guardada localmente');
  }
 
  return (
    <div className="min-h-screen min-w-screen flex">

      <div className="sm:w-1/4 lg:w-1/4 bg-orange-500 flex flex-col items-center hover:text-4xl">
    
              <h1 className="text-6xl font-semibold flex flex-col my-15 ">[LOGO]</h1>
    
              <h1 className="text-3xl px-23 py-4 rounded-3xl hover:bg-yellow-100 hover:text-4xl transition  font-semibold my-6 focus:ring">Cuenta</h1>
              <h1 className="text-3xl px-23 py-4 rounded-3xl hover:bg-yellow-100 hover:text-4xl transition font-semibold my-6 ">Buscar</h1>
              <Link to="/crearusuario" className="text-3xl px-19 py-4 rounded-3xl hover:text-4xl hover:bg-yellow-100 font-semibold my-6 ">Usuarios</Link>
              <Link to="/creartesis" className="text-4xl px-15 py-4 rounded-3xl bg-yellow-400 transition font-semibold my-6">Crear Tesis</Link>
              <h1 className="text-3xl px-19 py-4 rounded-3xl hover:bg-yellow-200 hover:text-4xl transition font-semibold my-6">Historial</h1>
              <Link to="/" className="text-3xl font-semibold flex flex-col bottom-10 left-27 my-10 hover:text-amber-900 underline">Cerrar sesión</Link> 
            </div>
    
      <div className="w-full bg-blue-500 p-8">
        <h1 className="text-4xl font-semibold mb-6 text-white">Crear Tesis</h1>

        <form onSubmit={handleSubmit} className="bg-blue-400 p-6 rounded-lg w-full">
          <label className="block text-white mb-2">Título</label>
          <input name="titulo" value={tesis.titulo} onChange={handleChange} className="w-full mb-4 p-2 rounded" placeholder="Título de la tesis" />

          <label className="block text-white mb-2">Resumen</label>
          <textarea name="resumen" value={tesis.resumen} onChange={handleChange} className="w-full mb-4 p-2 rounded h-32" placeholder="Resumen breve"></textarea>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Tutor</label>
              <input name="tutor" value={tesis.tutor} onChange={handleChange} className="w-full p-2 rounded" placeholder="Nombre del tutor" />
            </div>
            <div>
              <label className="block text-white mb-2">Año</label>
              <input name="año" value={tesis.año} onChange={handleChange} type="number" className="w-full p-2 rounded" placeholder="Año de publicación" />
            </div>
          </div>

          {/* Dos inputs separados para primer y segundo autor */}
          <label className="block text-white mt-4 mb-2">Primer autor</label>
          <input name="autor1" value={tesis.autor1} onChange={handleChange} className="w-full mb-3 p-2 rounded" placeholder="Nombre del primer autor" />
          <label className="block text-white mt-2 mb-2">Segundo autor</label>
          <input name="autor2" value={tesis.autor2} onChange={handleChange} className="w-full mb-4 p-2 rounded" placeholder="Nombre del segundo autor (opcional)" />

          <label className="block text-white mb-2">Tipo</label>
          <select name="tipo" value={tesis.tipo} onChange={handleChange} className="w-full mb-4 p-2 rounded">
            <option value="pregrado">Pregrado</option>
            <option value="postgrado">Postgrado</option>
            <option value="doctorado">Doctorado</option>
            <option value="maestria">Maestría</option>
          </select>

          {/* Input para importar archivo (PDF/DOCX) */}
          <label className="block text-white mb-2">Archivo (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="w-full mb-2"
          />
          {tesis.archivo && <p className="text-sm text-white mb-4">Archivo seleccionado: {tesis.archivo.name}</p>}
 
          <div className="flex justify-end">
            <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">Guardar</button>
          </div>
        </form>
      </div>

    </div>
  );
}
