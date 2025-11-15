import type { FC } from "react";
import {
  useRemoveFavoriteKiller,
  type FavoritesResponseInterface,
} from "../../hooks/useUser";
import { Badge, Alert, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import type { Killer } from "../../types";
import { getKillerImageUrlById } from "../../assets/killerImages";

interface FavoritedKillerProps {
  data: FavoritesResponseInterface | undefined;
}

const FavoritedKillers: FC<FavoritedKillerProps> = ({ data }) => {
  const removeKiller = useRemoveFavoriteKiller();
  const favoriteKillers = data?.favoriteKillers ?? [];
  console.log(favoriteKillers);
  return (
    <>
      <h2 className="mb-3">
        Favorite Killers <Badge bg="primary">{favoriteKillers.length}</Badge>
      </h2>

      {favoriteKillers.length === 0 ? (
        <Alert variant="info">No favorite killers yet.</Alert>
      ) : (
        <Row>
          {favoriteKillers.map((killer: Killer) => (
            <Col key={killer.id} md={6} lg={4} className="mb-4">
              <Card>
                {killer.image && (
                  <Card.Img
                    variant="top"
                    src={getKillerImageUrlById(killer.id) || killer.image}
                    alt={killer.name}
                  />
                )}
                <Card.Body>
                  <Card.Title>{killer.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {killer.real_name}
                  </Card.Subtitle>
                  <Card.Text className="small">
                    <strong>Power:</strong> {killer.power.name}
                    <br />
                    <strong>DLC:</strong> {killer.dlc}
                  </Card.Text>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeKiller.mutate(killer.id)}
                    disabled={removeKiller.isPending}
                  >
                    {removeKiller.isPending ? (
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
export default FavoritedKillers;
