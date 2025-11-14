import { Badge, Alert, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import type { Survivor } from "../../types";
import {
  useRemoveFavoriteSurvivor,
  type FavoritesResponseInterface,
} from "../../hooks/useUser";
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
              <Card>
                {survivor.image && (
                  <Card.Img
                    variant="top"
                    src={survivor.image}
                    alt={survivor.name}
                  />
                )}
                <Card.Body>
                  <Card.Title>{survivor.name}</Card.Title>
                  <Card.Text className="small">
                    <strong>DLC:</strong> {survivor.dlc}
                    <br />
                    <strong>Released:</strong>{" "}
                    {new Date(survivor.release_date).toLocaleDateString()}
                  </Card.Text>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeSurvivor.mutate(survivor.id)}
                    disabled={removeSurvivor.isPending}
                  >
                    {removeSurvivor.isPending ? (
                      <>
                        <Spinner size="sm" animation="border" /> Removing...
                      </>
                    ) : (
                      "Remove from Favorites"
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
