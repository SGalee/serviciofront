import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-6">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/">
          <button className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
