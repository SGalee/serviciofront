
import '../index.css';
import { Link } from 'react-router-dom';

export default function CrearTesis() {
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
    
          <div className="w-full bg-blue-500">
            <h1 className="text-6xl font-semibold">Crear Tesis</h1>
    
          </div>
    
        </div>
  );
}
