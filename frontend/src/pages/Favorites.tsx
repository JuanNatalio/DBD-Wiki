import {
  useFavorites,
  useRemoveFavoriteKiller,
  useRemoveFavoriteSurvivor,
} from "../hooks/useUser";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import type { Killer, Survivor } from "../types";

/**
 * FAVORITES PAGE - Display user's favorite killers and survivors
 *
 * This example shows how to use multiple React Query hooks together:
 * - useFavorites() for fetching data (query)
 * - useRemoveFavoriteKiller() for removing killers (mutation)
 * - useRemoveFavoriteSurvivor() for removing survivors (mutation)
 */

export const Favorites = () => {
  // Check authentication status
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  // Fetch favorites data
  const { data, isLoading, error } = useFavorites();

  // Mutation hooks for removing favorites
  const removeKiller = useRemoveFavoriteKiller();
  const removeSurvivor = useRemoveFavoriteSurvivor();

  // Check if Auth0 is still loading
  if (authLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" aria-label="Checking authentication" />
        <p className="mt-3">Checking authentication...</p>
      </Container>
    );
  }

  // Redirect or show message if not authenticated
  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>Please log in to view your favorites.</p>
        </Alert>
      </Container>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Loading your favorites...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Favorites</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </Container>
    );
  }

  // Empty state
  if (!data?.favoriteKillers.length && !data?.favoriteSurvivors.length) {
    return (
      <Container className="mt-5 text-center">
        <h2>No Favorites Yet</h2>
        <p className="text-muted">
          Start adding killers and survivors to your favorites!
        </p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">My Favorites</h1>

      {/* Favorite Killers Section */}
      <section className="mb-5">
        <h2 className="mb-3">
          Favorite Killers{" "}
          <Badge bg="primary">{data?.favoriteKillers.length || 0}</Badge>
        </h2>

        {data?.favoriteKillers.length === 0 ? (
          <Alert variant="info">No favorite killers yet.</Alert>
        ) : (
          <Row>
            {data?.favoriteKillers.map((killer: Killer) => (
              <Col key={killer.id} md={6} lg={4} className="mb-4">
                <Card>
                  {killer.image && (
                    <Card.Img
                      variant="top"
                      src={killer.image}
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
      </section>

      {/* Favorite Survivors Section */}
      <section>
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
      </section>
    </Container>
  );
};

export default Favorites;

/**
 * KEY REACT QUERY CONCEPTS DEMONSTRATED:
 *
 * 1. FETCHING DATA (Query):
 *    const { data, isLoading, error } = useFavorites();
 *    - Automatically fetches when component mounts
 *    - Caches result for 5 minutes (configured in main.tsx)
 *    - Provides loading and error states
 *
 * 2. MUTATING DATA (Mutations):
 *    const removeKiller = useRemoveFavoriteKiller();
 *    removeKiller.mutate(killerId);
 *    - Sends DELETE request to API
 *    - Shows loading state during request
 *    - Automatically invalidates queries after success
 *    - UI updates automatically with fresh data
 *
 * 3. AUTOMATIC CACHE UPDATES:
 *    - When you click "Remove", mutation runs
 *    - After success, useFavorites() automatically refetches
 *    - UI updates without manual state management!
 *
 * 4. LOADING STATES:
 *    - isLoading: Initial data fetch
 *    - removeKiller.isPending: Individual mutation (React Query v5+)
 *    - Can disable buttons during mutations
 *
 * 5. ERROR HANDLING:
 *    - Errors caught automatically
 *    - Display error.message to user
 *    - Can add retry logic in query config
 */
