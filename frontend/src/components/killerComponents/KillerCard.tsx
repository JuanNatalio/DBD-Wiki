import { Card } from "react-bootstrap";
import type { Killer } from "../../types";
import type { FC } from "react";
import FavoriteKillerButton from "./FavoriteKillerButton";
import { getKillerImageUrlById } from "../../assets/killerImages";
import ViewDetailsButton from "../subcomponents/ViewDetailsButton";

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
        style={{
          height: "250px",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
      <Card.Body>
        <Card.Title className="mb-3">{killer.name}</Card.Title>
        <div className="d-flex gap-2 mt-auto">
          <FavoriteKillerButton killerId={killer.id} />
          <ViewDetailsButton isKiller={true} id={killer.id} />
        </div>
      </Card.Body>
    </Card>
  );
};
export default KillerCard;
