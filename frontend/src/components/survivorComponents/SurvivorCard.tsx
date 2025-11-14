import { Card } from "react-bootstrap";
import type { Survivor } from "../../types";
import FavoriteSurvivorButton from "./FavoriteSurvivorButton";
import type { FC } from "react";

interface SurvivorCardProps {
  survivor: Survivor;
}

const SurvivorCard: FC<SurvivorCardProps> = ({ survivor }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={survivor.image} />
      <Card.Body>
        <Card.Title>{survivor.name}</Card.Title>
        <Card.Text>{survivor.description}</Card.Text>
        <FavoriteSurvivorButton survivorId={survivor.id} />
      </Card.Body>
    </Card>
  );
};
export default SurvivorCard;
