import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/AuthLoading";

const Home = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  return (
    <>
      {authLoading && <AuthLoading />} {isAuthenticated && <div>Working</div>}
    </>
  );
};
export default Home;
