import React, { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
 
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
    <NavBar />
      
    
      <div className="w-full bg-blue-500 p-8">
        <h1 className="text-4xl font-semibold mb-6 text-white">Crear Tesis</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-2xl w-full">
          <label className="block text-lg text-black mb-3 font-semibold">Título</label>
          <input name="titulo" value={tesis.titulo} onChange={handleChange} className="w-full mb-4 p-2 rounded-2xl shadow" placeholder="Título de la tesis" />

          <label className="block text-lg text-black mb-3 font-semibold">Resumen</label>
          <textarea name="resumen" value={tesis.resumen} onChange={handleChange} className="w-full mb-4 p-2 rounded-2xl shadow h-32" placeholder="Resumen breve"></textarea>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-black mb-3 font-semibold">Tutor</label>
              <input name="tutor" value={tesis.tutor} onChange={handleChange} className="w-full p-2 rounded-2xl shadow" placeholder="Nombre y apellido del tutor" />
            </div>
            <div>
              <label className="block text-black mb-3 font-semibold">Año</label>
              <input name="año" value={tesis.año} onChange={handleChange} type="number" className="w-full p-2 rounded-2xl shadow" placeholder="Año de publicación" />
            </div>
          </div>

          {/* Dos inputs separados para primer y segundo autor */}
          <label className="block text-black mt-4 mb-3 font-semibold">Primer autor</label>
          <input name="autor1" value={tesis.autor1} onChange={handleChange} className="w-full mb-3 p-2 rounded-2xl shadow" placeholder="Nombre y apellido (Obligatorio)" />
          <label className="block text-black mt-2 mb-3 font-semibold">Segundo autor</label>
          <input name="autor2" value={tesis.autor2} onChange={handleChange} className="w-full mb-4 p-2 rounded-2xl shadow" placeholder="Nombre y apellido (opcional)" />

          <label className="block text-black mb-3 font-semibold">Tipo</label>
          <select name="tipo" value={tesis.tipo} onChange={handleChange} className="w-full mb-4 p-2 rounded-2xl shadow">
            <option value="pregrado">Pregrado</option>
            <option value="postgrado">Postgrado</option>
            <option value="doctorado">Doctorado</option>
            <option value="maestria">Maestría</option>
          </select>

          {/* Input para importar archivo (PDF/DOCX) */}
          <label className="block text-black mb-3 font-semibold">Digitalización</label>
          <input
            type="file"
            accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="w-full mb-2"
          />
          {tesis.archivo && <p className="text-sm text-white mb-4">Archivo seleccionado: {tesis.archivo.name}</p>}
 
          <div className="flex justify-items-center">
            <button type="submit" className="bg-amber-600 flex flex-col text-white px-4 py-2 rounded hover:bg-amber-700">Guardar</button>
          </div>
        </form>
      </div>

    </div>
  );
}
