import type { FC } from "react";
import { useKillers, useSurvivors } from "../hooks/useUser";
import type { characterType } from "../types";
import DataLoading from "./loadingOrErrors/DataLoading";
import ErrorWhenFetching from "./loadingOrErrors/ErrorWhenFetching";
import { getKillerImageUrlById } from "../assets/killerImages";
import { getSurvivorImageUrlById } from "../assets/survivorImages";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import FavoriteKillerButton from "./killerComponents/FavoriteKillerButton";
import FavoriteSurvivorButton from "./survivorComponents/FavoriteSurvivorButton";

interface CharacterDetailsProps {
  characterType: characterType;
  id: number;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({ characterType, id }) => {
  const {
    data: killers,
    isLoading: killerLoading,
    error: killerError,
  } = useKillers();
  const {
    data: survivors,
    isLoading: survivorLoading,
    error: survivorError,
  } = useSurvivors();

  if (characterType === "KILLER") {
    if (killerLoading) return <DataLoading />;
    if (killerError) return <ErrorWhenFetching error={killerError} />;

    const killer = killers?.find((killer) => killer.id === id);
    if (!killer)
      return (
        <Container className="mt-5">
          <h3>Killer not found</h3>
        </Container>
      );

    const localSrc = getKillerImageUrlById(id);

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center">
                    <img
                      src={localSrc}
                      alt={killer.name}
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </Col>
                  <Col md={8}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h1 className="fw-bold">{killer.name}</h1>
                        <h4 className="text-muted mb-3">{killer.real_name}</h4>
                      </div>
                      <FavoriteKillerButton killerId={id} />
                    </div>
                    <p className="lead">{killer.description}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Card className="shadow-lg border-0 bg-dark text-white h-100">
                  <Card.Header className="bg-secondary text-white">
                    <h5 className="mb-0">Release Date</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="fs-5 mb-0">{killer.release_date}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-lg border-0 bg-dark text-white h-100">
                  <Card.Header className="bg-secondary text-white">
                    <h5 className="mb-0">Map</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="fs-5 mb-0">{killer.map}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">Statistics</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h5 className="fw-bold">Terror Radius</h5>
                    <p className="fs-5">{killer.terror_radius}</p>
                  </Col>
                  <Col md={6}>
                    <h5 className="fw-bold">Movement Speed</h5>
                    <p className="fs-5">{killer.base_movement_speed}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">Power: {killer.power.name}</h4>
              </Card.Header>
              <Card.Body>
                <p className="fs-6">{killer.power.description}</p>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">Unique Perks</h4>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {killer.perks.map((perk, index) => (
                    <ListGroup.Item
                      key={index}
                      className="bg-dark text-white border-secondary"
                    >
                      <span className="fw-bold fs-5">{perk}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">DLC Information</h4>
              </Card.Header>
              <Card.Body>
                <p className="fs-5 mb-0">{killer.dlc}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    if (survivorLoading) return <DataLoading />;
    if (survivorError) return <ErrorWhenFetching error={survivorError} />;

    const survivor = survivors?.find((survivor) => survivor.id === id);
    if (!survivor)
      return (
        <Container className="mt-5">
          <h3>Survivor not found</h3>
        </Container>
      );

    const localSrc = getSurvivorImageUrlById(id);

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center">
                    <img
                      src={localSrc}
                      alt={survivor.name}
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </Col>
                  <Col md={8}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h1 className="fw-bold">{survivor.name}</h1>
                      <FavoriteSurvivorButton survivorId={id} />
                    </div>
                    <p className="lead mt-3">{survivor.description}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Card className="shadow-lg border-0 bg-dark text-white h-100">
                  <Card.Header className="bg-secondary text-white">
                    <h5 className="mb-0">Release Date</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="fs-5 mb-0">{survivor.release_date}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-lg border-0 bg-dark text-white h-100">
                  <Card.Header className="bg-secondary text-white">
                    <h5 className="mb-0">Map</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="fs-5 mb-0">{survivor.map}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">Unique Perks</h4>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {survivor.perks.map((perk, index) => (
                    <ListGroup.Item
                      key={index}
                      className="bg-dark text-white border-secondary"
                    >
                      <span className="fw-bold fs-5">{perk}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-lg border-0 bg-dark text-white">
              <Card.Header className="bg-secondary text-white">
                <h4 className="mb-0">DLC Information</h4>
              </Card.Header>
              <Card.Body>
                <p className="fs-5 mb-0">{survivor.dlc}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default CharacterDetails;
