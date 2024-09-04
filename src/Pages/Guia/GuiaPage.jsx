import { useEffect, useState } from 'react';
import { Footer } from '../../Components/Footer/Footer';
import { NavBar } from '../../Components/NavBar/NavBar';
import { NavBarActive } from "../../Components/NavBar/NavBarActive"; 
import CardListGuides from '../../Components/Card/CardListGuides';

export const GuiaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);


  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      <div className="content">
        <CardListGuides />
      </div>
      <Footer />
    </div>
  );
  
};
