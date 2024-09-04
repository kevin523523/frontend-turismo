import { useEffect, useState } from 'react';
import { NavBar } from "./Components/NavBar/NavBar";
import { NavBarActive } from "./Components/NavBar/NavBarActive";
import { Footer } from "./Components/Footer/Footer";

export const TurismoApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div className="app-container">
      {isLoggedIn ? <NavBarActive /> : <NavBar />}
      
      <Footer />
    </div>
  );
};
