// Footer.jsx
import './Footer.css'; // Asegúrate de importar el archivo CSS
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Ecoturismo</p>
        <p className="footer-description">
          Ofrecemos una plataforma fácil de usar para reservar eco-tours y disfrutar de experiencias naturales únicas.
        </p>
        <div className="footer-links">
          <Link to="/api/reserva" className="navbar-link">Reservar</Link>
          <Link to="/api/about" className="navbar-link">Acerca De Nosotros</Link>
          <Link to="/api/ayuda" className="navbar-link">Ayuda</Link>
        </div>
        <p className="footer-copy">&copy; 2024 Ecoturismo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
