import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavigationBar from "./components/NavigationBar";
import KillersPage from "./pages/KillersPage";
import SurvivorsPage from "./pages/SurvivorsPage";
import Favorites from "./pages/Favorites";
import KillerDetails from "./pages/KillerDetails";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/killers" element={<KillersPage />} />
        <Route path="/survivors" element={<SurvivorsPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/killer/:id" element={<KillerDetails />} />
      </Routes>
    </>
  );
};
export default App;
