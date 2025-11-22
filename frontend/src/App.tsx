import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavigationBar from "./components/NavigationBar";
import KillersPage from "./pages/KillersPage";
import SurvivorsPage from "./pages/SurvivorsPage";
import Favorites from "./pages/Favorites";
import KillerDetails from "./pages/KillerDetails";
import { useSyncUser } from "./hooks/useUser";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { mutate: syncUser } = useSyncUser();

  // Sync user to database once after authentication completes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      syncUser();
    }
  }, [isAuthenticated, isLoading, syncUser]);

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
