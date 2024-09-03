import { useEffect, useState } from 'react';
import CardList from '../../Components/Card/CardList';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import { useNavigate } from 'react-router-dom';
import './reserva.css'
export const ReservaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setIsUserId] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
    setIsUserId(userId);
  }, []);
  const handleViewReservation = () => {
    navigate(`/reservation/${userId}`);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      {isLoggedIn ? <button 
              onClick={() => navigate(handleViewReservation())} 
              style={{ 
                marginTop: '75px', 
                marginBottom:'0px',
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}>Reservas realizadas</button>:<p></p>}
      <div className="content">
        <CardList />
      </div>
      <Footer />
    </div>
  );
};
