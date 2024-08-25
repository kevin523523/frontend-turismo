import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header className='header'>
      <a href='/' className='logo'>EcoTurismo</a>
      <nav className='navbar'>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/api/reserva" className="navbar-link">Reservar</Link>
        <Link to="/api/about" className="navbar-link">Acerca De Nosotros</Link>
        <Link to="/api/clima" className="navbar-link">Clima</Link>
        <Link to="/api/sign" className="navbar-link">Iniciar Sesión</Link>
        <Link to="/api/login" className="navbar-link text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-3 focus:outline-none">
        Registrarse
        </Link>
      </nav>
    </header>
  )
}


