import { Badge, Alert, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Survivor } from "../../types";
import {
  useRemoveFavoriteSurvivor,
  type FavoritesResponseInterface,
} from "../../hooks/useUser";
import { getSurvivorImageUrlById } from "../../assets/survivorImages";
import type { FC } from "react";

interface FavoritedSurvivorsProps {
  data: FavoritesResponseInterface | undefined;
}

const FavoritedSurvivors: FC<FavoritedSurvivorsProps> = ({ data }) => {
  const removeSurvivor = useRemoveFavoriteSurvivor();

  return (
    <>
      <h2 className="mb-3">
        Favorite Survivors{" "}
        <Badge bg="primary">{data?.favoriteSurvivors.length || 0}</Badge>
      </h2>

      {data?.favoriteSurvivors.length === 0 ? (
        <Alert variant="info">No favorite survivors yet.</Alert>
      ) : (
        <Row>
          {data?.favoriteSurvivors.map((survivor: Survivor) => (
            <Col key={survivor.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-lg border-0 h-100">
                {survivor.image && (
                  <Card.Img
                    variant="top"
                    src={getSurvivorImageUrlById(survivor.id) || survivor.image}
                    alt={survivor.name}
                    style={{
                      height: "250px",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{survivor.name}</Card.Title>
                  <Card.Text className="small mb-3">
                    <strong>DLC:</strong> {survivor.dlc}
                    <br />
                    <strong>Released:</strong>{" "}
                    {new Date(survivor.release_date).toLocaleDateString()}
                  </Card.Text>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => removeSurvivor.mutate(survivor.id)}
                    disabled={removeSurvivor.isPending}
                    className="mt-auto shadow-sm"
                  >
                    {removeSurvivor.isPending ? (
                      <>
                        <Spinner
                          size="sm"
                          animation="border"
                          className="me-1"
                        />{" "}
                        Removing...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon="heart-crack" className="me-1" />
                        Unfavorite
                      </>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default FavoritedSurvivors;
