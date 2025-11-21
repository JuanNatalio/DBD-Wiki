import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getKillerImageUrlById } from "../../assets/killerImages";
import { getSurvivorImageUrlById } from "../../assets/survivorImages";

const WhatIsDbdCard = () => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-lg border-0 mb-4">
      <Card.Body className="p-5">
        <h2 className="mb-4">What is Dead by Daylight?</h2>
        <p className="mb-3">
          <strong>Dead by Daylight</strong> is an asymmetric multiplayer horror
          game developed by Behaviour Interactive. In each match, four survivors
          face off against one powerful killer in a deadly game of cat and
          mouse.
        </p>
        <p className="mb-3">
          As a <strong>Survivor</strong>, your goal is to repair generators and
          escape through the exit gates while avoiding the killer. As a{" "}
          <strong>Killer</strong>, you hunt down survivors and sacrifice them to
          the Entity before they can escape.
        </p>
        <p className="mb-4">
          The game features iconic horror characters from franchises like
          Halloween, Stranger Things, Resident Evil, Silent Hill, and many more,
          alongside original characters with unique perks and abilities.
        </p>

        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center">
              <img
                src={getKillerImageUrlById(1) || ""}
                alt="The Trapper"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                className="me-3"
              />
              <div>
                <h6 className="mb-1">The Trapper</h6>
                <small className="text-muted">
                  The game's iconic killer who uses bear traps
                </small>
              </div>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center">
              <img
                src={getSurvivorImageUrlById(1) || ""}
                alt="Dwight Fairfield"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                className="me-3"
              />
              <div>
                <h6 className="mb-1">Dwight Fairfield</h6>
                <small className="text-muted">
                  The nervous leader who unites survivors
                </small>
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-center">
          <Button
            variant="danger"
            size="lg"
            className="me-2 mb-2"
            onClick={() => navigate("/killers")}
          >
            <FontAwesomeIcon icon="skull-crossbones" className="me-2" />
            Explore Killers
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="mb-2"
            onClick={() => navigate("/survivors")}
          >
            <FontAwesomeIcon icon="users" className="me-2" />
            Explore Survivors
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WhatIsDbdCard;
