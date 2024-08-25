import { useEffect, useState } from 'react';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import './clima.css';

export const ClimaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId);

    if (userId) {
      fetch(`http://127.0.0.1:5500/index.php?action=obtenerCiudad&user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setCiudades(data);
          } else {
            setError('No hay ciudades disponibles o debes iniciar sesión para acceder a esta información.');
          }
        })
        .catch(error => {
          console.error('Error al obtener ciudades:', error);
          setError('Error al obtener ciudades.');
        });
    }
  }, []);

  const handleObtenerClima = () => {
    const userId = sessionStorage.getItem('user_id');
    if (userId && ciudadSeleccionada) {
      fetch(`http://127.0.0.1:5500/index.php?action=climaCiudad&user_id=${userId}&ciudad=${ciudadSeleccionada}`)
        .then(response => response.json())
        .then(data => setClima(data))
        .catch(error => {
          console.error('Error al obtener el clima:', error);
          setError('Error al obtener el clima.');
        });
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <div className="clima-content">
        <div className="clima-header">
          <h1>Información Climática</h1>
          {ciudades.length > 0 ? (
            <>
              <select onChange={e => setCiudadSeleccionada(e.target.value)} value={ciudadSeleccionada}>
                <option value="">Seleccione una ciudad</option>
                {ciudades.map((ciudad, index) => (
                  <option key={index} value={ciudad}>{ciudad}</option>
                ))}
              </select>
              <button onClick={handleObtenerClima}>Obtener Clima</button>
              {clima && (
                <table className="clima-info">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Temperatura</th>
                      <th>Humedad</th>
                      <th>Viento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{clima.fecha}</td>
                      <td>{clima.temperatura}°C</td>
                      <td>{clima.humedad}%</td>
                      <td>{clima.viento} km/h</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
  
};
