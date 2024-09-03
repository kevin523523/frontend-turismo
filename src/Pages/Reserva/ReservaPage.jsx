import { useEffect, useState } from 'react';
import CardList from '../../Components/Card/CardList';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import './reserva.css'
export const ReservaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId); // Se convierte en true si `userId` existe, false en caso contrario
  }, []);

  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <div className="content">
        <CardList />
      </div>
      <Footer />
    </div>
  );
};
