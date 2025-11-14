import { Card } from "react-bootstrap";
import type { Survivor } from "../types";

const SurvivorCard = (survivor: Survivor) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={survivor.image} />
      <Card.Body>
        <Card.Title>{survivor.name}</Card.Title>
        <Card.Text>{survivor.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default SurvivorCard;
