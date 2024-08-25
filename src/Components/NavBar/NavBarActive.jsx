import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

export const NavBarActive = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <header className='header'>
      <a href='/' className='logo'>EcoTurismo</a>
      <nav className='navbar'>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/api/reserva" className="navbar-link">Reservar</Link>
        <Link to="/api/about" className="navbar-link">Acerca De Nosotros</Link>
        <Link to="/api/clima" className="navbar-link">Clima</Link>
        <a
          onClick={handleLogout}
          className="navbar-link text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1.5 py-1.5 me-2 ml-3 focus:outline-none"
        >
          Cerrar Sesión
        </a>
      </nav>
    </header>
  );
};
