import { Card } from "react-bootstrap";

const WelcomeToWikiCard = () => {
  return (
    <Card className="shadow-lg border-0 mb-4">
      <Card.Body className="p-5 text-center">
        <h1 className="display-4 fw-bold mb-3">Welcome to the DBD Wiki</h1>
        <p className="lead text-muted mb-4">
          Your personal Dead by Daylight knowledge base
        </p>
      </Card.Body>
    </Card>
  );
};

export default WelcomeToWikiCard;
