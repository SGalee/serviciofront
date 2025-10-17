import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import BIniciar from '../components/BIniciar.jsx';

export default function Inicio() {
  return (
    <div className="min-h-screen flex">
      {/* Left: contenido (mitad izquierda) */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Inicio de sesión</h1>

          <Input label="Correo institucional" id="email" type="email" placeholder="correo@usm.edu.ve" />
          <div className="h-4" />
          <Input label="Contraseña" id="password" type="password" placeholder="••••••••" />

          <div className="mt-6 flex flex-col items-center">
            <Link to="/dashboard" className="w-40 block">
              <BIniciar />
            </Link>

            <div className="mt-3">
              <Link to="/recuperacion" className="text-sm text-yellow-600 hover:underline hover:text-amber-800">
                Olvidaste tu contraseña
              </Link>
              <h1 className="text-sm items-center text-amber-600 flex flex-col">¿No tienes cuenta?</h1>
              <Link to="/registro" className="text-sm text-amber-600 hover:underline text-center flex-col flex hover:text-amber-900">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right: fondo amarillo contrastante (mitad derecha) */}
      
      <div className=" w-20 h-20 bg-gradient-to-b from-blue-800 to-orange-500 flex flex-col"></div>
     
      <div className="flex flex-col w-20 h-20 bg-sky-600 "></div>
      
      <div className="flex-col w-20 h-20 bg-blue-900 flex "></div>
    
      
      <div className="w-1/2 bg-yellow-300 flex flex-col items-center justify-center">
        {/* puedes poner aquí una ilustración o texto si quieres */}
      </div>
    </div>
  );
}
