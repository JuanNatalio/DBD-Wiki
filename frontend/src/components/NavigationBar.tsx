import { Container, Navbar } from "react-bootstrap";
import dbdLogo from "../assets/Logo_dbd.webp";

import OffCanvasContent from "./subcomponents/OffCanvasContent";

const NavigationBar = () => {
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
        <OffCanvasContent />
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
