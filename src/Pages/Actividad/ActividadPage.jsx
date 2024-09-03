import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import './actividad.css';

export const ActividadPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [foto, setFoto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setIsLoggedIn(true);
    } else {
      navigate('/api/login');
    }
  }, [navigate]);

  const handleActividadChange = (e) => {
    setActividadSeleccionada(e.target.value);
  };

  const handleBuscarCiudades = () => {
    const userId = sessionStorage.getItem('user_id');
    if (userId && actividadSeleccionada) {
      fetch(`http://127.0.0.1:5500/index.php?action=ciudadesPorActividad&user_id=${userId}&actividad=${actividadSeleccionada}`)
        .then(response => response.json())
        .then(ciudades => {
          setCiudades(ciudades);
          if (ciudades.length > 0) {
            fetch(`http://127.0.0.1:5500/index.php?action=fotoCiudad&user_id=${userId}&ciudad=${ciudades[0]}`)
              .then(response => response.json())
              .then(foto => setFoto(foto))
              .catch(error => {
                console.error('Error al obtener la foto:', error);
                setError('Error al obtener la foto.');
              });
          }
        })
        .catch(error => {
          console.error('Error al buscar ciudades:', error);
          setError('Error al buscar ciudades.');
        });
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <div className="actividad-content">
        <h1>¿Qué buscas en tu próxima aventura?</h1>
        <form>
          <div>
            <input type="radio" id="tour-barco" name="actividad" value="tour en barco" onChange={handleActividadChange} />
            <label htmlFor="tour-barco">Tour en barco</label>
          </div>
          <div>
            <input type="radio" id="tour-cultural" name="actividad" value="tour cultural" onChange={handleActividadChange} />
            <label htmlFor="tour-cultural">Tour cultural</label>
          </div>
          <div>
            <input type="radio" id="camello" name="actividad" value="excursion en camello" onChange={handleActividadChange} />
            <label htmlFor="camello">Excursion en camello</label>
          </div>
          <div>
            <input type="radio" id="snorkel" name="actividad" value="snorkel en arrecife" onChange={handleActividadChange} />
            <label htmlFor="snorkel">Snorkel en arrecife</label>
          </div>
          <div>
            <input type="radio" id="auroras" name="actividad" value="avistamiento de auroras" onChange={handleActividadChange} />
            <label htmlFor="auroras">Avistamiento de auroras</label>
          </div>
          <div>
            <input type="radio" id="tren" name="actividad" value="tour en tren" onChange={handleActividadChange} />
            <label htmlFor="tren">Tour en tren</label>
          </div>
          <div>
            <input type="radio" id="templos" name="actividad" value="visita a templos" onChange={handleActividadChange} />
            <label htmlFor="templos">Visita a templos</label>
          </div>
        </form>
        <button onClick={handleBuscarCiudades}>Buscar Ciudades</button>
        
        {ciudades.length > 0 && (
          <div className="ciudad-resultado">
            <h2 id="titleCity" className='m-4'>Ciudades con la actividad seleccionada:</h2>
            <ul>
              {ciudades.map((ciudad, index) => (
                <li id="ciudad" key={index}>{ciudad}</li>
              ))}
            </ul>
            {foto && (
              <div id="fotoCiudad">
                <img src={foto} alt={ciudades[0]} style={{ width: '500px', height: '400px' }} />
              </div>
            )}
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};
