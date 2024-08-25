import { useEffect, useState } from 'react';
import { Footer } from "../../Components/Footer/Footer";
import { NavBar } from "../../Components/NavBar/NavBar";
import { NavBarActive } from "../../Components/NavBar/NavBarActive";
import './About.css'; // Importa el archivo CSS

export const AboutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId); // Se convierte en true si `userId` existe, false en caso contrario
  }, []);
  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <main className="content">
        <section className="about-section">
          <div className="about-content">
            <div className="about-image-container">
              <img 
                src="https://elcomercio.pe/resizer/a2fR7jx_5JCIvvJSrfEOMYo6lmU=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/Y7LCLMQIYREGBJAEELDFVMY4FE.jpg" 
                alt="EcoTurismo"
                className="about-image"
                style={{
                  width: '500px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
            <div className="about-text">
              <h1 style={{color:'darkgreen'}}>Sobre EcoTurismo</h1>
              <p>
                <strong>EcoTurismo</strong> es una innovadora plataforma de reservas web dedicada a ofrecer experiencias de turismo ecológico y sostenible.
              </p>
              <p>
                Nuestro sistema de reservas permite a los usuarios explorar una amplia variedad de opciones para alojarse en eco-lodges, participar en actividades al aire libre y disfrutar de experiencias culturales auténticas.
              </p>
              <p>
                <strong>¿Cómo funciona nuestro sistema de reservas?</strong> 
              </p>
              <p>
                1. <strong>Explora:</strong> Navega por una selección curada de destinos ecológicos, alojamientos y actividades. Filtra por ubicación, tipo de experiencia y fechas para encontrar la opción perfecta para ti.
              </p>
              <p>
                2. <strong>Reserva:</strong> Una vez que hayas encontrado la experiencia deseada, realiza tu reserva en línea a través de nuestro sistema intuitivo. Confirmaremos tu reserva y te enviaremos todos los detalles necesarios para tu viaje.
              </p>
              <p>
                3. <strong>Disfruta:</strong> Prepárate para una experiencia inolvidable. Nuestro equipo está comprometido con el turismo responsable, asegurando que tu viaje sea tanto emocionante como respetuoso con el entorno y las comunidades locales.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
