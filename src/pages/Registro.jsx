import '../index.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

export default function Registro() {
  return (
    <div className="min-h-screen flex">
      {/* Left: formulario de registro */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>

          <Input label="Correo institucional" id="reg-email" type="email" placeholder="correo@usm.edu.ve" />
          <div className="h-4" />
          <Input label="Contraseña" id="reg-password" type="password" placeholder="••••••••" />
          <div className="h-4" />
          <Input label="Confirmar contraseña" id="reg-password2" type="password" placeholder="••••••••" />

          <div className="mt-6 flex flex-col items-center">
            <button className="w-40 bg-yellow-400 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-500 transition">
              Registrar
            </button>

            <div className="mt-3">
              <h1 className="text-sm items-center text-amber-600">¿Ya estas registrado?</h1>
              <Link to="/" className="text-sm text-amber-600 hover:underline text-center flex flex-col hover:text-amber-900">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right: fondo amarillo contrastante */}
      <div className="w-1/2 bg-yellow-300 flex items-center justify-center">
        {/* espacio visual */}
      </div>
    </div>
  );
}
