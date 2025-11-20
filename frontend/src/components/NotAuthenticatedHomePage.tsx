import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginButton from "./subcomponents/LoginButton";

const NotAuthenticatedHomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5 text-center">
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-3">
                  Welcome to the DBD Wiki
                </h1>
                <p className="lead text-muted">
                  Your ultimate resource for Dead by Daylight killers and
                  survivors
                </p>
              </div>

              <Alert variant="info" className="mb-4">
                <FontAwesomeIcon icon="info-circle" className="me-2" />
                <strong>Authentication Required</strong>
                <p className="mb-0 mt-2">
                  To access the full wiki features including killer and survivor
                  information, favorites, and detailed stats, please log in with
                  your account.
                </p>
              </Alert>

              <div className="mb-4">
                <h5 className="mb-3">Features Available After Login:</h5>
                <Row className="text-start">
                  <Col md={6} className="mb-3">
                    <FontAwesomeIcon
                      icon="users"
                      className="text-primary me-2"
                    />
                    Browse all survivors and their perks
                  </Col>
                  <Col md={6} className="mb-3">
                    <FontAwesomeIcon
                      icon="skull-crossbones"
                      className="text-danger me-2"
                    />
                    Explore killers and their powers
                  </Col>
                  <Col md={6} className="mb-3">
                    <FontAwesomeIcon
                      icon="heart"
                      className="text-danger me-2"
                    />
                    Save your favorite characters
                  </Col>
                  <Col md={6} className="mb-3">
                    <FontAwesomeIcon
                      icon="search"
                      className="text-success me-2"
                    />
                    Search and filter characters
                  </Col>
                </Row>
              </div>

              <div className="mt-4">
                <LoginButton />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotAuthenticatedHomePage;
