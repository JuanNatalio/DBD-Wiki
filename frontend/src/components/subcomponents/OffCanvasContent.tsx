import { Button, Offcanvas } from "react-bootstrap";
import KillersPageButton from "../killerComponents/KillersPageButton";
import SurvivorsPageButton from "../survivorComponents/SurvivorsPageButton";
import FavoritesPageButton from "./FavoritesPageButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ProfilePageButton from "./ProfilePageButton";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import HomePageButton from "./HomePageButton";

const OffCanvasContent = () => {
  const { isAuthenticated } = useAuth0();
  const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);

  const handleClose = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <div className="d-flex ms-auto gap-2">
      <Button
        onClick={handleClose}
        size="lg"
        variant="secondary
              "
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Offcanvas show={showOffCanvas} onClick={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            {isAuthenticated ? (
              <>
                <div className="border-bottom pb-3">
                  <h6 className="text-muted mb-3">Pages</h6>
                  <div className="d-grid gap-2">
                    <HomePageButton />
                    <KillersPageButton />
                    <SurvivorsPageButton />
                    <FavoritesPageButton />
                  </div>
                </div>
                <div className="border-bottom pb-3">
                  <h6 className="text-muted mb-3">Account</h6>
                  <div className="d-grid gap-2">
                    <ProfilePageButton />
                  </div>
                </div>
                <div className="d-grid">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="d-grid">
                <LoginButton />
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default OffCanvasContent;
