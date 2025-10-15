import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar-links">
        <div>
            <Link to= "/"> Inicie sesión </Link>
            <Link to= "/registro"> Registrese </Link>
            <Link to= "/dashboard"> Dashboard </Link>
        </div>
    </nav>
  )
}

export default NavBar
