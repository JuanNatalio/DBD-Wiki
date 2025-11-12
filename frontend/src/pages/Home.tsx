import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import { Container, Spinner } from "react-bootstrap";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" aria-label="Loading authentication" />
        <p className="mt-3">Checking authentication...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginButton />
        <div>Log In</div>
      </>
    );
  }

  return (
    <>
      <LogoutButton />
      <div>Log Out</div>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
    </>
  );
};
export default Home;
