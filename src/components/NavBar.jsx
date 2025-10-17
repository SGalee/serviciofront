import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar-links">
        <div>
            <Link to= "/" className= "m-2"> Inicie sesión </Link>
            <Link to= "/registro" className= "m-2"> Registrese </Link>
            <Link to= "/dashboard" className= "m-2"> Dashboard </Link>
            <Link to= "/recuperacion" className= "m-2"> Recuperación de Contraseña </Link>
        </div>
    </nav>
  )
}

export default NavBar
