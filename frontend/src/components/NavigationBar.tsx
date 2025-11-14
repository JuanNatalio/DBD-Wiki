import { Container, Navbar } from "react-bootstrap";
import dbdLogo from "../assets/Logo_dbd.webp";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SurvivorsPageButton from "./survivorComponents/SurvivorsPageButton";
import KillersPageButton from "./killerComponents/KillersPageButton";
import ProfilePageButton from "./ProfilePageButton";
import FavoritesPageButton from "./FavoritesPageButton";

const NavigationBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="DBD Logo"
            src={dbdLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          DBD Wiki
        </Navbar.Brand>
        <div className="d-flex ms-auto gap-2">
          {isAuthenticated ? (
            <>
              <SurvivorsPageButton />
              <KillersPageButton />
              <FavoritesPageButton />
              <ProfilePageButton />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
