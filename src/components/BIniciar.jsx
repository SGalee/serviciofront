import { Link } from 'react-router-dom';
import '../index.css';

export default function BIniciar({ to = "/dashboard", onClick, className = "" }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block w-full bg-blue-800 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-500 hover:text-black transition text-center ${className}`}
    >
      Iniciar
    </Link>
  );
}

