import { useEffect, useState } from 'react';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import CardListReservations from '../../Components/Card/CardListReservations';

export const ReservationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);


  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <div className="content">
        <CardListReservations />
      </div>
      <Footer />
    </div>
  );
  
};
