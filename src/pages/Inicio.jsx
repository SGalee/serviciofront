import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import BIniciar from '../components/BIniciar.jsx';
import ColumnaColors from '../components/ColumnaColors.jsx'

export default function Inicio() {
  return (
    <div className="min-h-screen flex">
      {/* Left: contenido (mitad izquierda) */}
      <div className="w-1/2 flex items-center justify-center p-6 bg-orange-500">
        <div className="w-full max-w-lg bg-blue-700 rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Inicio de sesión</h1>

          <Input label="Correo institucional" id="email" type="email" placeholder="correo@usm.edu.ve" />
          <div className="h-4" />
          <Input label="Contraseña" id="password" type="password" placeholder="••••••••" />

          <div className="mt-6 flex flex-col items-center">
            <Link to="/dashboard" className="w-40 block">
              <BIniciar />
            </Link>

            <div className="mt-3">
              <Link to="/recuperacion" className="text-sm text-white hover:underline hover:text-amber-800">
                Olvidaste tu contraseña
              </Link>
              <h1 className="text-sm items-center text-white flex flex-col">¿No tienes cuenta?</h1>
              <Link to="/registro" className="text-sm text-white hover:underline text-center flex-col flex hover:text-amber-900">
                Regístrate
              </Link>
            </div>
          </div>
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
