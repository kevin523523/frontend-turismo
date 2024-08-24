import { NavBar } from "./Components/NavBar/NavBar";
import CardList from "./Components/Card/Card";
import { Footer } from "./Components/Footer/Footer";

export const TurismoApp = () => {
  return (
    <div className="app-container">
        <NavBar />
        <CardList />
        <Footer />
    </div>
  )
}
