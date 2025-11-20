import { Card } from "react-bootstrap";
import type { Survivor } from "../../types";
import FavoriteSurvivorButton from "./FavoriteSurvivorButton";
import type { FC } from "react";
import ViewDetailsButton from "../subcomponents/ViewDetailsButton";
import { getSurvivorImageUrlById } from "../../assets/survivorImages";

interface SurvivorCardProps {
  survivor: Survivor;
}

const SurvivorCard: FC<SurvivorCardProps> = ({ survivor }) => {
  const localSrc = getSurvivorImageUrlById(survivor.id);
  return (
    <Card style={{ width: "18rem" }} className="shadow-lg border-0 h-100">
      <Card.Img
        variant="top"
        src={localSrc || survivor.image}
        alt={survivor.name}
        style={{
          height: "250px",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3 fw-bold">{survivor.name}</Card.Title>
        <div className="d-flex gap-2 mt-auto">
          <FavoriteSurvivorButton survivorId={survivor.id} />
          <ViewDetailsButton isKiller={false} id={survivor.id} />
        </div>
      </Card.Body>
    </Card>
  );
};
export default SurvivorCard;
