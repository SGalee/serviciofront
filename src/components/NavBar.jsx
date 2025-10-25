import { Link } from 'react-router-dom'

function NavBar() {
  // Keep the vertical orientation but improve button visuals and accessibility
  return (
    <nav className="bg-orange-500 w-full md:w-1/3 lg:w-1/3 max-w-[420px] min-w-[220px]">
      <div className="px-6 py-8 flex flex-col items-center min-h-screen">
        {/* Top: logo */}
        <div className="text-6xl font-semibold text-white">[LOGO]</div>

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
            to="/crearusuario"
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
