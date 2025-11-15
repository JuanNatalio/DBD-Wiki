import { Card } from "react-bootstrap";
import type { Killer } from "../../types";
import type { FC } from "react";
import FavoriteKillerButton from "./FavoriteKillerButton";
import { getKillerImageUrlById } from "../../assets/killerImages";
import ViewDetailsButton from "../ViewDetailsButton";

interface KillerCardProps {
  killer: Killer;
}

const KillerCard: FC<KillerCardProps> = ({ killer }) => {
  const localSrc = getKillerImageUrlById(killer.id);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={localSrc || killer.image}
        alt={killer.name}
      />
      <Card.Body>
        <Card.Title>{killer.name}</Card.Title>
        <Card.Text>{killer.description}</Card.Text>
        <FavoriteKillerButton killerId={killer.id} />
        <ViewDetailsButton isKiller={true} id={killer.id} />
      </Card.Body>
    </Card>
  );
};
export default KillerCard;
