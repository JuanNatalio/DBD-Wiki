import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Row, Col, Button } from "react-bootstrap";

const OfficialResourcesCard = () => {
  return (
    <Card className="shadow-lg border-0 mb-4">
      <Card.Body className="p-5">
        <h2 className="mb-4">Official Resources</h2>
        <Row>
          <Col md={6} className="mb-3">
            <Card className="h-100 border">
              <Card.Body>
                <h5>
                  <FontAwesomeIcon icon={["fab", "steam"]} className="me-2" />
                  Official Website
                </h5>
                <p className="text-muted mb-3">
                  Visit the official Dead by Daylight website for news, updates,
                  and patch notes.
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
                  The community-maintained wiki with detailed game mechanics and
                  character information.
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
                  Watch gameplay trailers, developer updates, and community
                  spotlights.
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
  );
};

export default OfficialResourcesCard;
