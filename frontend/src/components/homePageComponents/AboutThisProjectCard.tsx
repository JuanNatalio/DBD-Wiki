import { Card } from "react-bootstrap";

const AboutThisProjectCard = () => {
  return (
    <Card className="shadow-lg border-0 mb-4">
      <Card.Body className="p-5">
        <h2 className="mb-4">About This Project</h2>
        <p className="mb-3">
          This wiki is a <strong>personal project</strong> born out of my
          passion for Dead by Daylight. As an avid player, I wanted to create a
          comprehensive resource where I could easily browse killer and survivor
          information, track my favorites, and have all the game knowledge I
          need in one place.
        </p>
        <p className="mb-4">
          Whether you're a seasoned fog veteran or just starting your journey in
          the Entity's realm, I hope this wiki helps you learn more about the
          characters, their perks, and strategies to improve your gameplay!
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
  );
};
export default AboutThisProjectCard;
