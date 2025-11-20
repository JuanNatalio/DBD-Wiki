import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticatedHomePage from "../components/NotAuthenticatedHomePage";
import AuthenticatedHomePage from "../components/AuthenticatedHomePage";

const Home = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  return (
    <>
      {authLoading && <AuthLoading />}
      {!isAuthenticated && <NotAuthenticatedHomePage />}
      {isAuthenticated && <AuthenticatedHomePage />}
    </>
  );
};
export default Home;
