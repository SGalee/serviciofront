import { Link } from 'react-router-dom';
import '../index.css';

export default function BIniciar() {
  return (
    <Link
      to="/dashboard"
      className="block w-full bg-yellow-400 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-500 transition text-center"
    >
      Iniciar
    </Link>
  );
}

