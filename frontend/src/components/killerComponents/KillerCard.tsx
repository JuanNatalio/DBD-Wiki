import { Card } from "react-bootstrap";
import type { Killer } from "../../types";
import type { FC } from "react";
import FavoriteKillerButton from "./FavoriteKillerButton";

interface KillerCardProps {
  killer: Killer;
}

const KillerCard: FC<KillerCardProps> = ({ killer }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={killer.image} />
      <Card.Body>
        <Card.Title>{killer.name}</Card.Title>
        <Card.Text>{killer.description}</Card.Text>
        <FavoriteKillerButton killerId={killer.id} />
      </Card.Body>
    </Card>
  );
};
export default KillerCard;
