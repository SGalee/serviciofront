import { Link } from 'react-router-dom'

function NavBar() {
  // Keep the vertical orientation but improve button visuals and accessibility
  return (
    <nav className="bg-orange-500 w-full md:w-1/3 lg:w-1/3 max-w-[420px] min-w-[220px] md:sticky md:top-0 md:h-screen self-start">
      <div className="px-6 py-8 flex flex-col items-center min-h-screen">
        {/* Top: logo (SVG) */}
        <div className="mb-2" aria-label="Logo Servicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="currentColor" role="img">
            <path d="M4 6.75A2.75 2.75 0 016.75 4h10.5A2.75 2.75 0 0120 6.75v10.5A2.75 2.75 0 0117.25 20H6.75A2.75 2.75 0 014 17.25V6.75z" opacity=".2"/>
            <path d="M12 6c-.39 0-.78.08-1.12.24l-6.02 2.7a.75.75 0 000 1.36l6.02 2.7c.34.16.73.24 1.12.24s.78-.08 1.12-.24l6.02-2.7a.75.75 0 000-1.36L13.12 6.24A2.75 2.75 0 0012 6zm-6.88 7.03a.75.75 0 011.02-.36l4.74 2.13c.68.3 1.46.3 2.14 0l4.74-2.13a.75.75 0 11.66 1.35l-4.74 2.13a4.25 4.25 0 01-3.64 0l-4.74-2.13a.75.75 0 01-.36-1.02zm0 2.99a.75.75 0 011.02-.36l4.74 2.13c.68.3 1.46.3 2.14 0l4.74-2.13a.75.75 0 11.66 1.35l-4.74 2.13a4.25 4.25 0 01-3.64 0l-4.74-2.13a.75.75 0 01-.36-1.02z"/>
          </svg>
        </div>

        {/* Middle: links - centered and distributed */}
        <div className="flex-1 flex flex-col justify-center items-center w-full gap-4">
          <Link
            to="/cuenta"
            className="w-[90%] text-center bg-white/10 text-white hover:bg-white/20 transition rounded-3xl px-6 py-3 text-2xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Cuenta
          </Link>

          <Link
            to="/dashboard"
            className="w-[90%] text-center bg-white/10 text-white hover:bg-white/20 transition rounded-3xl px-6 py-3 text-2xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Buscar
          </Link>

          <Link
            to="/usuario"
            className="w-[90%] text-center bg-white/10 text-white hover:bg-white/20 transition rounded-3xl px-6 py-3 text-2xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
              Usuarios
          </Link>

          <Link
            to="/creartesis"
            className="w-[90%] text-center bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition rounded-3xl px-6 py-4 text-2xl font-bold shadow-md hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Crear Tesis
          </Link>

          <Link
            to="/historial"
            className="w-[90%] text-center bg-white/10 text-white hover:bg-white/20 transition rounded-3xl px-6 py-3 text-2xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Historial
          </Link>
        </div>

        {/* Bottom: logout */}
        <div className="w-full flex justify-center">
          <Link
            to="/"
            className="w-[90%] text-center mt-4 mb-2 text-orange-700 bg-white rounded-full px-6 py-3 text-xl font-semibold hover:bg-white/95 hover:text-orange-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Cerrar sesión
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
