import type { FC } from "react";
import {
  useRemoveFavoriteKiller,
  type FavoritesResponseInterface,
} from "../../hooks/useUser";
import { Badge, Alert, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Killer } from "../../types";
import { getKillerImageUrlById } from "../../assets/killerImages";

interface FavoritedKillerProps {
  data: FavoritesResponseInterface | undefined;
}

const FavoritedKillers: FC<FavoritedKillerProps> = ({ data }) => {
  const removeKiller = useRemoveFavoriteKiller();
  const favoriteKillers = data?.favoriteKillers ?? [];

  return (
    <>
      <h2 className="mb-3">
        Favorite Killers <Badge bg="danger">{favoriteKillers.length}</Badge>
      </h2>

      {favoriteKillers.length === 0 ? (
        <Alert variant="info">No favorite killers yet.</Alert>
      ) : (
        <Row>
          {favoriteKillers.map((killer: Killer) => (
            <Col key={killer.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-lg border-0 h-100">
                {killer.image && (
                  <Card.Img
                    variant="top"
                    src={getKillerImageUrlById(killer.id) || killer.image}
                    alt={killer.name}
                    style={{
                      height: "250px",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{killer.name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    {killer.real_name}
                  </Card.Subtitle>
                  <Card.Text className="small mb-3">
                    <strong>Power:</strong> {killer.power.name}
                    <br />
                    <strong>DLC:</strong> {killer.dlc}
                  </Card.Text>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeKiller.mutate(killer.id)}
                    disabled={removeKiller.isPending}
                    className="mt-auto shadow-sm"
                  >
                    {removeKiller.isPending ? (
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
export default FavoritedKillers;
