import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getKillerImageUrlById } from "../assets/killerImages";
import { getSurvivorImageUrlById } from "../assets/survivorImages";

const AuthenticatedHomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg border-0 mb-4">
            <Card.Body className="p-5 text-center">
              <h1 className="display-4 fw-bold mb-3">
                Welcome to the DBD Wiki
              </h1>
              <p className="lead text-muted mb-4">
                Your personal Dead by Daylight knowledge base
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-lg border-0 mb-4">
            <Card.Body className="p-5">
              <h2 className="mb-4">What is Dead by Daylight?</h2>
              <p className="mb-3">
                <strong>Dead by Daylight</strong> is an asymmetric multiplayer
                horror game developed by Behaviour Interactive. In each match,
                four survivors face off against one powerful killer in a deadly
                game of cat and mouse.
              </p>
              <p className="mb-3">
                As a <strong>Survivor</strong>, your goal is to repair
                generators and escape through the exit gates while avoiding the
                killer. As a <strong>Killer</strong>, you hunt down survivors
                and sacrifice them to the Entity before they can escape.
              </p>
              <p className="mb-4">
                The game features iconic horror characters from franchises like
                Halloween, Stranger Things, Resident Evil, Silent Hill, and many
                more, alongside original characters with unique perks and
                abilities.
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

          <Card className="shadow-lg border-0 mb-4">
            <Card.Body className="p-5">
              <h2 className="mb-4">About This Project</h2>
              <p className="mb-3">
                This wiki is a <strong>personal project</strong> born out of my
                passion for Dead by Daylight. As an avid player, I wanted to
                create a comprehensive resource where I could easily browse
                killer and survivor information, track my favorites, and have
                all the game knowledge I need in one place.
              </p>
              <p className="mb-4">
                Whether you're a seasoned fog veteran or just starting your
                journey in the Entity's realm, I hope this wiki helps you learn
                more about the characters, their perks, and strategies to
                improve your gameplay!
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React</span>
                <span className="badge bg-info">TypeScript</span>
                <span className="badge bg-success">Node.js</span>
                <span className="badge bg-warning text-dark">MongoDB</span>
                <span className="badge bg-danger">Express</span>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-lg border-0 mb-4">
            <Card.Body className="p-5">
              <h2 className="mb-4">Official Resources</h2>
              <Row>
                <Col md={6} className="mb-3">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h5>
                        <FontAwesomeIcon
                          icon={["fab", "steam"]}
                          className="me-2"
                        />
                        Official Website
                      </h5>
                      <p className="text-muted mb-3">
                        Visit the official Dead by Daylight website for news,
                        updates, and patch notes.
                      </p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        href="https://deadbydaylight.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                        <FontAwesomeIcon
                          icon="external-link-alt"
                          className="ms-2"
                          size="xs"
                        />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h5>
                        <FontAwesomeIcon icon="book" className="me-2" />
                        Official Wiki
                      </h5>
                      <p className="text-muted mb-3">
                        The community-maintained wiki with detailed game
                        mechanics and character information.
                      </p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        href="https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Wiki
                        <FontAwesomeIcon
                          icon="external-link-alt"
                          className="ms-2"
                          size="xs"
                        />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h5>
                        <FontAwesomeIcon
                          icon={["fab", "youtube"]}
                          className="me-2 text-danger"
                        />
                        YouTube Channel
                      </h5>
                      <p className="text-muted mb-3">
                        Watch gameplay trailers, developer updates, and
                        community spotlights.
                      </p>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        href="https://www.youtube.com/deadbydaylight"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Videos
                        <FontAwesomeIcon
                          icon="external-link-alt"
                          className="ms-2"
                          size="xs"
                        />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h5>
                        <FontAwesomeIcon
                          icon={["fab", "reddit"]}
                          className="me-2 text-warning"
                        />
                        Reddit Community
                      </h5>
                      <p className="text-muted mb-3">
                        Join discussions, share clips, and connect with the DBD
                        community on Reddit.
                      </p>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        href="https://www.reddit.com/r/deadbydaylight/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Community
                        <FontAwesomeIcon
                          icon="external-link-alt"
                          className="ms-2"
                          size="xs"
                        />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthenticatedHomePage;
