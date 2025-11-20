import { Container, Navbar } from "react-bootstrap";
import dbdLogo from "../assets/Logo_dbd.webp";

import OffCanvasContent from "./subcomponents/OffCanvasContent";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          onClick={handleBrandClick}
          className="d-flex align-items-center"
        >
          <img
            alt="DBD Logo"
            src={dbdLogo}
            width="50"
            height="50"
            className="d-inline-block me-3"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5">DBD Wiki</span>
          </div>
        </Navbar.Brand>
        <OffCanvasContent />
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
